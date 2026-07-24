export type FleetService = {
  slug: string;
  title: string;
  desc: string;
  tasks: readonly string[];
  controls: readonly string[];
  firstWeek: readonly string[];
  image?: string;
  imageAlt?: string;
  bestFor?: readonly string[];
  keepLocal?: readonly string[];
  faqs?: readonly { question: string; answer: string }[];
};
export type ResearchPost = { slug: string; title: string; excerpt: string; published: string; sections: readonly { heading: string; body: string }[]; sources?: readonly { name: string; url: string }[] };

export const fleetServices: readonly FleetService[] = [
  { slug: 'executive-assistance', title: 'Executive Assistance', desc: 'Hire a Filipino executive assistant for calendar, inbox, meeting, and follow-up work with clear access limits and daily review.', tasks: ['Sort the executive inbox and flag messages that need a personal reply', 'Prepare meeting briefs, agendas, notes, and follow-up lists', 'Coordinate calendars, travel research, and routine document updates'], controls: ['Keep final replies, purchases, and business promises with the executive', 'Use a separate account with only the calendar, inbox, and files the role needs', 'Set a same-day escalation rule for urgent, private, or unclear requests'], firstWeek: ['Choose the hours that overlap with your workday and confirm the Philippines-based schedule', 'Practice inbox labels and meeting prep with past examples', 'Review each completed batch before adding travel or document work'], image: '/images/assistant-maya.jpg', imageAlt: 'Friendly executive assistant role illustration at a desk' },
  {
    slug: 'calendar-and-inbox-support',
    title: 'Calendar and Inbox Support',
    desc: 'Hire a Filipino remote assistant to sort email, protect focus time, schedule meetings, and prepare follow-up without giving up final control of your inbox.',
    tasks: [
      'Label new email by urgency, owner, customer, and next action',
      'Draft routine replies from approved examples and hold them for review',
      'Schedule meetings, add call details, and protect blocked focus time',
      'Send approved reminders and keep a short list of unanswered messages',
    ],
    controls: [
      'Keep final replies, deleted messages, purchases, and customer promises with the owner',
      'Use a named account with limited mailbox and calendar permissions',
      'Set a clear stop rule for private, legal, medical, payment, or angry-customer messages',
    ],
    firstWeek: [
      'Choose overlap hours and agree on the Filipino assistant schedule',
      'Review 20 past messages together and write simple label and escalation rules',
      'Run drafts and calendar changes in small batches with a same-day owner check',
      'Review missed details on day five before adding more send or edit access',
    ],
    image: '/images/calendar-assistant.jpg',
    imageAlt: 'Assistant reviewing a calendar and email plan on a laptop',
    bestFor: [
      'Owners who lose time sorting routine email',
      'Teams with repeat booking, reminder, and follow-up work',
      'Managers who can review drafts during the first week',
    ],
    keepLocal: [
      'Walk-in reception and physical mail',
      'Private decisions that need owner judgment',
      'Any message that needs legal, medical, or financial advice',
    ],
    faqs: [
      {
        question: 'Can a Filipino assistant send email for me?',
        answer: 'Yes, after you set clear rules and approve the level of access. Many owners start with sorting and drafts, then allow routine sends only after the assistant has shown steady accuracy.',
      },
      {
        question: 'Can the assistant work during my local business hours?',
        answer: 'The role can be planned around agreed overlap hours. The schedule should be confirmed before matching so the Filipino assistant and your team know when live replies and handoffs are expected.',
      },
      {
        question: 'What should stay with me?',
        answer: 'Keep sensitive decisions, final customer promises, payments, private staff matters, and messages that need licensed advice with the owner or qualified team member.',
      },
    ],
  },
  { slug: 'customer-service-assistance', title: 'Customer Service Assistance', desc: 'Build a Philippines-based customer service assistance workflow with documented responsibilities, access limits, and manager review.', tasks: ['Document the recurring remote assistant work', 'Complete approved tasks in the client workflow', 'Record exceptions and next actions'], controls: ['Use named accounts and limited permissions', 'Follow written approval and escalation rules', 'Review work with a client-side owner'], firstWeek: ['Confirm scope and working hours', 'Practice with representative examples', 'Review the first completed work together'] },
  { slug: 'sales-administrative-support', title: 'Sales Administrative Support', desc: 'Build a Philippines-based sales administrative support workflow with documented responsibilities, access limits, and manager review.', tasks: ['Document the recurring remote assistant work', 'Complete approved tasks in the client workflow', 'Record exceptions and next actions'], controls: ['Use named accounts and limited permissions', 'Follow written approval and escalation rules', 'Review work with a client-side owner'], firstWeek: ['Confirm scope and working hours', 'Practice with representative examples', 'Review the first completed work together'] },
  { slug: 'ecommerce-assistance', title: 'Ecommerce Assistance', desc: 'Build a Philippines-based ecommerce assistance workflow with documented responsibilities, access limits, and manager review.', tasks: ['Document the recurring remote assistant work', 'Complete approved tasks in the client workflow', 'Record exceptions and next actions'], controls: ['Use named accounts and limited permissions', 'Follow written approval and escalation rules', 'Review work with a client-side owner'], firstWeek: ['Confirm scope and working hours', 'Practice with representative examples', 'Review the first completed work together'] },
  { slug: 'real-estate-assistance', title: 'Real Estate Assistance', desc: 'Build a Philippines-based real estate assistance workflow with documented responsibilities, access limits, and manager review.', tasks: ['Document the recurring remote assistant work', 'Complete approved tasks in the client workflow', 'Record exceptions and next actions'], controls: ['Use named accounts and limited permissions', 'Follow written approval and escalation rules', 'Review work with a client-side owner'], firstWeek: ['Confirm scope and working hours', 'Practice with representative examples', 'Review the first completed work together'] },
  { slug: 'marketing-coordination', title: 'Marketing Coordination', desc: 'Build a Philippines-based marketing coordination workflow with documented responsibilities, access limits, and manager review.', tasks: ['Document the recurring remote assistant work', 'Complete approved tasks in the client workflow', 'Record exceptions and next actions'], controls: ['Use named accounts and limited permissions', 'Follow written approval and escalation rules', 'Review work with a client-side owner'], firstWeek: ['Confirm scope and working hours', 'Practice with representative examples', 'Review the first completed work together'] },
  { slug: 'bookkeeping-administration', title: 'Bookkeeping Administration', desc: 'Build a Philippines-based bookkeeping administration workflow with documented responsibilities, access limits, and manager review.', tasks: ['Document the recurring remote assistant work', 'Complete approved tasks in the client workflow', 'Record exceptions and next actions'], controls: ['Use named accounts and limited permissions', 'Follow written approval and escalation rules', 'Review work with a client-side owner'], firstWeek: ['Confirm scope and working hours', 'Practice with representative examples', 'Review the first completed work together'] },
  { slug: 'recruitment-assistance', title: 'Recruitment Assistance', desc: 'Build a Philippines-based recruitment assistance workflow with documented responsibilities, access limits, and manager review.', tasks: ['Document the recurring remote assistant work', 'Complete approved tasks in the client workflow', 'Record exceptions and next actions'], controls: ['Use named accounts and limited permissions', 'Follow written approval and escalation rules', 'Review work with a client-side owner'], firstWeek: ['Confirm scope and working hours', 'Practice with representative examples', 'Review the first completed work together'] },
  { slug: 'project-coordination', title: 'Project Coordination', desc: 'Build a Philippines-based project coordination workflow with documented responsibilities, access limits, and manager review.', tasks: ['Document the recurring remote assistant work', 'Complete approved tasks in the client workflow', 'Record exceptions and next actions'], controls: ['Use named accounts and limited permissions', 'Follow written approval and escalation rules', 'Review work with a client-side owner'], firstWeek: ['Confirm scope and working hours', 'Practice with representative examples', 'Review the first completed work together'] }
];

// Add reviewed, source-backed original research here. The templates and sitemap update automatically.
export const researchPosts: readonly ResearchPost[] = [];
export const postsPerPage = 20;
