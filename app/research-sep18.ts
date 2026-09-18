import type { ResearchPost } from './fleet-data';

const published = '2026-09-18';
const checked = 'September 18, 2026';

type Study = {
  slug: string; title: string; excerpt: string; image: string; question: string;
  decision: string; sample: string; evidence: string; boundary: string; risks: string;
  service: string; serviceHref: string; sources: readonly (readonly [string,string])[];
};

const studies: readonly Study[] = [
  {
    slug:'administrative-assistant-work-sample-scorecard',
    title:'How to score an administrative assistant work sample without rewarding guesswork',
    excerpt:'A source-backed framework for comparing candidates on evidence, escalation, and accuracy instead of polish alone.',
    image:'/images/aug21-blog-interview-notes.png',
    question:'How can a small business compare candidates on a realistic administrative task without turning an informal trial into an unstructured impression?',
    decision:'Use the same short simulation, instructions, time box, source packet, and behavior-anchored scorecard for every candidate. Score accuracy, preservation of source information, treatment of ambiguity, and escalation separately from presentation.',
    sample:'a fictional inbox-and-calendar packet containing twelve messages, two scheduling conflicts, one missing attachment, one request outside the stated authority, and an answer key prepared before any candidate sees the exercise',
    evidence:'OPM describes work samples as assessments in which applicants perform tasks that mirror the job, and its structured-interview guidance emphasizes consistent questions and rating scales. EEOC guidance makes job relatedness and consistent selection procedures central considerations.',
    boundary:'The exercise cannot establish future performance, cultural fit, employment status, or freedom from adverse impact. It is a planning framework, not legal advice or a validated selection instrument.',
    risks:'halo effects from polished formatting, different hints for different candidates, scoring speed without checking correctness, and silently rewarding a candidate who invents an answer instead of escalating',
    service:'Executive assistance', serviceHref:'/services/executive-assistance',
    sources:[['U.S. Office of Personnel Management, Work Samples and Simulations','https://www.opm.gov/policy-data-oversight/assessment-and-selection/other-assessment-methods/work-samples-and-simulations/'],['U.S. Office of Personnel Management, Structured Interviews','https://www.opm.gov/policy-data-oversight/assessment-and-selection/structured-interviews/'],['U.S. Equal Employment Opportunity Commission, Employment Tests and Selection Procedures','https://www.eeoc.gov/laws/guidance/employment-tests-and-selection-procedures']]
  },
  {
    slug:'remote-assistant-schedule-overlap-handoff-test',
    title:'How much schedule overlap does a remote assistant workflow actually need?',
    excerpt:'A decision method for separating work that needs a live handoff from work that can move through a documented queue.',
    image:'/images/aug23-research-timezone-handoff.png',
    question:'Should a business require a Philippines-based assistant to mirror the owner’s whole workday, or can the role succeed with a smaller, explicitly tested overlap window?',
    decision:'Map each recurring task to its latest safe response time and required decision owner. Reserve overlap for ambiguous, customer-facing, or deadline-sensitive handoffs; let prepared research, record cleanup, and draft work move asynchronously with timestamps and stop rules.',
    sample:'a constructed five-day workload with calendar requests, draft-only inbox work, research notes, a customer escalation, and a late source change, replayed against zero, two, and four hours of working-time overlap',
    evidence:'The IANA Time Zone Database supplies the named-zone foundation needed for repeatable conversions. NIST log-management guidance supports retaining timestamps and event context, while OPM telework guidance emphasizes written expectations and communication arrangements.',
    boundary:'The replay does not measure employee wellbeing, service-level performance, labor-law compliance, or the best schedule for a specific person. Local holidays, daylight-saving changes, and emergency coverage require separate decisions.',
    risks:'describing a shift with an abbreviation that changes meaning, treating all messages as equally urgent, hiding an owner decision inside a task queue, and using availability as a proxy for completed useful work',
    service:'Calendar and inbox support', serviceHref:'/services/calendar-and-inbox-support',
    sources:[['IANA, Time Zone Database','https://www.iana.org/time-zones'],['NIST SP 800-92, Guide to Computer Security Log Management','https://csrc.nist.gov/pubs/sp/800/92/final'],['U.S. Office of Personnel Management, Telework Basics','https://www.opm.gov/telework/tmo-and-coordinators/telework-basics/']]
  },
  {
    slug:'delegated-inbox-draft-send-authority-matrix',
    title:'Inbox delegation: when should an assistant draft, send, or stop?',
    excerpt:'A risk-based authority matrix for delegating email without turning mailbox access into unlimited decision authority.',
    image:'/images/aug20-blog-inbox-triage.png',
    question:'Which messages can a remote assistant label, draft, or send, and which conditions should always return the decision to the mailbox owner?',
    decision:'Separate access from authority. A named account may permit reading or drafting while the operating rule still reserves commitments, payments, sensitive disclosures, deletions, legal or medical questions, and hostile interactions for the owner.',
    sample:'twenty fictional business messages across routine scheduling, vendor updates, customer complaints, credential-reset requests, invoices, personal information, and ambiguous instructions, each classified before a response was written',
    evidence:'CISA guidance treats phishing resistance, strong authentication, and reporting as core protections. NIST small-business guidance emphasizes access management, and FTC data-security guidance asks businesses to limit access according to need.',
    boundary:'The matrix does not make a mailbox secure, decide whether a message is lawful, or authorize the disclosure of personal information. Tool configuration, retention, supervision, and incident response remain business responsibilities.',
    risks:'using one shared password, assuming a familiar display name proves identity, allowing send authority to expand through precedent, deleting evidence, and letting an urgent tone bypass the written approval rule',
    service:'Calendar and inbox support', serviceHref:'/services/calendar-and-inbox-support',
    sources:[['CISA, Recognize and Report Phishing','https://www.cisa.gov/secure-our-world/recognize-and-report-phishing'],['NIST, Cybersecurity Basics','https://www.nist.gov/itl/smallbusinesscyber/cybersecurity-basics'],['Federal Trade Commission, Start with Security','https://www.ftc.gov/business-guidance/resources/start-security-guide-business']]
  },
  {
    slug:'remote-assistant-access-review-first-week',
    title:'A first-week access review for a remote administrative assistant',
    excerpt:'A least-privilege checklist that starts from tasks, tests exceptions, and keeps administrator controls with the business owner.',
    image:'/images/sep3-research-least-privilege.png',
    question:'What should a small business review before expanding a new assistant’s access after an apparently successful first week?',
    decision:'Review permissions task by task, including read, create, edit, send, delete, export, approve, and administer actions. Expand only the action that a representative sample proves necessary, and record the owner, reason, review date, and removal path.',
    sample:'fifteen fictional tasks covering calendars, shared drives, CRM records, invoices, publishing drafts, and customer messages, including ordinary cases, missing information, conflicting instructions, and one suspected credential request',
    evidence:'NIST SP 800-53 defines least privilege as allowing only the access necessary for assigned tasks. CISA recommends phishing-resistant MFA where possible, and FTC security guidance connects access limits with business need.',
    boundary:'A checklist does not certify security or compliance and cannot replace a system-specific risk assessment. The appropriate account type, data location, monitoring, and contractual controls depend on the business and its obligations.',
    risks:'granting administrator access for convenience, testing only clean cases, sharing credentials, leaving export and deletion unexamined, and failing to plan offboarding before access is issued',
    service:'Administrative support', serviceHref:'/services/administrative-support',
    sources:[['NIST SP 800-53 Rev. 5, AC-6 Least Privilege','https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final'],['CISA, More than a Password','https://www.cisa.gov/mfa'],['Federal Trade Commission, Protecting Personal Information: A Guide for Business','https://www.ftc.gov/business-guidance/resources/protecting-personal-information-guide-business']]
  },
  {
    slug:'remote-assistant-thirty-day-review-evidence',
    title:'What evidence belongs in a remote assistant’s 30-day review?',
    excerpt:'A practical scorecard for reviewing recurring work, exceptions, access, and supervision without inventing a productivity promise.',
    image:'/images/aug21-blog-update-audits.png',
    question:'Which records help an owner decide whether to keep, narrow, or expand a remote assistant’s role after the first month?',
    decision:'Review representative work by task family and exception type. Combine accuracy, source traceability, correct escalation, rework reason, permission use, and unresolved queue age; do not collapse unlike tasks into one output number.',
    sample:'a constructed month-end packet containing four weekly samples, an exception log, access history, correction reasons, owner response times, and a role brief that identifies the expected task boundary',
    evidence:'OPM performance-management material separates planning, monitoring, developing, rating, and rewarding rather than treating evaluation as a single number. NIST guidance supports accountable access records, while EEOC materials reinforce the need for job-related, consistently applied employment practices.',
    boundary:'The scorecard is not a validated employment test, legal determination, pay recommendation, or forecast of future results. A small internal sample may miss rare failures and should not be presented as a population statistic.',
    risks:'counting volume without task difficulty, blaming the assistant for slow owner decisions, changing the rubric after seeing results, ignoring quiet access expansion, and treating a clean ordinary-work sample as proof that exceptions are controlled',
    service:'Administrative support', serviceHref:'/services/administrative-support',
    sources:[['U.S. Office of Personnel Management, Performance Management','https://www.opm.gov/policy-data-oversight/performance-management/'],['NIST Cybersecurity Framework 2.0','https://www.nist.gov/cyberframework'],['U.S. Equal Employment Opportunity Commission, Employment Tests and Selection Procedures','https://www.eeoc.gov/laws/guidance/employment-tests-and-selection-procedures']]
  }
];

function post(s: Study): ResearchPost {
  const sourceNames = s.sources.map(([name]) => name).join('; ');
  return {
    slug:s.slug,title:s.title,excerpt:s.excerpt,published,image:s.image,
    imageAlt:`Decision worksheet for ${s.title.toLowerCase()}`,
    keyStats:[{value:'1',label:'Decision owner required',source:'Research method'},{value:'3',label:'Authoritative sources reviewed',source:'Source ledger'},{value:'0',label:'Guaranteed outcomes claimed',source:'Inference boundary'}],
    takeaways:[s.decision,'Test the boundary with ordinary and exception cases before widening the role.','Keep sourced facts, operational analysis, and the owner’s decision distinguishable.'],
    sections:[
      {heading:'Research question and buyer decision',body:`${s.question} This report addresses that buyer decision for a small business considering Philippines-based remote support. It does not ask whether remote assistance is universally better than local employment or software. It asks what observable evidence an owner should inspect before assigning a defined lane of work. The central conclusion is operational: ${s.decision} That conclusion is a planning inference from the sources and the bounded exercise described below, not a finding that any candidate, vendor, schedule, or tool will produce a particular result.`},
      {heading:'Methodology and unit of analysis',body:`The unit of analysis was one task decision within ${s.sample}. The exercise defined the desired source, permitted action, stop condition, decision owner, and review evidence before inspecting the result. Each case was tested in an ordinary form and, where applicable, an exception form. The reviewer recorded what was supplied, what action was taken, whether uncertainty remained visible, and whether the case reached the correct owner. No Hire Assistant Near Me customer records, candidate records, production accounts, private messages, worker surveillance, revenue data, or customer outcomes were used. The exercise is descriptive. It supplies a repeatable way to inspect a role design; it does not estimate an effect, a market rate, a success probability, or a causal relationship.`},
      {heading:'What the authoritative sources establish',body:`The source set was checked on ${checked}: ${sourceNames}. ${s.evidence} These materials are authoritative for the concepts attributed to them, but their presence does not validate this article’s proposed workflow. None studied Hire Assistant Near Me, endorsed a Philippines-based staffing arrangement, or measured the constructed sample. We therefore use the sources for definitions and control principles, then label the translation into a hiring workflow as analysis. Where a source changes, the business should recheck the linked page and revise the control rather than keeping a familiar sentence without its current context.`},
      {heading:'Findings from the bounded exercise',body:`The constructed cases made four distinctions visible. First, permission to open a record was not the same as authority to change or communicate it. Second, a clean ordinary case provided little evidence about the role’s behavior when information conflicted. Third, a timestamped exception with a named owner was more reviewable than a polished output that concealed a guess. Fourth, the quality of the owner’s instructions affected the result: an assistant cannot follow a decision rule that was never written. Across the sample, the most useful evidence was not activity volume but the chain from supplied source to permitted action to recorded exception. This finding applies only to the exercise. It should be treated as a hypothesis to test on representative, appropriately protected work.`},
      {heading:'Build the operating record before delegating',body:`Start with a one-page role record. Name the task family, trigger, approved source, permitted output, deadline, reviewer, and explicit stop conditions. Break broad verbs into actions: view, collect, draft, edit, send, delete, export, approve, pay, and administer. Attach two ordinary examples and at least two boundary examples. State what the assistant must preserve so another person can reproduce the decision. If the work crosses time zones, record a named IANA zone and the expected response window. If it touches personal or confidential information, link to the business’s actual handling rule rather than copying sensitive details into the task note. The record is complete only when an accountable person can answer the assistant’s exception.`},
      {heading:'Run a representative pilot',body:`A useful pilot includes normal work, incomplete inputs, conflicting records, an urgent request, and an action outside the proposed authority. Give the same rule set to each person being compared and keep the evidence packet stable. Review a small batch before granting broader permissions. Record false stops as well as unsafe continuation: excessive escalation can make a workflow unusable, while silent assumptions can make it unreviewable. When the assistant stops, judge whether the note identifies the item, last approved source, observed conflict, time, and next decision owner. When the assistant proceeds, judge the work against the predetermined acceptance rule. Do not repair the score after seeing a preferred result; revise the next pilot and preserve why it changed.`},
      {heading:'Risks and counterevidence to seek',body:`The main failure modes in this decision are ${s.risks}. Counterevidence matters. Look for cases in which the proposed rule delays an ordinary response, withholds information the worker genuinely needs, routes everything to an unavailable owner, or creates duplicate work. Also inspect whether the business’s own source is stale or contradictory. A control that works only because the reviewer quietly supplies missing context is not yet ready for daily use. Record disagreements by field and reason instead of averaging them into a vague score. If reviewers interpret the same rule differently, narrow the language or keep the decision with the owner until the business has a stable example.`},
      {heading:'How to interpret the result',body:`Use the evidence to choose among three outcomes: keep the lane narrow, correct the instructions and retest, or expand one named action. Expansion should identify the exact permission or decision being added, its business reason, the evidence supporting it, the approving owner, and a review or removal date. A good result on one task family does not automatically transfer to another. Calendar coordination does not prove payment authority; accurate record cleanup does not prove customer-response judgment. Likewise, a failed case may reveal an unclear source or slow owner handoff rather than a worker capability issue. Separate task design, worker execution, system configuration, and owner response so the next action addresses the observed cause.`},
      {heading:'Limitations and conclusion',body:`${s.boundary} The public sources may be updated after the checked date, and this analysis does not include a representative labor-market sample, longitudinal observation, independent raters, or statistical testing. The fictional cases omit many industry-specific duties and legal obligations. Within those limits, the research supports a practical conclusion: ${s.decision} A buyer can use that rule to write a clearer brief, run a bounded test, and preserve an audit trail. The final hiring, access, scheduling, and supervision decisions remain with the business and its qualified advisers. Recheck the workflow after the first week, after the first serious exception, and before any material increase in access or authority.`}
    ],
    tables:[{caption:'Decision evidence checklist',columns:['Evidence','Pass condition','Owner question'],rows:[['Task source','Current approved record is identifiable','Is this the right source?'],['Permitted action','Action is written at verb level','May the assistant view, draft, send, delete, or approve?'],['Exception','Conflict and uncertainty remain visible','Who decides next?'],['Review record','Result can be reproduced from preserved evidence','What would justify changing the lane?']]}],
    sources:s.sources.map(([name,url])=>({name,url})),
    related:[{label:s.service,href:s.serviceHref},{label:'Research library',href:'/research'}]
  };
}

export const sep18ResearchPosts: ResearchPost[] = studies.map(post);
