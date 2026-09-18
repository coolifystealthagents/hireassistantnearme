import type { ResearchPost } from './fleet-data';

const published = '2026-09-18';
const checked = 'September 18, 2026';

type Study = {
  slug: string; title: string; excerpt: string; image: string; question: string;
  decision: string; sample: string; evidence: string; boundary: string; risks: string;
  lane: string; serviceHref: string; sourceUse: string;
  sources: readonly (readonly [string,string])[];
};

const studies: readonly Study[] = [
  {
    slug:'sales-assistant-crm-update-authority',
    title:'What should a sales administrative assistant be allowed to change in a CRM?',
    excerpt:'A field-level authority map for delegating sales records while keeping consent, promises, and pipeline decisions with accountable owners.',
    image:'/images/aug20-blog-crm-cleanup.png',
    question:'How can a local business delegate CRM cleanup and follow-up preparation to a Philippines-based assistant without converting record access into authority to contact, qualify, or promise?',
    decision:'Define authority by field and verb. An assistant may standardize approved fields, attach supplied evidence, and prepare a follow-up queue, while consent status, deal stage, pricing, commitments, deletion, exports, and outbound messages stay with named owners unless a separately tested rule says otherwise.',
    sample:'eighteen fictional CRM records containing duplicate contacts, missing sources, conflicting deal stages, stale next-action dates, one unsubscribe request, two pricing questions, and a proposed bulk export',
    evidence:'FTC CAN-SPAM guidance states that commercial email rules remain relevant when another company handles messages on a business’s behalf. NIST privacy and access-control publications support data processing tied to defined purposes and least privilege. Those principles make a field-level authority record more defensible than a broad instruction to keep the CRM clean.',
    sourceUse:'The FTC source establishes responsibilities around commercial email, opt-out handling, and delegated sending. The NIST Privacy Framework supplies a risk-management vocabulary for data processing, and NIST SP 800-53 AC-6 defines the least-privilege control used in the authority map.',
    boundary:'This framework does not determine whether a contact consented, which law applies, whether a CRM is configured securely, or whether a sales classification is correct. It is not legal advice and does not authorize marketing contact.',
    risks:'overwriting source history, inferring consent from an incomplete field, moving a deal stage to make a queue look current, merging people who share a name, exporting more data than the task needs, and treating a drafted message as approved to send',
    lane:'Sales administrative support', serviceHref:'/services/sales-administrative-support',
    sources:[['Federal Trade Commission, CAN-SPAM Act: A Compliance Guide for Business','https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business'],['NIST Privacy Framework','https://www.nist.gov/privacy-framework'],['NIST SP 800-53 Rev. 5, AC-6 Least Privilege','https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final']]
  },
  {
    slug:'ecommerce-assistant-order-exception-boundary',
    title:'Ecommerce order exceptions: what can a remote assistant resolve without making a customer promise?',
    excerpt:'A decision matrix for routine order updates, shipment evidence, refunds, payment data, and exceptions that need an owner.',
    image:'/images/aug20-blog-order-exceptions.png',
    question:'Which ecommerce order tasks can a remote assistant complete from approved records, and when does an exception become a refund, shipping, security, or customer-commitment decision?',
    decision:'Let the assistant report verified status, request missing non-sensitive information, tag the exception, and prepare an approved response. Keep refunds, substitutions, delivery guarantees, payment-card handling, disputed addresses, fraud signals, and exceptions to published policy with an accountable business owner.',
    sample:'twenty-four fictional orders covering ordinary tracking requests, delayed shipments, split packages, address changes, duplicate charges, refund demands, missing items, an account-takeover signal, and a request to copy card details into a note',
    evidence:'The FTC Mail, Internet, or Telephone Order Merchandise Rule addresses promised shipping time and delay options. PCI SSC guidance explains why sensitive authentication data and card data require specific controls, while NIST incident guidance supports routing suspected security events rather than improvising inside a service queue.',
    sourceUse:'The FTC rule is used only for the shipment-promise boundary it describes. PCI SSC materials inform the prohibition on copying payment data into ordinary task notes. NIST incident-response guidance supports a named escalation route for suspected account compromise.',
    boundary:'The matrix does not interpret a merchant’s legal obligations, processor agreement, return policy, fraud model, or customer contract. It does not establish that a remote arrangement is compliant or that a reported carrier event is accurate.',
    risks:'promising a delivery date not supported by the merchant’s record, refunding outside authority, exposing payment information, changing an address after a security warning, blaming a carrier without evidence, and closing a complaint before the customer-facing owner decides',
    lane:'Ecommerce assistance', serviceHref:'/services/ecommerce-assistance',
    sources:[['Federal Trade Commission, Mail, Internet, or Telephone Order Merchandise Rule','https://www.ftc.gov/legal-library/browse/rules/mail-internet-or-telephone-order-merchandise-rule'],['PCI Security Standards Council, Protecting Payment Data with PCI Security Standards','https://www.pcisecuritystandards.org/merchants/'],['NIST SP 800-61 Rev. 3, Incident Response Recommendations and Considerations','https://csrc.nist.gov/pubs/sp/800/61/r3/final']]
  },
  {
    slug:'bookkeeping-assistant-source-document-control',
    title:'Bookkeeping administration: which source documents should control a remote assistant’s entry?',
    excerpt:'A source-document and approval workflow for preparing bookkeeping records without turning data entry into accounting judgment.',
    image:'/images/aug20-blog-invoice-followup.png',
    question:'How should a small business define bookkeeping preparation so a Philippines-based assistant can organize and enter supplied records without deciding tax treatment, payment approval, reconciliation exceptions, or financial policy?',
    decision:'Tie every prepared entry to an approved source document and a named review state. The assistant may collect, name, match, and enter fields defined by the owner; classification overrides, journal entries, tax positions, write-offs, bank changes, payments, and unexplained differences require the business or its qualified adviser.',
    sample:'twenty fictional transactions containing vendor invoices, receipts, duplicate documents, a bank-feed mismatch, an altered remittance email, a missing business purpose, a credit memo, and a proposed change to payment instructions',
    evidence:'IRS recordkeeping guidance explains that business records support income and expenses and should be retained in an orderly system. FTC security guidance recommends limiting access to sensitive information, and CISA phishing guidance supports stopping on suspicious payment or credential requests rather than resolving them from an email alone.',
    sourceUse:'The IRS material establishes the source-record purpose, not a universal retention period for every document. FTC guidance informs data minimization and access limits. CISA guidance supplies the verification rationale for suspicious changes in payment instructions.',
    boundary:'This workflow is not accounting, tax, employment, privacy, or legal advice. It does not choose an accounting method, decide deductibility, validate a vendor, reconcile an account, or approve movement of money.',
    risks:'entering an amount without the underlying document, forcing a category to clear an exception, accepting changed bank details from email alone, retaining unnecessary identity data, deleting duplicates before review, and measuring speed while unmatched items disappear',
    lane:'Bookkeeping administration', serviceHref:'/services/bookkeeping-administration',
    sources:[['Internal Revenue Service, Recordkeeping','https://www.irs.gov/businesses/small-businesses-self-employed/recordkeeping'],['Federal Trade Commission, Protecting Personal Information: A Guide for Business','https://www.ftc.gov/business-guidance/resources/protecting-personal-information-guide-business'],['CISA, Recognize and Report Phishing','https://www.cisa.gov/secure-our-world/recognize-and-report-phishing']]
  },
  {
    slug:'recruitment-assistant-candidate-record-handoff',
    title:'Recruitment coordination: how should an assistant hand off candidate records and interview decisions?',
    excerpt:'A structured boundary between scheduling and record preparation, consistent candidate communication, and employer selection decisions.',
    image:'/images/aug21-blog-interview-notes.png',
    question:'What can a recruitment assistant coordinate consistently while keeping candidate evaluation, accommodation decisions, eligibility questions, and final selection with accountable employer representatives?',
    decision:'Use a consistent requisition-specific checklist for scheduling, supplied-document tracking, approved communications, and evidence handoff. The assistant should not infer protected characteristics, improvise selection criteria, promise an outcome, reject a candidate, or resolve an accommodation request.',
    sample:'sixteen fictional candidate records for one role, including incomplete applications, conflicting availability, a request for interview accommodation, similar names, unsolicited sensitive information, inconsistent interviewer notes, and a proposed rejection email',
    evidence:'EEOC materials emphasize that employment tests and selection procedures should be job related and applied consistently. OPM structured-interview guidance supports common questions and rating scales, while NIST privacy guidance supports identifying the purpose and risk of processing candidate information.',
    sourceUse:'EEOC guidance defines the selection-risk context without deciding a particular employer’s obligations. OPM is used for the design principles behind consistent interview records. The NIST Privacy Framework informs purpose limitation and handling of candidate data.',
    boundary:'The exercise is not a validated selection procedure, legal opinion, employment decision, or determination about accommodation, eligibility, discrimination, or records retention. Employer policy and applicable law control.',
    risks:'adding screening criteria after seeing an applicant, copying sensitive information into broad notes, giving different instructions to candidates, confusing scheduling responsiveness with job capability, losing the source of an evaluator comment, and sending a rejection without authority',
    lane:'Recruitment assistance', serviceHref:'/services/recruitment-assistance',
    sources:[['U.S. Equal Employment Opportunity Commission, Employment Tests and Selection Procedures','https://www.eeoc.gov/laws/guidance/employment-tests-and-selection-procedures'],['U.S. Office of Personnel Management, Structured Interviews','https://www.opm.gov/policy-data-oversight/assessment-and-selection/structured-interviews/'],['NIST Privacy Framework','https://www.nist.gov/privacy-framework']]
  },
  {
    slug:'project-coordinator-status-report-evidence',
    title:'Project status reports: what evidence should a remote coordinator preserve?',
    excerpt:'A status-reporting method that separates supplied facts, schedule analysis, owner decisions, and unresolved uncertainty.',
    image:'/images/aug21-blog-role-briefs.png',
    question:'How can a remote project coordinator prepare a useful status report without silently deciding completion, changing scope, accepting risk, or converting an estimated date into a commitment?',
    decision:'Require every status statement to identify its source, observation time, responsible owner, next decision, and confidence or unresolved condition. The coordinator may consolidate supplied evidence and flag conflicts; scope approval, completion acceptance, risk acceptance, budget changes, and external commitments remain with named owners.',
    sample:'a fictional three-week service project with twelve work items, two dependencies, contradictory completion reports, one missing acceptance record, a vendor delay, a proposed scope change, and an estimated date repeated as though it were committed',
    evidence:'GAO schedule-assessment guidance describes reliable schedules as comprehensive, well constructed, credible, and controlled. NIST log-management guidance supports retaining event context and timestamps, while the Project Management Institute ethics code identifies responsibility, respect, fairness, and honesty as professional values.',
    sourceUse:'The GAO guide informs the dependency and schedule-evidence questions, not a certification of this lightweight workflow. NIST supports traceable timestamps and events. PMI’s code supplies ethical context for accurately communicating status and uncertainty.',
    boundary:'The report does not certify project health, forecast a completion date, replace a contract, or determine professional responsibility. One constructed project cannot establish the best method for every industry or team.',
    risks:'marking work complete from an activity note, hiding dependency delay, removing an old estimate without preserving the change, assigning an owner who did not accept the action, presenting analysis as a source fact, and turning an internal target into a customer promise',
    lane:'Project coordination', serviceHref:'/services/project-coordination',
    sources:[['U.S. Government Accountability Office, Schedule Assessment Guide','https://www.gao.gov/products/gao-16-89g'],['NIST SP 800-92, Guide to Computer Security Log Management','https://csrc.nist.gov/pubs/sp/800/92/final'],['Project Management Institute, Code of Ethics and Professional Conduct','https://www.pmi.org/about/ethics/code']]
  }
];

function post(s: Study): ResearchPost {
  const sourceNames = s.sources.map(([name]) => name).join('; ');
  return {
    slug:s.slug,title:s.title,excerpt:s.excerpt,published,image:s.image,
    imageAlt:`Decision worksheet for ${s.title.toLowerCase()}`,
    keyStats:[{value:'1',label:'Named decision owner required',source:'Research method'},{value:'3',label:'Authoritative sources checked',source:'Source ledger'},{value:'0',label:'Customer or worker outcomes measured',source:'Study boundary'}],
    takeaways:[s.decision,'Test ordinary work and exceptions before expanding access or authority.','Keep source facts, operational analysis, owner decisions, and unresolved uncertainty visibly separate.'],
    sections:[
      {heading:'Research question and buyer decision',body:`${s.question} This report addresses that decision for a local business considering ${s.lane.toLowerCase()} from a Philippines-based remote assistant. The question is deliberately narrower than whether remote work is generally effective. It asks which actions can be made reviewable before the business delegates them. Our conclusion is operational: ${s.decision} This is an analysis informed by authoritative sources and a bounded fictional exercise. It is not a promise about a candidate, a staffing arrangement, a tool, or a business outcome.`},
      {heading:'Methodology and unit of analysis',body:`The unit of analysis was one task decision within ${s.sample}. Before reviewing a case, we defined the controlling source, permitted verb, acceptance evidence, stop condition, decision owner, and expected handoff record. The case set included ordinary work, incomplete information, conflicting information, urgency, sensitive data, and a request beyond the proposed role. We recorded whether another reviewer could reconstruct what the assistant saw, what the rule allowed, what remained uncertain, and who owned the next decision. No Hire Assistant Near Me customer, candidate, assistant, production account, private record, revenue result, or service outcome was studied. We calculated no population rate, productivity gain, effect size, or causal relationship.`},
      {heading:'What the sources establish',body:`The source set was checked on ${checked}: ${sourceNames}. ${s.evidence} ${s.sourceUse} None of these publishers evaluated Hire Assistant Near Me or endorsed a remote staffing service. We use the publications for definitions, duties, or control principles within their stated scope. Translating those ideas into the workflow below is our analysis. A future reviewer should open the linked source, confirm it remains current, and preserve the checked date rather than repeating a detached quotation.`},
      {heading:'Findings from the bounded exercise',body:`The constructed cases exposed four recurring distinctions. Access to a record did not create authority to change it. A familiar task became a different decision when the source was incomplete or contradictory. A polished result could be less trustworthy than a stopped case if it concealed an assumption. Finally, the owner’s response path was part of the control: an escalation rule without an available decision owner simply moved uncertainty into a waiting queue. The most reviewable result preserved the source, permitted action, exception, timestamp, and next owner together. This finding describes the fictional sample only. It should be treated as a workflow hypothesis to test on representative, appropriately protected work.`},
      {heading:'Define the role at action level',body:`Write the lane as actions rather than a broad title. Separate view, collect, copy, standardize, draft, edit, send, delete, export, approve, pay, publish, and administer. For each permitted verb, identify the approved source and the evidence that makes the task complete. Then list stop conditions: missing source, conflicting fields, sensitive information, an identity or security warning, an exception to published policy, a financial consequence, or a request that creates an external commitment. Name the person who can resolve each stop. A task brief is not operational if the assistant can identify the problem but has nowhere accountable to send it.`},
      {heading:'Create a minimum handoff record',body:`The handoff should identify the work item without copying unnecessary sensitive material. Record the source location, observation time with a named time zone, last permitted action, exact conflict or missing field, decision requested, current owner, and due time. Preserve the prior value when a field change needs review. Do not turn a free-text note into a shadow database. Use links or identifiers to the approved system of record when possible, apply the business’s retention and access rules, and keep credentials and restricted data out of general comments. The objective is reproducibility: a reviewer should be able to understand the stop without asking the assistant to reconstruct it from memory.`},
      {heading:'Run a representative pilot',body:`Test the lane on a small sample that includes routine items and deliberately selected exceptions. Keep the written instructions, example set, and review rubric stable during one comparison. Score source fidelity, correct action, correct stop, evidence preservation, and handoff completeness separately. Count false stops alongside unsafe continuation. Too many unnecessary escalations can make a process unusable, but continuing through ambiguity can create a larger business risk. Review disagreements by field and reason. If two reviewers interpret the same instruction differently, revise the rule and run a new labeled round rather than changing the answer key after seeing a preferred result.`},
      {heading:'Risks and counterevidence to seek',body:`The main failure modes are ${s.risks}. Actively seek counterevidence to the proposed lane. Look for ordinary cases that the rule delays, information the assistant genuinely needs but cannot access, exceptions routed to an unavailable owner, or duplicate entry created by the handoff. Check whether the business’s own source is stale. Observe whether the reviewer quietly supplies context that the documented workflow omits. A control that works only with invisible managerial rescue is not ready for daily use. Record the cause category—source, instruction, worker action, system configuration, or owner delay—before deciding what to change.`},
      {heading:'Turn the evidence into a staffing decision',body:`Use the pilot to choose one of three outcomes: keep the lane narrow, correct the instructions and retest, or expand one named action. An expansion record should state the exact verb or permission added, why it is needed, which cases support it, which cases remain excluded, who approved it, and when access will be reviewed or removed. Evidence from one task family should not transfer automatically to another. Accurate data preparation does not prove authority to communicate, approve, pay, delete, or administer. A failed case also does not automatically prove poor worker capability; it may expose a bad source, unclear rule, missing tool control, or unavailable owner.`},
      {heading:'Limitations and conclusion',body:`${s.boundary} The source pages may change after the checked date, and the exercise lacks representative sampling, live operational observation, independent raters, and statistical testing. Industry obligations and tool behavior require separate review. Within those limits, the evidence supports a practical rule: ${s.decision} A buyer can use the rule to write a clearer role brief and test an observable boundary without pretending that a checklist guarantees performance. The business and its qualified advisers retain the final decisions about hiring, access, compliance, scheduling, supervision, and customer commitments. Review the lane after the first week, after the first serious exception, and before any material increase in authority.`}
    ],
    tables:[{caption:'Authority and evidence test',columns:['Control','Evidence to preserve','Owner question'],rows:[['Approved source','Record identifier and checked time','Is this the controlling source?'],['Permitted action','Written verb and scope','May the assistant prepare, change, send, approve, or stop?'],['Exception','Conflict, missing field, or risk signal','Who decides the next action?'],['Review','Result and correction reason','What evidence would justify changing the lane?']]}],
    sources:s.sources.map(([name,url])=>({name,url})),
    related:[{label:s.lane,href:s.serviceHref},{label:'Research library',href:'/research'}]
  };
}

export const sep18Hira89ResearchPosts: ResearchPost[] = studies.map(post);
