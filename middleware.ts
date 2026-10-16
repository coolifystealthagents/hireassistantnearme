import { NextRequest, NextResponse } from 'next/server';

const canonicalHost = 'hireassistantnearme.com';

export function middleware(request: NextRequest) {
  const host = request.headers.get('host')?.toLowerCase();
  const forwardedProtocol = request.headers.get('x-forwarded-proto')?.split(',')[0]?.trim();
  const isProductionHost = host === canonicalHost || host === `www.${canonicalHost}`;
  const needsCanonicalHost = host === `www.${canonicalHost}`;
  const needsHttps = isProductionHost && forwardedProtocol === 'http';
  if (needsCanonicalHost || needsHttps) {
    const target = request.nextUrl.clone();
    target.protocol = 'https:';
    target.hostname = canonicalHost;
    target.port = '';
    return NextResponse.redirect(target, 308);
  }
  return NextResponse.next();
}

export const config = { matcher: ['/((?!_next/static|_next/image).*)'] };
