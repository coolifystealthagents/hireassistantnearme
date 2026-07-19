export const site = {
  domain: 'HireAssistantNearMe.com',
  slug: 'hireassistantnearme',
  brand: 'Hire Assistant Near Me',
  url: 'https://hireassistantnearme.com',
  primary: 'hire assistant near me',
  audience: 'local business owners who want nearby-feeling assistant support without local hiring costs',
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

export const stats = [
  { label: 'Typical overseas VA range', value: '$6-$18/hr', note: 'varies by role, country, and management level' },
  { label: 'Common ramp time', value: '7-21 days', note: 'with SOPs, tools, and call examples ready' },
  { label: 'Best first handoff', value: '5-10 tasks', note: 'small recurring work beats a vague all-in role' },
];

export const sourcePlaceholders = [
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
    answer: 'Many small teams start with 10 to 20 hours per week. That is enough to test fit, build habits, and catch mistakes without handing over too much at once.',
  },
  {
    question: 'Is a local assistant better than an overseas virtual assistant?',
    answer: 'Local can be better for in-person work, errands, paper files, or sensitive office duties. Overseas or remote can be better for recurring admin, support, follow-up, and back-office work with clear instructions.',
  },
];

export const compareRows = [
  { option: 'Local assistant', bestFor: 'In-person work, office errands, paper files, trusted local presence', watch: 'Higher cost, local hiring time, payroll and management work' },
  { option: 'U.S.-remote assistant', bestFor: 'Same-country communication and remote admin support', watch: 'Usually costs more than offshore support' },
  { option: 'Overseas virtual assistant', bestFor: 'Recurring admin, support, CRM, scheduling, research, and follow-up', watch: 'Needs clear SOPs, access rules, and time-zone planning' },
  { option: 'Managed assistant service', bestFor: 'Owners who want help with screening, backup, and role setup', watch: 'You still need to define the role and review quality' },
];

export const blogPosts = [
  {
    slug: 'virtual-assistant-costs',
    title: 'How much does a virtual assistant cost near me?',
    excerpt: 'A plain guide to hourly, monthly, local, U.S.-remote, and overseas assistant pricing.',
    minutes: 7,
    takeaways: ['Local help often costs more, but may fit in-person work.', 'Remote and overseas help can work well when the task list is clear.', 'Start with a small weekly hour block before scaling.'],
    sections: [
      { heading: 'The simple cost range', body: 'A local assistant often follows local wage pressure. A remote or overseas assistant can cost less, but the lowest rate is not always the best deal. You are buying reliable help, clear communication, and fewer mistakes. Plan the first month as a test, not a forever decision.' },
      { heading: 'What changes the price', body: 'Price changes with the role. Inbox cleanup, appointment setting, and simple CRM updates are easier to train. Bookkeeping support, sales follow-up, executive support, and customer care need better judgment and closer review.' },
      { heading: 'A safe first budget', body: 'Many owners can test the role with 10 to 20 hours a week. Write down the exact tasks, the tools used, and what good work looks like. If the assistant saves owner time and mistakes stay low, add more hours.' },
      { heading: 'What to ask before you pay', body: 'Ask who screens the assistant, how replacement works, what time zone they cover, and who checks quality. If a provider cannot explain the first week clearly, slow down.' },
    ],
    script: 'We need help with 10 to 15 hours per week first. The main tasks are inbox sorting, calendar cleanup, CRM updates, and lead follow-up. Can you show how you screen for this and what the first week looks like?',
  },
  {
    slug: 'tasks-to-delegate-first',
    title: 'What assistant tasks should you delegate first?',
    excerpt: 'Start with repeatable admin, follow-up, inbox, CRM, and scheduling work.',
    minutes: 6,
    takeaways: ['Pick work that repeats every week.', 'Keep sensitive decisions with the owner.', 'Use examples before you expect speed.'],
    sections: [
      { heading: 'Start with work that repeats', body: 'The best first tasks happen every day or every week. Examples include calendar cleanup, inbox labels, appointment reminders, lead list updates, simple reports, and customer reply drafts.' },
      { heading: 'Do not delegate judgment too early', body: 'Keep pricing changes, refunds, legal advice, medical judgment, hiring decisions, and large spending decisions with the owner. The assistant can prepare information, but the owner should approve the decision.' },
      { heading: 'Give examples', body: 'Show three good examples and one bad example. A short screen recording can save hours of training. The assistant should know what finished work looks like.' },
      { heading: 'Review the first five days', body: 'Check work daily for the first week. Fix the checklist, not just the person. If the same mistake happens twice, the instruction is probably unclear.' },
    ],
    script: 'For the first week, please only draft replies and update the CRM. Do not send messages or change prices without approval. Mark anything unclear with a question.',
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
