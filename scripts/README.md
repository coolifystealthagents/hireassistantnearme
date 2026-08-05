# Operational scripts

`coolify-batched-deploy.sh` is intended to run at `40 9 * * *` in UTC, after
the blog and research routines. It requires a JSON completion manifest with
`complete`, `build_passed`, `required_items_complete`, zero pending/failed/
in-progress/blocked counts, and a `changed_files` array.

The manifest may also include `public_urls`, an array of newly published blog
URLs. Set `PRIMARY_URLS` to a comma-separated list of core paths such as
`/blog,/research` so a successful deployment checks those pages too. If no
URLs are supplied, the website root is checked.

Required secrets are supplied only through `COOLIFY_API_URL`,
`COOLIFY_API_TOKEN`, and `COOLIFY_APPLICATION_UUID`. The token is never
printed or written to the repository. The script records deployment metadata
in `.deployment/coolify-state.json` (override with `COOLIFY_STATE_FILE`) and
returns one of the documented routine outcomes as JSON. A cron entry for the
UTC schedule is:

```cron
40 9 * * * /path/to/repo/scripts/coolify-batched-deploy.sh
```
