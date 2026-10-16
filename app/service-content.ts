export type ServiceDetail = {
  audience: string;
  inputs: readonly string[];
  outputs: readonly string[];
  quality: readonly string[];
  scenarios: readonly { title: string; body: string }[];
  faqs: readonly { question: string; answer: string }[];
};

export const serviceDetails: Record<string, ServiceDetail> = {
  'executive-assistance': {
    audience: 'Executives and owners who need a prepared calendar, organized inbox, and reliable meeting follow-through without transferring business judgment.',
    inputs: ['Calendar rules, priority contacts, and protected focus blocks', 'Approved reply examples and inbox labels', 'Meeting purpose, participants, files, and required decisions'],
    outputs: ['A daily priority brief with decisions separated from routine work', 'Held reply drafts and a clearly marked exception queue', 'Meeting briefs, notes, owners, and dated follow-up lists'],
    quality: ['Every calendar change records the requester, time zone, and approval status', 'Drafts never create a purchase, promise, or policy without executive approval', 'Meeting actions have one owner and one due date'],
    scenarios: [{ title: 'Before an executive day', body: 'Prepare a concise brief from approved sources: schedule changes, messages requiring judgment, meeting context, and unresolved follow-up.' }, { title: 'After a meeting', body: 'Turn supplied notes into a decision log and action list, then hold ambiguous commitments for the executive.' }],
    faqs: [{ question: 'Can the assistant send email as the executive?', answer: 'Start with sorting and held drafts. Routine sending should begin only after explicit examples, recipient rules, and review show that the scope is safe.' }, { question: 'What stays with the executive?', answer: 'Strategy, private personnel matters, payments, account recovery, legal or financial decisions, and any message that commits the business.' }, { question: 'How is performance reviewed?', answer: 'Review schedule accuracy, draft corrections, correctly escalated exceptions, and whether meeting actions remain traceable.' }],
  },
  'calendar-and-inbox-support': {
    audience: 'Owners and small teams whose email and scheduling work follows repeatable rules but still needs a named decision maker.',
    inputs: ['Mailbox labels, examples, and priority-sender rules', 'Calendar access, working hours, time zones, and buffer rules', 'Approved response language and escalation contacts'],
    outputs: ['A triaged inbox with urgent and uncertain messages separated', 'Held reply drafts linked to the source message', 'Calendar options, confirmed details, and an unanswered-request list'],
    quality: ['No deletion, promise, or sensitive send without the defined approval', 'Every meeting records date, zone, attendees, duration, and owner', 'Private, payment, legal, medical, and angry-customer messages stop for review'],
    scenarios: [{ title: 'Morning inbox pass', body: 'Label new messages, prepare routine drafts, and place unclear or sensitive requests in an owner queue.' }, { title: 'Scheduling request', body: 'Check approved availability and prepare options without resolving priority conflicts on the owner’s behalf.' }],
    faqs: [{ question: 'Can the assistant send email for me?', answer: 'Yes, but only after the exact routine categories and send authority are documented and tested.' }, { question: 'Can the role overlap my business hours?', answer: 'Yes. Confirm the required overlap and the handoff outside those hours before matching.' }, { question: 'What should stay with me?', answer: 'Keep sensitive decisions, payments, private staff matters, customer remedies, and licensed advice with the accountable owner.' }],
  },
  'customer-service-assistance': {
    audience: 'Support teams with documented policies, a searchable knowledge base, and a manager who owns exceptions and customer remedies.',
    inputs: ['Approved help articles, tone examples, and channel priorities', 'Order or account fields the assistant may view', 'Escalation rules for refunds, threats, privacy, and unresolved complaints'],
    outputs: ['Categorized tickets with complete customer context', 'Policy-based response drafts or approved routine replies', 'An exception queue showing issue, evidence, owner, and next action'],
    quality: ['Responses cite the approved policy or account evidence used', 'Refunds, credits, guarantees, and policy exceptions stay with authorized staff', 'Each escalation preserves the customer’s words and prior actions'],
    scenarios: [{ title: 'Routine status question', body: 'Verify the allowed account fields, prepare a factual update, and avoid promises not present in the source record.' }, { title: 'Complaint outside policy', body: 'Acknowledge the issue using approved language and route the remedy decision with complete context.' }],
    faqs: [{ question: 'Can an assistant handle live customer messages?', answer: 'Yes for approved categories after training; uncertain, sensitive, or remedy-seeking messages should stop for a manager.' }, { question: 'Can the assistant issue refunds?', answer: 'Only if your written policy grants a specific limit and the account access supports it. Otherwise the assistant prepares the evidence for an authorized owner.' }, { question: 'What should we measure?', answer: 'Measure correct categorization, response accuracy, complete escalations, reopen reasons, and policy exceptions, not ticket volume alone.' }],
  },
  'sales-administrative-support': {
    audience: 'Sales teams that need cleaner CRM records, prepared follow-up, and visible handoffs while keeping claims and commercial decisions accountable.',
    inputs: ['Lead source, consent status, stage definitions, and suppression rules', 'Approved templates, product facts, and claim boundaries', 'CRM field definitions and ownership rules'],
    outputs: ['Deduplicated records with missing evidence flagged', 'Follow-up drafts tied to approved source and stage', 'Pipeline exception lists with owner, next action, and due date'],
    quality: ['No outreach proceeds from an unclear or suppressed record', 'Drafts contain only approved product and pricing claims', 'Stage changes preserve the evidence and accountable owner'],
    scenarios: [{ title: 'Lead-record cleanup', body: 'Normalize fields and flag duplicates without inventing consent, source, title, budget, or intent.' }, { title: 'Follow-up preparation', body: 'Prepare the approved message only when channel and communication status are visible.' }],
    faqs: [{ question: 'Can the assistant cold email prospects?', answer: 'Only under your approved policy and applicable requirements. The role can organize records and prepare drafts but should not infer permission.' }, { question: 'Can the assistant change deal stages?', answer: 'Use explicit stage-entry evidence and preserve an owner for disputed or incomplete records.' }, { question: 'What remains with sales leadership?', answer: 'Pricing exceptions, claims, contracts, disputed consent, forecasting judgment, and final commercial commitments.' }],
  },
  'ecommerce-assistance': {
    audience: 'Stores with documented catalog, order, and customer-service procedures that need routine back-office preparation and exception routing.',
    inputs: ['Catalog standards, order states, shipping evidence, and return policy', 'Approved product copy and inventory source of truth', 'Limits for edits, discounts, refunds, and substitutions'],
    outputs: ['Product-record updates prepared from approved source fields', 'Order-status replies or drafts based on current evidence', 'Exception lists for missing stock, delivery conflicts, returns, and disputes'],
    quality: ['Variant, price, and inventory edits match the named source record', 'A shipment status is not presented as a guaranteed arrival', 'Refunds, substitutions, and disputed transactions stop for an authorized owner'],
    scenarios: [{ title: 'Catalog update', body: 'Prepare titles, attributes, and image assignments from approved source material, then flag conflicts rather than guessing.' }, { title: 'Delayed order', body: 'Gather order and carrier evidence and prepare a factual update; route promises and remedies to the designated owner.' }],
    faqs: [{ question: 'Can the assistant publish product changes?', answer: 'Begin with prepared drafts and a review queue. Grant narrow publishing rights only for stable fields after accuracy is demonstrated.' }, { question: 'Can the assistant refund an order?', answer: 'Only within a documented authorization limit; disputed, high-value, or policy-exception cases remain with authorized staff.' }, { question: 'What access is appropriate?', answer: 'Use a named account limited to required catalog, order, or support views, with payment and account-security controls retained locally.' }],
  },
  'real-estate-assistance': {
    audience: 'Real-estate teams needing transaction and listing administration while licensed judgment, negotiation, and client promises stay with accountable professionals.',
    inputs: ['Transaction checklist, supplied dates, document index, and status definitions', 'Approved listing fields, templates, and brand standards', 'Brokerage policy and escalation contacts'],
    outputs: ['Status trackers with missing documents and dates clearly flagged', 'Listing or CRM updates prepared from approved records', 'Appointment and follow-up notes routed to the correct owner'],
    quality: ['No contract term or deadline is interpreted by the assistant', 'Every status reflects a named source and last-updated time', 'Negotiation, disclosure, advice, and representation questions stop for licensed staff'],
    scenarios: [{ title: 'Transaction checklist', body: 'Record supplied milestones and missing files without interpreting contract language or changing legal deadlines.' }, { title: 'Listing administration', body: 'Prepare approved fields and media references, then route discrepancies to the listing owner.' }],
    faqs: [{ question: 'Can the assistant speak with clients?', answer: 'The role may coordinate approved administrative details, but advice, negotiation, disclosures, and promises remain with licensed or authorized staff.' }, { question: 'Can the assistant manage transaction dates?', answer: 'The assistant can record supplied dates and reminders; the accountable professional confirms contractual meaning and changes.' }, { question: 'What systems can be supported?', answer: 'A scoped role can work in your approved CRM, document, calendar, and listing tools using named, limited access.' }],
  },
  'marketing-coordination': {
    audience: 'Marketing teams with an approved calendar, brand rules, and subject-matter owners who need assets and evidence organized before publication.',
    inputs: ['Campaign brief, audience, channel, due dates, and approval owner', 'Approved claims, source links, voice examples, and asset rights', 'Publishing checklist and channel-specific specifications'],
    outputs: ['Editorial calendars and production-status boards', 'Draft briefs, asset packages, and source ledgers', 'Preflight reports showing missing approvals, links, alt text, and tracking fields'],
    quality: ['Every factual claim maps to an approved source or is removed', 'Asset rights, dimensions, and channel destination are recorded', 'Nothing publishes without the named editorial or campaign approval'],
    scenarios: [{ title: 'Campaign handoff', body: 'Convert the approved brief into tasks, dependencies, owners, and due dates while preserving the source material.' }, { title: 'Publication preflight', body: 'Check links, claims, metadata, assets, and approval state, then stop incomplete items.' }],
    faqs: [{ question: 'Can the assistant write content?', answer: 'The role can prepare drafts from approved briefs and evidence. Editorial judgment, sensitive claims, and final publication remain with your owner.' }, { question: 'Can the assistant publish to social channels?', answer: 'Only after channel rules, approved content, and publishing permission are explicit and tested.' }, { question: 'How do we prevent generic content?', answer: 'Require a specific audience, source set, examples, exclusions, and accountable reviewer in every brief.' }],
  },
  'bookkeeping-administration': {
    audience: 'Owners and bookkeeping teams that need source documents organized and exceptions prepared without delegating accounting, tax, or payment judgment.',
    inputs: ['Invoices, receipts, statements, chart references, and cutoff dates', 'Vendor and customer records from approved systems', 'Exception categories and the accountable bookkeeper or owner'],
    outputs: ['Complete source-document packets with missing fields identified', 'Prepared entry or reconciliation queues for review', 'Exception reports for duplicates, mismatches, missing evidence, and unclear treatment'],
    quality: ['Every prepared record retains its source document and period', 'The assistant does not choose tax treatment or resolve reconciliation judgment', 'Payments and account changes require authorized approval outside the support lane'],
    scenarios: [{ title: 'Month-end document check', body: 'Match supplied records to the period and identify missing support before an accountable bookkeeper reviews entries.' }, { title: 'Vendor-file cleanup', body: 'Normalize approved fields and flag banking, tax, identity, or duplicate-record conflicts without changing sensitive data.' }],
    faqs: [{ question: 'Is this a bookkeeping or tax service?', answer: 'No. The support role organizes source records and prepares review queues; qualified staff retain accounting, tax, reconciliation, and filing decisions.' }, { question: 'Can the assistant make payments?', answer: 'Payment authority should remain with authorized client-side staff unless a separately controlled process explicitly says otherwise.' }, { question: 'What is a good first task?', answer: 'Start with one month of document collection and an exception list so the reviewer can test completeness and correction quality.' }],
  },
  'recruitment-assistance': {
    audience: 'Hiring teams that need job, candidate, and interview administration while employment decisions and sensitive judgments stay with authorized staff.',
    inputs: ['Approved role brief, required criteria, interview stages, and schedule', 'Candidate-submitted records and communication templates', 'Privacy, retention, accommodation, and escalation rules'],
    outputs: ['Structured candidate records with missing information flagged', 'Interview scheduling and prepared communication drafts', 'Stage trackers and decision packets that preserve reviewer ownership'],
    quality: ['No protected characteristic or unsupported inference enters screening notes', 'Candidate records follow the approved access and retention rules', 'Selection, rejection rationale, compensation, and accommodation decisions stay with authorized staff'],
    scenarios: [{ title: 'Application administration', body: 'Record candidate-supplied evidence against approved fields and flag incomplete records without making the hiring decision.' }, { title: 'Interview coordination', body: 'Offer approved times, preserve time zones and participants, and route accommodation or sensitive questions.' }],
    faqs: [{ question: 'Can the assistant screen candidates?', answer: 'The role can organize evidence against explicit job criteria, but accountable hiring staff should own judgment, exceptions, and decisions.' }, { question: 'Can the assistant reject applicants?', answer: 'Use approved communications only after the authorized decision and required records are complete.' }, { question: 'How should candidate data be protected?', answer: 'Limit access to needed fields, use approved systems, document retention, and escalate privacy or accommodation requests.' }],
  },
  'project-coordination': {
    audience: 'Small teams with recurring projects that need status, dependencies, and handoffs kept current while scope and priority decisions remain with project owners.',
    inputs: ['Approved scope, milestones, owners, dependencies, and definition of done', 'Meeting notes, work evidence, and change-request path', 'Risk categories and escalation timing'],
    outputs: ['Current project board with owner, state, evidence, and next action', 'Meeting action logs and dependency follow-up', 'Risk and change queues for the project owner'],
    quality: ['A task is not marked complete without the agreed evidence', 'Blocked work names the dependency and accountable owner', 'Priority, budget, scope, and acceptance changes stop for project leadership'],
    scenarios: [{ title: 'Weekly status preparation', body: 'Reconcile the board with supplied evidence and separate completed, waiting, blocked, and decision-needed work.' }, { title: 'Cross-team handoff', body: 'Record the required input, receiving owner, due date, and acceptance condition before moving the task.' }],
    faqs: [{ question: 'Can the assistant manage the whole project?', answer: 'The assistant can coordinate records and follow-up. Scope, priority, budget, technical acceptance, and people decisions remain with the named owner.' }, { question: 'Which tool can the role use?', answer: 'The workflow can be adapted to your approved project and communication tools with named, limited access.' }, { question: 'What should the first week prove?', answer: 'It should prove that task states, dependencies, evidence, and escalation paths are understood before coordination volume grows.' }],
  },
};
