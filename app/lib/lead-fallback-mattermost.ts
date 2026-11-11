export interface FallbackLeadPayload { name:string;email:string;phone:string;business?:string;message?:string;companySize?:string;positions?:string;referral?:string;pageUrl:string;userAgent?:string }

export async function sendLeadFallbackToMattermost(lead:FallbackLeadPayload):Promise<void>{
  // ACR alone owns lead notifications. Never send directly to Mattermost.
  return undefined;
}
