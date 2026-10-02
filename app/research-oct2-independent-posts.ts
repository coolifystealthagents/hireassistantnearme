import type { ResearchPost } from './fleet-data';
import { oct2IndependentResearchContent } from './research-oct2-independent-content';

const published = '2026-10-02';
const specs = [
  ['inbox-assistant-business-email-compromise-payment-change','inbox-assistant-business-email-compromise-payment-change','Payment-change emails: what should an inbox assistant verify before routing?','A verification boundary for changed bank details, invoice requests, impersonation signals, and payment-owner escalation.','/images/assistant-elena.jpg','Administrative assistant reviewing a suspicious payment-change email',[['CISA, Cross-Sector Cybersecurity Performance Goals','https://www.cisa.gov/sites/default/files/publications/CISA_CPG_CHECKLIST_12052022.pdf'],['FBI, Business Email Compromise','https://www.fbi.gov/how-we-can-help-you/scams-and-safety/common-frauds-and-scams/business-email-compromise'],['NIST SP 800-63A, Identity Proofing','https://pages.nist.gov/800-63-4/sp800-63a.html']]],
  ['customer-support-assistant-account-recovery-identity-boundary','customer-support-assistant-account-recovery-identity-boundary','Account recovery: what can a support assistant collect without deciding identity?','A least-data handoff for recovery requests, identity evidence, channel risk, access restoration, and security-owner review.','/images/assistant-maya.jpg','Customer support assistant preparing an account recovery handoff',[['NIST SP 800-63B, Authentication and Authenticator Management','https://pages.nist.gov/800-63-4/sp800-63b.html'],['NIST SP 800-63A, Identity Proofing','https://pages.nist.gov/800-63-4/sp800-63a.html'],['FTC, Protecting Personal Information','https://www.ftc.gov/business-guidance/resources/protecting-personal-information-guide-business']]],
  ['recruitment-assistant-background-check-consent-handoff','recruitment-assistant-background-check-consent-boundary','Background checks: what should a recruitment assistant preserve before ordering?','A consent-and-authorization record for screening scope, disclosure, vendor routing, adverse information, and employer decisions.','/images/local-team.jpg','Recruitment assistant checking a background screening authorization record',[['FTC, Background Checks: What Employers Need to Know','https://www.ftc.gov/business-guidance/resources/background-checks-what-employers-need-know'],['EEOC, Background Checks','https://www.eeoc.gov/background-checks'],['CFPB, List of Consumer Reporting Companies','https://www.consumerfinance.gov/consumer-tools/credit-reports-and-scores/consumer-reporting-companies/']]],
  ['social-media-assistant-comment-moderation-record','social-media-assistant-comment-moderation-escalation-boundary','Comment moderation: what should a social media assistant record before hiding content?','A policy-led record for spam, threats, criticism, accessibility, preserved context, and public-response ownership.','/images/aug21-blog-fact-checking.png','Social media assistant reviewing comments against an approved moderation policy',[['FTC, Endorsements, Influencers, and Reviews','https://www.ftc.gov/business-guidance/advertising-marketing/endorsements-influencers-reviews'],['FTC, Soliciting and Paying for Online Reviews','https://www.ftc.gov/business-guidance/resources/soliciting-paying-online-reviews-guide-marketers'],['CISA, De-escalation Series','https://www.cisa.gov/resources-tools/resources/de-escalation-series']]],
  ['real-estate-assistant-lead-fair-housing-routing','real-estate-assistant-fair-housing-inquiry-routing-boundary','Real-estate leads: how should an assistant route requests without steering?','A neutral intake boundary for property criteria, protected-class cues, availability evidence, agent review, and consistent follow-up.','/images/assistant-daniel.jpg','Real estate assistant routing buyer criteria with a neutral intake form',[['HUD, Housing Discrimination Under the Fair Housing Act','https://www.hud.gov/helping-americans/fair-housing-act-overview'],['HUD, Guidance on Fair Housing Advertising through Digital Platforms','https://archives.hud.gov/news/2024/FHEO_Guidance_on_Advertising_through_Digital_Platforms.pdf'],['DOJ, Fair Housing Act','https://www.justice.gov/crt/fair-housing-act-1']]],
] as const;

export const oct2Hira101ResearchPosts: readonly ResearchPost[] = specs.map(([slug, contentKey, title, excerpt, image, imageAlt, sources]) => {
  const content = oct2IndependentResearchContent[contentKey];
  return {
    slug, title, excerpt, published, image, imageAlt,
    keyStats: [
      {value:String(content.sections.length),label:'Independent analytical sections',source:'Study source'},
      {value:String(sources.length),label:'Authoritative sources checked',source:'Source ledger'},
      {value:'0',label:'Customer or worker outcomes measured',source:'Study boundary'},
    ],
    takeaways: [content.sections[0].body, content.sections.at(-1)!.body],
    sections: content.sections,
    tables: [],
    sources: sources.map(([name, url]) => ({name:`${name} (checked October 2, 2026)`,url})),
    related: [{label:'Browse Research',href:'/research'},{label:'Discuss a bounded role brief',href:'/contact-us'}],
  };
});
