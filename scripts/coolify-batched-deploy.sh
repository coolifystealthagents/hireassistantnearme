#!/usr/bin/env bash
set -Eeuo pipefail

# Daily 09:40 UTC batch deployment runner. The caller supplies a completion
# manifest from the blog routine; this script never assumes that content is
# complete merely because files changed.

readonly SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
readonly REPO_ROOT="$(cd -- "$SCRIPT_DIR/.." && pwd)"
readonly STATE_FILE="${COOLIFY_STATE_FILE:-$REPO_ROOT/.deployment/coolify-state.json}"
readonly BRANCH="${PRODUCTION_BRANCH:-main}"
readonly MANIFEST="${BLOG_COMPLETION_MANIFEST:?BLOG_COMPLETION_MANIFEST is required}"
readonly DEPLOYMENTS_PATH="${COOLIFY_DEPLOYMENTS_PATH:-/api/v1/deployments}"
readonly DEPLOY_PATH="${COOLIFY_DEPLOY_PATH:-/api/v1/deploy}"

mkdir -p -- "$(dirname -- "$STATE_FILE")"

emit() {
  local outcome="$1" message="$2"
  jq -nc --arg outcome "$outcome" --arg message "$message" \
    --arg timestamp "$(date -u +%Y-%m-%dT%H:%M:%SZ)" \
    '{outcome:$outcome,message:$message,timestamp_utc:$timestamp}'
}

api() {
  local method="$1" path="$2" body="${3:-}"
  local args=(-fsS -X "$method" -H "Authorization: Bearer $API_TOKEN" -H 'Accept: application/json')
  [[ -n "$body" ]] && args+=(-H 'Content-Type: application/json' --data "$body")
  curl "${args[@]}" "${API_URL%/}$path"
}

finish() {
  local outcome="$1" message="$2"
  emit "$outcome" "$message" | tee "${RUN_RESULT_FILE:-$REPO_ROOT/.deployment/last-run.json}"
  exit 0
}

write_batch_state() {
  local outcome="$1" status="$2"
  jq -n --arg project "${PAPERCLIP_PROJECT:-HireAssistantNearMe}" \
    --arg domain "${WEBSITE_DOMAIN:-${SITE_URL:-unknown}}" --arg app "$APP_UUID" \
    --arg sha "$CURRENT_SHA" --arg deployment "${3:-}" \
    --arg triggered "${TRIGGERED_AT:-$(date -u +%Y-%m-%dT%H:%M:%SZ)}" --arg status "$status" --arg outcome "$outcome" \
    --argjson queued "${4:-0}" \
    '{project:$project,website_domain:$domain,application_uuid:$app,commit_sha:$sha,deployment_uuid:$deployment,triggered_at_utc:$triggered,deployment_status:$status,queued_deployments_before_submission:$queued,outcome:$outcome}' >"$STATE_FILE"
}

verify_live_site() {
  local urls=()
  # The completion manifest may enumerate the newly published article URLs.
  # PRIMARY_URLS can add comma-separated core pages (for example /blog,/research).
  mapfile -t urls < <(jq -r '.public_urls[]?' "$MANIFEST")
  if [[ -n "${PRIMARY_URLS:-}" ]]; then
    while IFS= read -r path; do
      [[ -n "$path" ]] || continue
      if [[ "$path" == http://* || "$path" == https://* ]]; then
        urls+=("$path")
      else
        urls+=("${SITE_URL%/}/${path#/}")
      fi
    done < <(tr ',' '\n' <<< "$PRIMARY_URLS")
  fi
  ((${#urls[@]})) || urls+=("$SITE_URL")
  local url
  for url in "${urls[@]}"; do
    curl -fsS --max-time 20 "$url" >/dev/null || return 1
  done
}

[[ -f "$MANIFEST" ]] || finish SKIPPED_INCOMPLETE "Daily blog completion manifest is missing."
jq -e 'type == "object" and .complete == true and .build_passed == true and .required_items_complete == true and ((.pending_count // 0) == 0) and ((.failed_count // 0) == 0) and ((.in_progress_count // 0) == 0) and ((.blocked_count // 0) == 0)' "$MANIFEST" >/dev/null \
  || finish SKIPPED_INCOMPLETE "Daily blog production is not complete."

# Do not require deployment credentials for an incomplete batch. This keeps a
# skipped production run independent from the deployment service and, more
# importantly, ensures the completion gate is always evaluated first.
readonly API_URL="${COOLIFY_API_URL:?COOLIFY_API_URL is required}"
readonly API_TOKEN="${COOLIFY_API_TOKEN:?COOLIFY_API_TOKEN is required}"
readonly APP_UUID="${COOLIFY_APPLICATION_UUID:?COOLIFY_APPLICATION_UUID is required}"

cd -- "$REPO_ROOT"

# This runner operates on the checkout prepared by the blog routine. Never
# checkout, pull, or reset here: those operations can overwrite the completed
# local batch before it is committed. A scheduled run should invoke this
# script from the production branch; a detached or different branch is a safe
# skip rather than an implicit branch mutation.
CURRENT_BRANCH="$(git branch --show-current)"
[[ "$CURRENT_BRANCH" == "$BRANCH" ]] || finish SKIPPED_INCOMPLETE "The checkout is not on the production branch."

# Verify the same build the completion manifest claims passed. This prevents
# a stale or manually edited manifest from authorizing a deployment.
npm run build >/dev/null || finish SKIPPED_INCOMPLETE "The website build failed."

CURRENT_SHA="$(git rev-parse HEAD)"
if [[ -f "$STATE_FILE" ]] && jq -e --arg sha "$CURRENT_SHA" '.commit_sha == $sha' "$STATE_FILE" >/dev/null 2>&1; then
  SAVED_OUTCOME="$(jq -r '.outcome // empty' "$STATE_FILE")"
  if [[ "$SAVED_OUTCOME" == "LIVE_VERIFIED" || "$SAVED_OUTCOME" == "ALREADY_DEPLOYED" ]]; then
    finish ALREADY_DEPLOYED "The current commit is already deployed or live."
  fi
  [[ "$SAVED_OUTCOME" == "DEPLOYMENT_ALREADY_PENDING" ]] && finish DEPLOYMENT_IN_PROGRESS "The current commit already has an active Coolify deployment; no duplicate was submitted."
  SAVED_DEPLOYMENT="$(jq -r '.deployment_uuid // empty' "$STATE_FILE")"
  if [[ -n "$SAVED_DEPLOYMENT" ]]; then
    SAVED_RESPONSE="$(api GET "${COOLIFY_DEPLOYMENTS_PATH:-/api/v1/deployments}/$SAVED_DEPLOYMENT")"
    SAVED_STATUS="$(jq -r '.status // .deployment_status // empty' <<< "$SAVED_RESPONSE" | tr '[:upper:]' '[:lower:]')"
    case "$SAVED_STATUS" in
      success|successful|completed|finished)
        SITE_URL="${SITE_URL:-https://${WEBSITE_DOMAIN:?WEBSITE_DOMAIN is required when verifying a live deployment}}"
        verify_live_site || finish DEPLOYMENT_FAILED "Coolify reports success, but one or more live website verification URLs did not respond."
        finish LIVE_VERIFIED "The completed blog batch and required live pages responded successfully."
        ;;
      failed|failure|error|cancelled|canceled)
        finish DEPLOYMENT_FAILED "The previous Coolify deployment failed and requires recovery."
        ;;
      *) finish DEPLOYMENT_IN_PROGRESS "The previous Coolify deployment is still active; no duplicate was submitted." ;;
    esac
  fi
fi

CHANGED_FILES="$(git status --short | sed -E 's/^.. //' | sed '/^$/d')"
if [[ -z "$CHANGED_FILES" ]]; then
  finish NO_NEW_CHANGES "There is no new completed batch requiring deployment."
fi

# The producer must enumerate the files belonging to this batch. Refuse to
# include any unrelated working-tree file in the combined production commit.
mapfile -t ALLOWED_FILES < <(jq -r '.changed_files[]?' "$MANIFEST")
[[ "${#ALLOWED_FILES[@]}" -gt 0 ]] || finish SKIPPED_INCOMPLETE "The completion manifest does not enumerate batch files."
while IFS= read -r file; do
  printf '%s\n' "${ALLOWED_FILES[@]}" | grep -Fxq -- "$file" || finish SKIPPED_INCOMPLETE "Unrelated file is present: $file"
done <<< "$CHANGED_FILES"

git add -- "${ALLOWED_FILES[@]}"
git diff --cached --quiet && finish NO_NEW_CHANGES "There is no new completed batch requiring deployment."
git commit -m "content: publish daily blog batch" >/dev/null
git push origin "HEAD:$BRANCH" --quiet
CURRENT_SHA="$(git rev-parse HEAD)"
write_batch_state "PENDING_QUEUE_CHECK" "pushed"

DEPLOYMENTS="$(api GET "$DEPLOYMENTS_PATH")"
QUEUED_COUNT="$(jq '[.. | objects | select((.status // .deployment_status // "") | ascii_downcase == "queued")] | length' <<< "$DEPLOYMENTS")"
SAME_COMMIT="$(jq --arg sha "$CURRENT_SHA" '[.. | objects | select((.commit_sha // .commit // .git_commit_sha // "") == $sha)] | map(select((.status // .deployment_status // "") | ascii_downcase | IN("queued","in_progress","running","processing","completed","success","successful"))) | length' <<< "$DEPLOYMENTS")"
if [[ "$SAME_COMMIT" != 0 ]]; then
  write_batch_state "DEPLOYMENT_ALREADY_PENDING" "active" "" "$QUEUED_COUNT"
  finish DEPLOYMENT_ALREADY_PENDING "The current commit already has a queued, active, or successful deployment."
fi
if [[ "$QUEUED_COUNT" -ge 3 ]]; then
  write_batch_state "SKIPPED_COOLIFY_QUEUE" "pushed" "" "$QUEUED_COUNT"
  finish SKIPPED_COOLIFY_QUEUE "Coolify has three or more queued deployments. Retry at the next scheduled run."
fi

TRIGGERED_AT="$(date -u +%Y-%m-%dT%H:%M:%SZ)"
RESPONSE="$(api POST "$DEPLOY_PATH?uuid=$APP_UUID&force=false")"
DEPLOYMENT_UUID="$(jq -r '.deployment_uuid // .uuid // .id // .deployment.id // empty' <<< "$RESPONSE")"
[[ -n "$DEPLOYMENT_UUID" ]] || finish DEPLOYMENT_FAILED "Coolify accepted no identifiable deployment UUID."

write_batch_state "DEPLOYMENT_SUBMITTED" "queued" "$DEPLOYMENT_UUID" "$QUEUED_COUNT"

finish DEPLOYMENT_SUBMITTED "One Coolify deployment was accepted; its UUID was recorded."
