export const site = {
  domain: 'HireAssistantNearMe.com',
  slug: 'hireassistantnearme',
  brand: 'Hire Assistant Near Me',
  url: 'https://hireassistantnearme.com',
  primary: 'hire assistant near me',
  audience: 'local business owners who want nearby-feeling assistant support without local hiring planning',
  angle: 'near-me assistant hiring explained with local, remote, and overseas options',
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
  { label: 'Best pilot size', value: '10-20 hrs/wk', note: 'Enough time to test inbox, calendar, CRM, and support tasks without handing over the whole business.' },
  { label: 'Safe first review window', value: '5 days', note: 'Review daily at first. Small fixes in week one prevent bigger customer problems later.' },
] as const;

export const stats = [
  { label: 'Role clarity', value: 'Scope first', note: 'the right plan depends on tasks, schedule, skill, tools, and management needs' },
  { label: 'Common ramp time', value: '7-21 days', note: 'with SOPs, tools, and call examples ready' },
  { label: 'Best first handoff', value: '5-10 tasks', note: 'small recurring work beats a vague all-in role' },
];

export const publicSources = [
  { name: 'U.S. Bureau of Labor Statistics', url: 'https://www.bls.gov/oes/current/oes436014.htm', note: 'Use for local administrative assistant wage benchmarks.' },
  { name: 'IRS independent contractor guidance', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/independent-contractor-defined', note: 'Use when comparing employee and contractor choices.' },
  { name: 'FTC business guidance', url: 'https://www.ftc.gov/business-guidance', note: 'Use for honest marketing, claims, and consumer-data reminders.' },
];

export const faqs = [
  {
    question: 'Can I really hire an assistant near me if the work is remote?',
    answer: 'Yes. Many owners search near me because they want easy communication, similar hours, and trust. The assistant may be local, U.S.-remote, or overseas. The safer choice depends on the tasks, access level, and how fast you need help.',
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
    answer: 'Local can be better for in-person work, errands, paper files, or sensitive office duties. Overseas or remote can be better for recurring admin, support, follow-up, and back-office work with clear instructions.',
  },
];

export const compareRows = [
  { option: 'Local assistant', bestFor: 'In-person work, office errands, paper files, trusted local presence', watch: 'Higher plan, local hiring time, payroll and management work' },
  { option: 'U.S.-remote assistant', bestFor: 'Same-country communication and remote admin support', watch: 'Usually needs more support than offshore support' },
  { option: 'Overseas virtual assistant', bestFor: 'Recurring admin, support, CRM, scheduling, research, and follow-up', watch: 'Needs clear SOPs, access rules, and time-zone planning' },
  { option: 'Managed assistant service', bestFor: 'Owners who want help with screening, backup, and role setup', watch: 'You still need to define the role and review quality' },
];

export const blogPosts = [
  {
    slug: 'virtual-assistant-planning',
    title: 'How should I budget for assistant help near me?',
    excerpt: 'A plain guide to the variables behind local, U.S.-remote, and overseas assistant support.',
    minutes: 7,
    takeaways: ['Local help often needs more support, but may fit in-person work.', 'Remote and overseas help can work well when the task list is clear.', 'Start with a small weekly hour block before scaling.'],
    sections: [
      { heading: 'The simple plan range', body: 'A local assistant often follows local wage pressure. A remote or overseas assistant can plan less, but the lowest rate is not always the best deal. You are buying reliable help, clear communication, and fewer mistakes. Plan the first month as a test, not a forever decision.' },
      { heading: 'What changes the plan', body: 'Plan changes with the role. Inbox cleanup, appointment setting, and simple CRM updates are easier to train. Bookkeeping support, sales follow-up, executive support, and customer care need better judgment and closer review.' },
      { heading: 'A safe first budget', body: 'Many owners can test the role with 10 to 20 hours a week. Write down the exact tasks, the tools used, and what good work looks like. If the assistant saves owner time and mistakes stay low, add more hours.' },
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
      { heading: 'Do not delegate judgment too early', body: 'Keep staffing details changes, refunds, legal advice, medical judgment, hiring decisions, and large spending decisions with the owner. The assistant can prepare information, but the owner should approve the decision.' },
      { heading: 'Give examples', body: 'Show three good examples and one bad example. A short screen recording can save hours of training. The assistant should know what finished work looks like.' },
      { heading: 'Review the first five days', body: 'Check work daily for the first week. Fix the checklist before you blame the person. If the same mistake happens twice, the instruction is probably unclear.' },
    ],
    script: 'For the first week, please only draft replies and update the CRM. Do not send messages or change staffing choices without approval. Mark anything unclear with a question.',
  },
  {
    slug: 'virtual-assistant-vs-employee',
    title: 'Virtual assistant vs employee: which is better for a local business?',
    excerpt: 'When to hire in-house and when a managed assistant is the safer first step.',
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
      { heading: 'Day five review', body: 'Score accuracy, speed, communication, and judgment. Keep the role if the trend is good. If not, fix the scope or change the fit before adding more work.' },
    ],
    script: 'This week is a training week. Please ask when unsure, write down blockers, and wait for approval on anything involving money, refunds, legal, medical, or customer promises.',
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
  { step: '2', title: 'Match the staff', body: 'our staffing team can help match remote staff to the work, schedule, communication style, and skill level you need.' },
  { step: '3', title: 'Launch with control', body: 'Start with SOPs, sample work, limited access, daily review, and a simple scorecard so quality is easy to see.' },
  { step: '4', title: 'Scale what works', body: 'Once the first tasks are stable, add more work, better reporting, and stronger delegation without guessing.' },
] as const;

export const staffingFitNote = 'Every assistant plan depends on the role, schedule, skills, tools, location needs, and review process. Send the details so a staffing team can help sort the best fit.';
