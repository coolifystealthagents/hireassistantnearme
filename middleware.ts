import { NextRequest, NextResponse } from 'next/server';

const canonicalHost = 'hireassistantnearme.com';

function originalVisitorProtocol(value: string | null) {
  if (!value) return '';
  const match = value.match(/"scheme"\s*:\s*"(https?)"/i);
  return match?.[1]?.toLowerCase() || '';
}

export function middleware(request: NextRequest) {
  const host = request.headers.get('host')?.split(':')[0].toLowerCase();
  const visitorProtocol = originalVisitorProtocol(request.headers.get('cf-visitor'));
  const forwardedProtocol = request.headers.get('x-forwarded-proto')?.split(',')[0].trim().toLowerCase();
  const effectiveProtocol = visitorProtocol || forwardedProtocol || request.nextUrl.protocol.replace(':', '').toLowerCase();
  const isLocalPreview = process.env.ALLOW_LOCAL_PREVIEW === '1' && process.env.NODE_ENV !== 'production' && (host === 'localhost' || host === '127.0.0.1');
  const needsHttps = !isLocalPreview && effectiveProtocol !== 'https';
  const needsHost = Boolean(host && host !== canonicalHost && !isLocalPreview);

  if (needsHttps || needsHost) {
    const destination = request.nextUrl.clone();
    destination.protocol = 'https:';
    destination.hostname = canonicalHost;
    destination.port = '';
    return NextResponse.redirect(destination, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
