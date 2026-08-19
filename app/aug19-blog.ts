// Explicit August 19 Blog records. Each record owns its route, date, and body.
const topics = [
  ['real-estate-lead-routing', 'Real estate lead routing', 'one inquiry record', 'the licensed agent', 'claiming a lead is qualified or promising a response', 'source message, contact channel, property interest, and next owner action'],
  ['clinic-appointment-prep', 'Clinic appointment preparation', 'one appointment request', 'the authorized office coordinator', 'interpreting symptoms or confirming clinical suitability', 'received request, permitted identifiers, scheduling gap, and review owner'],
  ['home-service-job-follow-up', 'Home-service job follow-up', 'one post-visit follow-up record', 'the job manager', 'diagnosing a fault or promising a repair outcome', 'job reference, customer message, technician note, and next action'],
  ['law-firm-intake-indexing', 'Law-firm intake indexing', 'one intake index card', 'the attorney or intake lead', 'giving legal advice or deciding matter acceptance', 'source contact, matter type, missing field, and attorney review state'],
  ['ecommerce-return-queue', 'Ecommerce return queue management', 'one return request', 'the store operator', 'approving a refund or interpreting a warranty exception', 'order reference, customer statement, policy question, and owner decision'],
  ['agency-client-brief-prep', 'Agency client brief preparation', 'one campaign brief packet', 'the account lead', 'promising scope, performance, or a delivery date', 'approved request, source links, open questions, and accountable reviewer'],
  ['coach-session-scheduling', 'Coach session scheduling', 'one session coordination record', 'the coach or program owner', 'giving coaching advice or changing a client commitment', 'requested window, client context, calendar state, and next confirmation'],
  ['bookkeeping-document-chase', 'Bookkeeping document chasing', 'one missing-document case', 'the bookkeeper', 'classifying a transaction or offering tax guidance', 'request source, period, document status, and professional review question'],
  ['property-management-maintenance-intake', 'Property-management maintenance intake', 'one maintenance ticket', 'the property manager', 'assessing safety, authorizing work, or giving repair advice', 'tenant message, property reference, urgency flag, and manager decision'],
  ['recruiting-interview-coordination', 'Recruiting interview coordination', 'one interview packet', 'the hiring manager', 'ranking candidates or making an employment decision', 'candidate-provided facts, interview window, panel state, and open owner question'],
  ['saas-customer-onboarding-notes', 'SaaS customer onboarding notes', 'one onboarding checkpoint', 'the implementation owner', 'promising product capability or changing technical configuration', 'customer request, agreed task, system note, and escalation owner'],
  ['nonprofit-donor-record-cleanup', 'Nonprofit donor record cleanup', 'one donor record review', 'the development director', 'inferring donor intent or changing stewardship status', 'approved record fields, source event, conflict flag, and director review'],
  ['restaurant-catering-inquiry-log', 'Restaurant catering inquiry logging', 'one catering inquiry', 'the catering manager', 'confirming menu, capacity, or event terms without approval', 'event date, guest estimate, request source, and unresolved decision'],
  ['insurance-office-document-index', 'Insurance-office document indexing', 'one document receipt entry', 'the licensed representative', 'interpreting coverage or advising on a claim', 'document type, policy reference, receipt time, and representative handoff'],
  ['architect-project-file-prep', 'Architecture project-file preparation', 'one project file checklist', 'the project architect', 'approving design, code compliance, or construction direction', 'file name, revision marker, missing item, and architect decision point'],
  ['manufacturing-supplier-follow-up', 'Manufacturing supplier follow-up', 'one supplier status item', 'the purchasing lead', 'accepting a substitute or changing a production commitment', 'purchase reference, supplier reply, due-date question, and buyer action'],
  ['education-enrollment-question-log', 'Education enrollment question logging', 'one enrollment question', 'the registrar or program owner', 'interpreting eligibility or promising admission', 'student message, program reference, missing evidence, and registrar review'],
  ['travel-advisor-research-packet', 'Travel-advisor research packets', 'one itinerary research packet', 'the travel advisor', 'confirming availability, suitability, or a booking', 'traveler criteria, source links, assumptions, and advisor decision'],
  ['cybersecurity-vendor-questionnaire-index', 'Cybersecurity vendor questionnaire indexing', 'one questionnaire item', 'the security owner', 'attesting to controls or making a security claim', 'vendor question, approved evidence link, gap note, and security review'],
  ['membership-renewal-message-log', 'Membership renewal message logging', 'one renewal message case', 'the membership manager', 'changing status, reversing a charge, or promising an exception', 'member reference, message date, account field, and unresolved policy question'],
  ['construction-subcontractor-doc-chase', 'Construction subcontractor document chasing', 'one compliance-document request', 'the site or project manager', 'approving compliance or declaring a worker cleared', 'contractor name, requested document, receipt state, and manager review'],
  ['professional-services-meeting-brief', 'Professional-services meeting briefs', 'one meeting preparation brief', 'the engagement lead', 'making a client commitment or presenting analysis as final', 'agenda source, prior action, decision needed, and lead-owned follow-up'],
] as const;

const sourceLinks = [
  { name: 'CISA, Turn on Multifactor Authentication', url: 'https://www.cisa.gov/secure-our-world/turn-mfa', note: 'Account sign-in guidance for shared work.' },
  { name: 'CISA, Use Strong Passwords', url: 'https://www.cisa.gov/secure-our-world/use-strong-passwords', note: 'Password and account hygiene guidance.' },
  { name: 'FTC Business Guidance', url: 'https://www.ftc.gov/business-guidance', note: 'General business and information-handling guidance.' },
] as const;

export const aug19BlogPosts = topics.map(([slug, topic, unit, owner, stop, output], index) => {
  const title = `${topic}: design ${unit} support with an accountable review path`;
  const angle = `The useful first lane is ${unit}. It has a clear trigger, an inspectable output, and a named decision owner. For ${topic.toLowerCase()}, the output is ${output}.`;
  const paragraphs = [
    `${angle} On August 19, 2026, a Philippines-based remote assistant should receive only the source material and tools needed for that lane. A broad instruction to “handle the workflow” hides the difference between preparation and judgment. Write the first unit so a reviewer can compare the request with the finished record without needing a private explanation.`,
    `Start with the source event. Record where the request arrived, when it arrived, which fields are confirmed, and which fields are absent. ${topic} work becomes safer when an unknown stays visible instead of being filled from an old message or an assumption. The assistant can normalize labels and arrange evidence when the rule is written; the assistant should not invent a value to make a queue look complete.`,
    `Define the finished item as ${output}. A useful record is not a copied message and not a decision. It carries the source link, a short neutral summary, an explicit missing-information field, and the next action owned by ${owner}. This design gives the manager a small, countable work unit and gives the assistant a fair target for accuracy, completeness, and escalation.`,
    `The primary stop rule is ${stop}. When that condition appears, preserve the original source, mark the uncertainty, and route the item to ${owner}. The handoff should state what arrived, what was checked, what remains unresolved, and what question the owner must answer. It should never turn administrative preparation into authority that belongs to a qualified professional or accountable operator.`,
    `Use visible queue states that fit this workflow: new, ready for review, returned for clarification, waiting on ${owner}, and closed with the source attached. A status should describe where the work is, not imply that the underlying business question has been solved. For ${topic.toLowerCase()}, an example for each state is more useful than a generic instruction such as “follow up as needed.”`,
    `Access should follow the unit rather than the person. Give the assistant the approved inbox, folder, queue, or calendar view required to prepare ${unit}; keep final approvals, recovery access, sensitive records, professional interpretation, and external commitments with the accountable owner. Use individual accounts, limited permissions, and a revocation path. Redact training examples and retain only the information needed for the next review.`,
    `Run a small first batch and review the source beside every result. Count completed records, returned records, missing-field flags, items waiting on ${owner}, and questions caused by an unclear instruction. If the same question appears twice, repair the field definition or example before adding volume. A high count without traceable sources and a clear exception path is not evidence that the lane is working.`,
    `Keep online preparation separate from physical work, regulated judgment, and promises. A remote assistant can organize approved digital information, draft neutral notes, and surface gaps when the work is repeatable and reviewable. The local or qualified team may still need to inspect a site, interpret a professional matter, approve an action, or communicate the final decision. That boundary belongs in the role brief.`,
    `At the weekly review, choose one ordinary record, one returned record, and one exception. Ask whether the source is traceable, each fact is labeled correctly, the output is recognizable, and the next decision has an owner. For ${topic.toLowerCase()}, the durable test is whether a new reviewer can understand the packet and continue the work without relying on unwritten context.`,
  ];
  const sourceBody = paragraphs.join(' ');
  return {
    slug: `${slug}-assistant-guide-2026`, mainKeyword: `${topic.toLowerCase()} assistant`, title,
    excerpt: `Plan ${topic.toLowerCase()} around ${unit}, limited access, and a review path that keeps the final decision with the accountable owner.`,
    published: '2026-08-19', richPublished: true, minutes: 9, sourceBody,
    image: '/images/calendar-assistant.jpg', imageAlt: `${topic} planning at a remote work desk`,
    takeaways: [`Start with ${unit}.`, `Make ${output} visible in the finished record.`, `Escalate when ${stop}.`, `Review a small batch before adding adjacent work.`],
    detail: {
      revision: `2026-08-19-${slug}-r1`,
      directAnswer: [paragraphs[0], paragraphs[2]],
      bodyLinks: [{ href: '/blog/virtual-assistant-security-checklist', label: 'review the remote assistant security checklist' }, { href: '/blog/local-vs-remote-administrative-assistant-benchmark-2026', label: 'compare local and remote task fit' }],
      sections: [
        { heading: 'Define the work unit', paragraphs: [paragraphs[1], paragraphs[2]] },
        { heading: 'Write the exception path', paragraphs: [paragraphs[3], paragraphs[4]] },
        { heading: 'Match access to the task', paragraphs: [paragraphs[5], paragraphs[6]] },
        { heading: 'Keep judgment with the owner', paragraphs: [paragraphs[7], paragraphs[8]] },
        { heading: 'Review the first month', paragraphs: [paragraphs[6], paragraphs[8]] },
        { heading: 'Make the handoff durable', paragraphs: [paragraphs[0], paragraphs[4]] },
        { heading: 'Decide what changes next', paragraphs: [paragraphs[5], paragraphs[7]] },
      ],
      decisionRows: [{ need: 'Online preparation', fit: 'Philippines-based remote assistant', reason: 'The record can be sourced, defined, and reviewed.' }, { need: 'Physical or professional judgment', fit: owner, reason: 'The decision requires authority, presence, or qualification.' }, { need: 'Unclear exception', fit: 'Pause and escalate', reason: 'The assistant preserves facts and waits for the owner.' }, { need: 'Mixed workflow', fit: 'Split the lanes', reason: 'Preparation and approval get separate owners.' }],
      planningNumbers: [{ value: '1 unit', label: 'First scope', note: unit }, { value: '1 owner', label: 'Decision path', note: owner }, { value: '1 stop rule', label: 'Boundary', note: stop }, { value: '30 days', label: 'Review point', note: 'Change one instruction after observing the work.' }],
      scripts: [{ title: 'Role brief', text: `Prepare ${unit} from the approved source. Record ${output}. Stop and route anything outside the example or when ${stop}.` }, { title: 'Review question', text: `Which ${topic.toLowerCase()} records were complete, returned, waiting on ${owner}, or blocked by a missing rule?` }],
      scenario: { title: `Sample workflow: ${topic.toLowerCase()}`, intro: `Use this narrow sequence to make ${unit} easy to inspect without giving the assistant decision authority.`, steps: [{ step: '1', title: 'Receive the source', body: 'Preserve the original message, file, or approved queue entry.' }, { step: '2', title: 'Prepare the record', body: `Capture ${output} and label every unknown field.` }, { step: '3', title: 'Check the boundary', body: `Pause if ${stop}.` }, { step: '4', title: 'Send the handoff', body: `Route the unresolved question to ${owner}.` }, { step: '5', title: 'Review and refine', body: 'Record the correction and change one rule before expanding scope.' }] },
      faqs: [{ question: `What can a remote assistant do in ${topic.toLowerCase()}?`, answer: `The assistant can organize approved online information into ${unit} when the source, output, access, and reviewer are clear.` }, { question: 'What must stay with the owner?', answer: `Keep final approval, professional interpretation, sensitive exceptions, and external commitments with ${owner}.` }, { question: 'How should the first batch be reviewed?', answer: 'Compare each early record with its source, note returned work, and repair unclear instructions before adding volume.' }, { question: 'Where are assistants recruited?', answer: 'This service recruits and hires assistants in the Philippines for remote work.' }, { question: 'What happens when information is missing?', answer: 'Mark the gap, preserve the source, and route the question to the named owner rather than guessing.' }],
      relatedLinks: [{ href: '/blog/virtual-assistant-security-checklist', label: 'Use the security checklist' }, { href: '/blog/local-vs-remote-administrative-assistant-benchmark-2026', label: 'Compare local and remote task fit' }, { href: '/blog', label: 'Browse all hiring guides' }, { href: '/contact-us', label: 'Prepare a role brief' }],
      sources: sourceLinks,
    },
  };
});
