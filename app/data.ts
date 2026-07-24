export const site = {
  domain: 'HireAssistantNearMe.com',
  slug: 'hireassistantnearme',
  brand: 'Hire Assistant Near Me',
  url: 'https://hireassistantnearme.com',
  primary: 'hire assistant near me',
  audience: 'local business owners who want a Philippines-based remote assistant without running the hiring process alone',
  angle: 'near-me hiring intent matched with Filipino remote talent and local-work boundaries',
  color: '#7c3aed',
  accent: '#0f766e',
} as const;

export const roles = [
  'Executive assistant',
  'Customer support assistant',
  'Lead follow-up assistant',
  'Operations assistant',
  'Bookkeeping support assistant',
  'CRM assistant',
] as const;

export const industries = [
  'real estate',
  'healthcare offices',
  'legal teams',
  'ecommerce stores',
  'coaches and agencies',
  'home services',
] as const;

export const localMarkets = [
  { city: 'Austin', focus: 'Real estate offices, agencies, and busy solo owners', tasks: 'calendar cleanup, lead follow-up, listing admin' },
  { city: 'Phoenix', focus: 'Home services, healthcare offices, and local support teams', tasks: 'call notes, appointment reminders, inbox triage' },
  { city: 'Tampa', focus: 'Ecommerce, service businesses, and growing sales teams', tasks: 'CRM updates, order questions, quote follow-up' },
  { city: 'Charlotte', focus: 'Finance, legal admin, and client service teams', tasks: 'document prep, meeting notes, customer replies' },
] as const;

export const localImageCards = [
  {
    title: 'Front desk feel without a front desk hire',
    body: 'Use local hours, call rules, and a shared inbox so customers get quick answers while the owner keeps final say.',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=80',
    alt: 'Friendly reception desk in a small local office',
    tag: 'Local office tasks',
  },
  {
    title: 'Remote support that still feels close',
    body: 'Match the assistant to your time zone, tools, and daily review habit before you hand over more work.',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=80',
    alt: 'Small team planning assistant work on laptops in a bright office',
    tag: 'Remote assistant fit',
  },
  {
    title: 'City-by-city task planning',
    body: 'A real estate office, clinic, and home service company should not send the same assistant brief.',
    image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=900&q=80',
    alt: 'Map pins and city route planning for local assistant coverage',
    tag: 'Near-me map',
  },
] as const;

export const proofCards = [
  { label: 'BLS wage benchmark', value: 'OEWS data', note: 'The Bureau of Labor Statistics publishes local wage data for secretaries and administrative assistants, which helps owners compare local hiring against remote support.' },
  { label: 'Pilot approach', value: 'Start small', note: 'Test a short list of inbox, calendar, CRM, or support tasks before handing over more work.' },
  { label: 'Early review', value: 'Check daily', note: 'Review the first few batches closely so unclear instructions show up before the task list grows.' },
] as const;

export const stats = [
  { label: 'Role clarity', value: 'Scope first', note: 'the right plan depends on tasks, schedule, skill, tools, and management needs' },
  { label: 'Early training', value: 'Review often', note: 'give the assistant examples, limited access, and a place to ask questions' },
  { label: 'First handoff', value: 'Keep it narrow', note: 'a few recurring tasks are easier to teach and check than an all-purpose role' },
];

export const publicSources = [
  { name: 'U.S. Bureau of Labor Statistics', url: 'https://www.bls.gov/oes/current/oes436014.htm', note: 'Use for local administrative assistant wage benchmarks.' },
  { name: 'IRS independent contractor guidance', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/independent-contractor-defined', note: 'Use when comparing employee and contractor choices.' },
  { name: 'FTC business guidance', url: 'https://www.ftc.gov/business-guidance', note: 'Use for honest marketing, claims, and consumer-data reminders.' },
];

export const faqs = [
  {
    question: 'Can I really hire an assistant near me if the work is remote?',
    answer: 'Yes, if the work can be done online. We recruit and hire assistants only in the Philippines, then plan the role around your business hours, tools, and review needs. We do not offer local or in-person candidates.',
  },
  {
    question: 'What should I delegate first?',
    answer: 'Start with repeatable work: inbox sorting, scheduling, lead follow-up, CRM cleanup, order updates, simple reports, and call notes. Keep money decisions, legal advice, medical judgment, and final client decisions with the owner or licensed team.',
  },
  {
    question: 'How many hours should I start with?',
    answer: 'Many small teams start with a focused pilot scope. That is enough to test fit, build habits, and catch mistakes without handing over too much at once.',
  },
  {
    question: 'Is a local assistant better than an overseas virtual assistant?',
    answer: 'A local employee or vendor is the better fit for in-person work, errands, paper files, or front desk duties. This service offers Filipino remote assistants for recurring online admin, support, follow-up, and back-office work with clear instructions.',
  },
];

export const compareRows = [
  { option: 'Local employee or vendor', bestFor: 'In-person work, office errands, paper files, and front desk coverage', watch: 'Not offered by Hire Assistant Near Me' },
  { option: 'Filipino remote assistant', bestFor: 'Recurring admin, support, CRM, scheduling, research, and follow-up', watch: 'Needs clear access rules, written examples, and agreed working hours' },
  { option: 'Managed Philippines staffing', bestFor: 'Owners who want help shaping the role, screening candidates, and starting the handoff', watch: 'The owner still approves sensitive work and reviews quality' },
];

export const blogPosts = [
  {
    slug: 'virtual-assistant-planning',
    title: 'How should I budget for assistant help near me?',
    excerpt: 'A plain guide to the hours, duties, location, and management choices that affect an assistant budget.',
    minutes: 7,
    takeaways: ['Local help follows local wages and may fit in-person work.', 'This service recruits Filipino remote assistants for clear online tasks.', 'Start with a small weekly hour limit before adding more.'],
    sections: [
      { heading: 'Start with the work, not a price', body: 'Local assistants are usually paid against the local labor market. A Philippines-based service may use a different billing structure. Either way, a low rate can become expensive when the role is vague or the work needs constant correction. Treat the first month as a test.' },
      { heading: 'What affects the budget', body: 'The duties matter more than the job title. Inbox cleanup, appointment setting, and basic CRM updates are usually easier to teach. Bookkeeping support, sales follow-up, executive support, and customer care call for more judgment and closer review.' },
      { heading: 'Set a first-month limit', body: 'Choose a weekly hour limit and a short task list. Write down the tools used and what finished work should look like. Add hours only after the assistant can handle the first tasks without creating more work for the owner.' },
      { heading: 'What to ask before you pay', body: 'Ask who screens the assistant, how replacement works, what time zone they cover, and who checks quality. If a provider cannot explain the first week clearly, slow down.' },
    ],
    script: 'We need help with a focused pilot scope first. The main tasks are inbox sorting, calendar cleanup, CRM updates, and lead follow-up. Can you show how you screen for this and what the first week looks like?',
  },
  {
    slug: 'tasks-to-delegate-first',
    title: 'What assistant tasks should you delegate first?',
    excerpt: 'Start with repeatable admin, follow-up, inbox, CRM, and scheduling work.',
    minutes: 6,
    takeaways: ['Pick work that repeats every week.', 'Keep sensitive decisions with the owner.', 'Use examples before you expect speed.'],
    sections: [
      { heading: 'Start with work that repeats', body: 'The best first tasks happen every day or every week. Examples include calendar cleanup, inbox labels, appointment reminders, lead list updates, simple reports, and customer reply drafts.' },
      { heading: 'Do not delegate judgment too early', body: 'Keep pay-rate changes, refunds, legal advice, medical judgment, hiring decisions, and large purchases with the owner. The assistant can gather the information, but the owner should make the decision.' },
      { heading: 'Give examples', body: 'Show three good examples and one bad example. A short screen recording can save hours of training. The assistant should know what finished work looks like.' },
      { heading: 'Review the first five days', body: 'Check work daily for the first week. Fix the checklist before you blame the person. If the same mistake happens twice, the instruction is probably unclear.' },
    ],
    script: 'For the first week, please only draft replies and update the CRM. Do not send messages or change staffing choices without approval. Mark anything unclear with a question.',
  },
  {
    slug: 'virtual-assistant-vs-employee',
    title: 'Virtual assistant vs employee: which is better for a local business?',
    excerpt: 'When to hire in-house and when a managed assistant may be easier to start with.',
    minutes: 8,
    takeaways: ['Use an employee for in-person duties and deep company ownership.', 'Use a VA for clear recurring tasks.', 'Check worker classification rules before treating a contractor like staff.'],
    sections: [
      { heading: 'When an employee fits better', body: 'Choose an employee when the work must happen in your office, needs constant judgment, or touches core business decisions all day. Employees can be trained deeply, but they also need payroll, management, and a longer hiring process.' },
      { heading: 'When a VA fits better', body: 'Choose a virtual assistant when the work is repeatable, remote, and easy to check. Good examples are inbox cleanup, CRM updates, appointment setting, customer support drafts, data entry, and simple research.' },
      { heading: 'The control question', body: 'If you need to control the exact hours, tools, process, and daily method, talk with a professional about worker classification. The IRS has guidance on contractor versus employee status.' },
      { heading: 'A practical first step', body: 'If you are unsure, start with a narrow remote support role. Keep the role simple for 30 days. Then decide if you need local in-house help.' },
    ],
    script: 'We are testing a remote assistant role first. We will keep the scope narrow, review work weekly, and avoid treating contractor support like an in-house employee unless we set that up correctly.',
  },
  {
    slug: 'assistant-onboarding-checklist',
    title: 'Assistant onboarding checklist for the first week',
    excerpt: 'A simple first-week checklist for logins, SOPs, calls, QA, and scorecards.',
    minutes: 9,
    takeaways: ['Prepare tool access before day one.', 'Use a small task list for the first week.', 'Review work daily until quality is steady.'],
    sections: [
      { heading: 'Before day one', body: 'Make a tool list, create limited-access accounts, record one or two task videos, and write the first five tasks. Do not share the owner password. Use role-based access where possible.' },
      { heading: 'Day one', body: 'Walk through the business, the customers, and the task list. Show what good work looks like. Ask the assistant to repeat the rules back in their own words.' },
      { heading: 'Days two to four', body: 'Let the assistant complete small batches. Review the work the same day. Keep notes in one shared place so the checklist improves.' },
      { heading: 'Day five review', body: 'Check the work for accuracy and sound judgment. Note missed steps, slow replies, and questions that keep coming back. Fix the instructions or the role fit before adding more work.' },
    ],
    script: 'This week is a training week. Please ask when unsure, write down blockers, and wait for approval on anything involving money, refunds, legal, medical, or customer promises.',
  },
  {
    slug: 'virtual-assistant-for-small-business',
    mainKeyword: 'virtual assistant for small business',
    title: 'Virtual assistant for small business: a practical hiring plan',
    excerpt: 'A virtual assistant for small business can take on repeat admin work while the owner keeps final decisions. This guide shows how to plan and launch a Philippines-only managed role.',
    minutes: 12,
    takeaways: [
      'Choose one clear role instead of handing over every loose task.',
      'Hire from the Philippines through a managed staffing plan with named review rules.',
      'Start with limited access, sample work, and a short first-week task list.',
      'Keep money, legal, medical, hiring, and final customer decisions with the owner.',
    ],
    detail: {
      directAnswer: [
        'A virtual assistant for small business is a remote team member who handles clear, repeatable work through online tools. For this service, every candidate is recruited and hired in the Philippines, with a managed plan for matching, launch, and review.',
        'Start by listing the work that repeats each day or week, then group it into one role. Give the assistant examples, limited tool access, and a named person who checks the first batches before more work is added.',
      ],
      sections: [
        {
          heading: 'Pick one job for the assistant',
          paragraphs: [
            'A small business often has many loose tasks but does not need an all-purpose helper. Pick one job such as lead follow-up, calendar care, customer reply drafts, CRM cleanup, or bookkeeping prep.',
            'Write down what starts each task, what the assistant must produce, and who approves the final step. This makes the role easier to screen in the Philippines and easier to manage after launch.',
          ],
        },
        {
          heading: 'Turn the job into a clear role brief',
          paragraphs: [
            'A role brief should name the main duty, the tools used, the hours needed, and the decisions the assistant cannot make. Add two good work samples so the candidate can see the level of detail you expect.',
            'Keep the first brief short enough to use on a real screening call. If the role needs five unrelated skill sets, split the work or choose the one task lane that causes the most daily drag.',
          ],
        },
        {
          heading: 'Choose managed staffing when you need help hiring',
          paragraphs: [
            'Direct hiring puts screening, interviews, checks, onboarding, attendance, and replacement planning on the owner. Managed staffing gives the owner a team that helps shape the role and match a Philippines-based candidate to it.',
            'The owner still sets the rules and checks business judgment. The staffing team handles the hiring path and gives the owner a clear place to raise fit, attendance, or replacement questions.',
          ],
        },
        {
          heading: 'Set safe access before day one',
          paragraphs: [
            'Create a separate user account for each tool and give only the access needed for the first tasks. The NIST security control catalog describes least privilege as limiting access to what a person needs for assigned work.',
            'Turn on multi-factor authentication where the tool supports it, and keep recovery methods with the owner. CISA explains that MFA adds another check beyond a password, which is useful when work happens across remote accounts.',
          ],
        },
        {
          heading: 'Know where owner approval is required',
          paragraphs: [
            'An assistant can collect details, draft a reply, update a record, and flag a decision. The owner or qualified team member should approve refunds, payments, contracts, medical choices, legal advice, hiring decisions, and promises made to customers.',
            'Write these limits in the role brief and repeat them during training. A clear stop rule protects the business and helps the assistant ask before a small error becomes a bigger one.',
          ],
        },
        {
          heading: 'Plan communication across the Philippines and your workday',
          paragraphs: [
            'Decide which hours need live coverage and which tasks can be finished before your next review. A Philippines-based assistant may work a schedule set around your customers, but that schedule should be agreed before matching begins.',
            'Use one place for questions, one place for task status, and one daily check-in during the first week. This keeps instructions from getting lost across email, chat, and calls.',
          ],
        },
        {
          heading: 'Check worker setup before you direct the work',
          paragraphs: [
            'The way a business controls work can affect worker classification and other duties. The IRS explains that labels alone do not decide whether someone is an employee or an independent contractor.',
            'Ask a qualified adviser about the setup that fits your business and location. A managed staffing provider can explain its own service model, but it should not replace legal or tax advice.',
          ],
        },
        {
          heading: 'Protect personal data in the handoff',
          paragraphs: [
            'List the customer and staff data the role may see before you open any account. The Philippine Data Privacy Act covers the processing of personal information and gives a useful legal frame for a Philippines-based staffing plan.',
            'Use masked sample records during training when possible, then open real access only after the assistant shows the task correctly. Keep a simple record of who can use each system and remove access when the role changes.',
          ],
        },
      ],
      decisionRows: [
        { need: 'Work must happen inside your office', fit: 'Use a local employee or vendor', reason: 'This Philippines-only service is for remote work, so it should not be sold as an in-person fix.' },
        { need: 'One repeat admin lane with online tools', fit: 'Philippines-based assistant', reason: 'A clear remote task can be screened, taught, and checked through the same systems your team already uses.' },
        { need: 'Help with screening and role setup', fit: 'Managed Philippines staffing', reason: 'The staffing team helps plan the role, match the candidate, and handle hiring support.' },
        { need: 'Final business judgment all day', fit: 'Keep it with the owner or manager', reason: 'The assistant can prepare information, but the accountable leader should make the decision.' },
      ],
      planningNumbers: [
        { value: '1 role', label: 'Planning example', note: 'Start with one task lane instead of a mixed list of unrelated work.' },
        { value: '3 samples', label: 'Training example', note: 'Show three finished examples so the first standard is easy to see.' },
        { value: '5 days', label: 'Launch example', note: 'Use the first workweek for small batches, questions, and daily checks.' },
        { value: '2 weeks', label: 'Review example', note: 'Keep close review in place before adding wider tool access or new duties.' },
        { value: '30 days', label: 'Fit example', note: 'Hold a role review and decide what should stay, change, or stop.' },
      ],
      scripts: [
        {
          title: 'Provider call script',
          text: 'We need a Philippines-based virtual assistant for one clear role. The first tasks are CRM updates, lead follow-up drafts, and calendar checks. How will you screen for these tasks, who supports the launch, and what happens if the match is not right?',
        },
        {
          title: 'First-day approval script',
          text: 'Please complete the draft and mark it ready for review. Do not send it, approve a refund, change a customer promise, or open new access without written approval. If a detail is missing, stop and ask in the shared task thread.',
        },
      ],
      scenario: {
        title: 'Sample workflow: lead follow-up support',
        intro: 'This is a planning example for a small service business with leads sitting in a CRM. It shows a narrow remote role without promising a business result.',
        steps: [
          { step: '1', title: 'Owner sets the rule', body: 'The owner defines which lead stages need a draft and which messages require personal review.' },
          { step: '2', title: 'Assistant checks the queue', body: 'The assistant reviews new records at the agreed times and flags missing phone, email, or service details.' },
          { step: '3', title: 'Assistant prepares the work', body: 'The assistant updates the CRM and drafts a reply from an approved template without sending it.' },
          { step: '4', title: 'Owner reviews the batch', body: 'The owner checks the first batches, approves edits, and notes any rule that needs clearer wording.' },
          { step: '5', title: 'Team reviews the role', body: 'After 30 days, the owner and staffing contact decide which duties are steady and which still need close review.' },
        ],
      },
      faqs: [
        { question: 'Where does this service recruit virtual assistants?', answer: 'Every assistant offered through this service is recruited and hired in the Philippines. The service does not offer candidates from other staffing regions.' },
        { question: 'What should a small business delegate first?', answer: 'Start with work that repeats and is easy to check, such as CRM updates, calendar care, inbox sorting, reply drafts, data cleanup, or report prep. Keep final decisions and sensitive approvals with the owner.' },
        { question: 'Can the assistant work during my business hours?', answer: 'The schedule can be part of the role brief and matching process. State the time zone, live coverage window, response needs, and any tasks that can be completed before your next review.' },
        { question: 'Should the assistant get every login on day one?', answer: 'No. Start with separate accounts and only the access needed for the first tasks, then add access after the work is steady and the owner approves it.' },
        { question: 'What does managed staffing add?', answer: 'Managed staffing can help shape the role, screen Philippines-based candidates, support onboarding, and give the owner a path for fit or replacement questions. The owner still defines the work and reviews business judgment.' },
      ],
      relatedLinks: [
        { href: '/blog/tasks-to-delegate-first', label: 'Choose the first tasks to delegate' },
        { href: '/blog/assistant-onboarding-checklist', label: 'Use the first-week onboarding checklist' },
        { href: '/blog/virtual-assistant-vs-employee', label: 'Compare a virtual assistant with an employee' },
        { href: '/contact', label: 'Build a Philippines-only role brief' },
      ],
      sources: [
        { name: 'NIST SP 800-53 Rev. 5, Security and Privacy Controls', url: 'https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final', note: 'See the access-control guidance, including least privilege.' },
        { name: 'CISA multi-factor authentication guidance', url: 'https://www.cisa.gov/resources-tools/resources/multi-factor-authentication-mfa', note: 'Use this when planning account sign-in protection.' },
        { name: 'IRS: Independent contractor defined', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/independent-contractor-defined', note: 'Review the official explanation of worker control and classification.' },
        { name: 'Philippine Data Privacy Act of 2012', url: 'https://lawphil.net/statutes/repacts/ra2012/ra_10173_2012.html', note: 'Read the law covering the processing of personal information in the Philippines.' },
      ],
    },
    sections: [
      { heading: 'Start with a narrow role', body: 'Choose work that repeats and is easy to check. Keep the owner in charge of final decisions.' },
    ],
    script: 'We need a Philippines-based assistant for one clear role. Please show us how you screen for the tasks and support the first month.',
  },
  {
    slug: 'hire-filipino-virtual-assistant',
    mainKeyword: 'hire filipino virtual assistant',
    title: 'Hire Filipino virtual assistant help with a six-step role plan',
    excerpt: 'Hire Filipino virtual assistant help by defining one role, testing real work, and setting clear approval rules. This guide shows how to use a managed Philippines-only hiring process without handing over owner decisions.',
    published: '2026-07-24',
    richPublished: true,
    minutes: 13,
    takeaways: [
      'Start with one role and a short list of repeat tasks.',
      'Use real work samples to screen for care, judgment, and clear questions.',
      'Set tool access and approval limits before the first workday.',
      'Choose managed staffing if you want help with screening, hiring, launch, and fit questions.',
    ],
    detail: {
      revision: '2026-07-24-hire-filipino-virtual-assistant',
      directAnswer: [
        'To hire a Filipino virtual assistant, first turn your loose task list into one job with clear hours, tools, outputs, and stop rules. Then screen Philippines-based candidates with a short sample task that looks like the real work.',
        'A managed staffing service can help write the role, screen candidates, plan the first week, and handle fit or replacement questions. You still choose the work, approve access, and keep final business decisions with your team.',
      ],
      sections: [
        {
          heading: 'Write one role before you look at candidates',
          paragraphs: [
            'A long list of unrelated chores makes it hard to tell who fits. Group the work into one lane, such as executive inbox care, customer reply drafts, CRM upkeep, or calendar support.',
            'Write the task trigger, the finished result, the tool used, and the person who approves it. Add the work hours and time zone so candidates know when live overlap is needed.',
          ],
        },
        {
          heading: 'Build a short role brief',
          paragraphs: [
            'Keep the first brief to one page if you can. Name the top three duties, the tools, the work schedule, and the choices the assistant must never make alone.',
            'Add two good examples and one bad example from past work, with private details removed. The contrast helps a candidate see what you mean by complete, careful, and ready for review.',
          ],
        },
        {
          heading: 'Screen for the work you will hand over',
          paragraphs: [
            'A polished resume does not show how someone will handle your inbox or CRM. Ask the candidate to explain a similar task, the checks they used, and what they did when a detail was missing.',
            'Use the same five questions for each interview so the answers are easier to compare. Score clear writing, attention to instructions, useful questions, and willingness to stop when approval is needed.',
          ],
        },
        {
          heading: 'Use a small paid work sample',
          paragraphs: [
            'Make the sample close to the real role, but use made-up or masked customer details. A planning example could include 10 inbox messages, 5 CRM records, or one meeting brief that takes about 30 to 60 minutes.',
            'Tell each candidate what you will check before the sample starts. Look for correct steps, clear notes, careful handling of missing details, and a clean handoff to the manager.',
          ],
        },
        {
          heading: 'Set access rules before day one',
          paragraphs: [
            'Give each person a named account and only the access needed for the first duties. NIST describes least privilege as limiting access to the functions and information needed for assigned tasks.',
            'Turn on multi-factor authentication where the tool allows it, and keep recovery control with the owner. CISA says MFA adds another identity check beyond a password, which makes a stolen password less useful by itself.',
          ],
        },
        {
          heading: 'Check the working arrangement',
          paragraphs: [
            'The IRS says the facts of the working relationship matter when a business decides whether someone is an employee or an independent contractor. A label in an agreement does not settle the question by itself.',
            'Ask a qualified tax or legal adviser about the setup that applies to your business. A staffing provider can explain its service model, but it should not make that decision for your company.',
          ],
        },
        {
          heading: 'Protect personal information',
          paragraphs: [
            'List the customer, employee, and business data the role may see before you open real accounts. The Philippine Data Privacy Act covers the processing of personal information and sets duties around lawful handling and protection.',
            'Use masked records for early practice when possible, then open only the data needed for approved work. Keep a simple access list and remove permissions when a duty or role ends.',
          ],
        },
        {
          heading: 'Manage the first 30 days',
          paragraphs: [
            'Use small batches during the first five workdays and review them on the same day. Keep questions, corrections, and changed rules in one shared place so the assistant does not have to search several chats.',
            'Hold a fit review after two weeks and a role review at 30 days. Decide which tasks are steady, which instructions need repair, and which duties should stay with the owner.',
          ],
        },
      ],
      decisionRows: [
        { need: 'You want to search and screen alone', fit: 'Direct hiring', reason: 'The owner writes the post, reviews applications, runs checks, plans onboarding, and handles future fit questions.' },
        { need: 'You want a short project or trial task', fit: 'Freelance marketplace', reason: 'The owner chooses the person and manages the agreement, access, quality checks, and next assignment.' },
        { need: 'You want help shaping and filling one role', fit: 'Managed Philippines staffing', reason: 'The staffing team helps plan the role, screen Filipino candidates, support launch, and handle match questions.' },
        { need: 'The work must happen in your office', fit: 'Local employee or vendor', reason: 'This Philippines-only service supplies remote talent and should not be used for errands, front desk coverage, or physical files.' },
      ],
      planningNumbers: [
        { value: '1 role', label: 'Scope example', note: 'Begin with one task lane instead of a mixed helper job.' },
        { value: '3 duties', label: 'Brief example', note: 'Name the three duties that matter most in the first month.' },
        { value: '5 days', label: 'Launch example', note: 'Use small batches and same-day checks during week one.' },
        { value: '2 weeks', label: 'Fit example', note: 'Review questions, accuracy, attendance, and role fit.' },
        { value: '30 days', label: 'Role example', note: 'Choose what should stay, change, grow, or stop.' },
      ],
      scripts: [
        {
          title: 'Provider call script',
          text: 'We want to hire a Filipino virtual assistant for one clear role. The first duties are inbox sorting, calendar updates, and follow-up drafts. How do you screen for this work, who helps with launch, and what happens if the match is not right?',
        },
        {
          title: 'Candidate interview script',
          text: 'Please walk me through a similar task you handled. Tell me what you checked, what you did when information was missing, and which step needed manager approval. Then show me how you would report the finished work and any open questions.',
        },
      ],
      scenario: {
        title: 'Sample workflow: screen an inbox assistant',
        intro: 'This is a planning example for an owner who needs help sorting email and preparing drafts. It does not promise a hiring or business result.',
        steps: [
          { step: '1', title: 'Owner writes the rules', body: 'The owner names the labels, urgent message types, draft limits, and messages that must stay private.' },
          { step: '2', title: 'Staffing team screens', body: 'The staffing team checks Filipino candidates against the role brief, schedule, tools, and writing needs.' },
          { step: '3', title: 'Candidate completes a sample', body: 'The candidate sorts 10 masked messages, drafts two replies, and flags anything that needs owner judgment.' },
          { step: '4', title: 'Owner reviews the sample', body: 'The owner checks the same scorecard for each candidate and asks about any missed detail or unclear choice.' },
          { step: '5', title: 'Team starts with limited access', body: 'The chosen assistant uses a named account, works in small batches, and waits for approval before any live send.' },
        ],
      },
      faqs: [
        { question: 'Where are the assistants recruited and hired?', answer: 'Every candidate offered through this service is recruited and hired in the Philippines. Hire Assistant Near Me does not supply talent from another country.' },
        { question: 'What should I put in the role brief?', answer: 'List the top duties, tools, hours, finished outputs, and approval limits. Add two good examples so the candidate can see the standard before the first workday.' },
        { question: 'Should I use a work sample?', answer: 'A small paid sample can show how a candidate follows instructions and handles missing details. Use masked information, explain the scorecard first, and keep the task close to the real job.' },
        { question: 'Can a Filipino assistant work during my business hours?', answer: 'Live overlap can be part of the role brief and matching process. State the time zone, coverage window, response needs, and work that can wait for the next review.' },
        { question: 'What should the owner keep?', answer: 'Keep final control of money, contracts, legal or medical judgment, hiring choices, and customer promises. The assistant can prepare information and drafts, but the accountable person should approve sensitive actions.' },
        { question: 'What does managed staffing handle?', answer: 'Managed staffing can help shape the role, screen Filipino candidates, support onboarding, and provide a path for fit or replacement questions. The owner still sets the work, access, and approval rules.' },
      ],
      relatedLinks: [
        { href: '/services/executive-assistance', label: 'Plan an executive assistance role' },
        { href: '/services/calendar-and-inbox-support', label: 'Review calendar and inbox support' },
        { href: '/blog/tasks-to-delegate-first', label: 'Choose the first tasks to delegate' },
        { href: '/blog/assistant-onboarding-checklist', label: 'Prepare the first-week checklist' },
        { href: '/contact', label: 'Build a Philippines-only role brief' },
      ],
      sources: [
        { name: 'NIST SP 800-53 Rev. 5, Security and Privacy Controls', url: 'https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final', note: 'See the access-control guidance for least privilege and named account planning.' },
        { name: 'CISA multi-factor authentication guidance', url: 'https://www.cisa.gov/resources-tools/resources/multi-factor-authentication-mfa', note: 'Use this when planning sign-in protection for remote work accounts.' },
        { name: 'IRS: Independent contractor defined', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/independent-contractor-defined', note: 'Review the official explanation of control and worker classification.' },
        { name: 'Philippine Data Privacy Act of 2012', url: 'https://lawphil.net/statutes/repacts/ra2012/ra_10173_2012.html', note: 'Read the law covering personal information processing in the Philippines.' },
      ],
    },
    sections: [
      { heading: 'Start with one role', body: 'Write the work, tools, hours, and approval limits before you look at candidates. Use a small sample that matches the real job.' },
    ],
    script: 'We want to hire a Filipino virtual assistant for one clear role. Please show us how you screen for the work and support the first month.',
  },
] as const;

export const routes = [
  '/',
  '/blog',
  '/compare/local-vs-remote-assistant',
  '/contact',
  '/privacy',
  '/terms',
  '/thank-you',
  ...blogPosts.map((post) => `/blog/${post.slug}`),
];

export const staffingOffer = {
  partner: 'our staffing team',
  promise: 'Get a managed assistant role plan built around the work you need removed from your plate.',
  fit: [
    'business owners who need reliable assistant support but do not want to screen alone',
    'teams that want trained support, backup coverage, and a clear manager path',
    'companies that need help with admin, operations, customer support, calls, bookkeeping, development, or marketing work',
  ],
  included: [
    'role planning call to turn your task list into a clear staffing scope',
    'candidate matching based on skills, schedule, tools, and communication needs',
    'onboarding guidance for SOPs, scorecards, reporting, and safe tool access',
    'managed support so quality, attendance, and replacement questions do not sit only on the owner',
  ],
  proof: [
    'clear task scope before hiring',
    'weekly reporting rhythm',
    'named accountability and escalation path',
    'simple handoff plan for tools, SOPs, and quality checks',
  ],
} as const;

export const leadQuestions = [
  'What work do you want off your plate first?',
  'Which tools, inboxes, phones, CRMs, or systems will the staff member use?',
  'What hours, time zone, and response time do you need?',
  'Who checks quality during the first two weeks?',
  'What should the staff member never decide without approval?',
] as const;

export const staffingProcess = [
  { step: '1', title: 'Map the role', body: 'We turn messy tasks into one clear role with outcomes, tools, limits, and a first-week checklist.' },
  { step: '2', title: 'Match the staff', body: 'A staffing team can look for remote staff who fit the work, schedule, tools, and level of judgment you need.' },
  { step: '3', title: 'Launch with control', body: 'Start with SOPs, sample work, limited access, daily review, and a simple scorecard so quality is easy to see.' },
  { step: '4', title: 'Add work carefully', body: 'Once the first tasks are steady, add one new duty at a time and keep checking the work.' },
] as const;

export const staffingFitNote = 'Every assistant plan depends on the role, schedule, skills, tools, location needs, and review process. Send the details so a staffing team can help sort the best fit.';
