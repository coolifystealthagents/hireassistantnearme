import { NextRequest, NextResponse } from 'next/server';

const canonicalHost = 'hireassistantnearme.com';

export function middleware(request: NextRequest) {
  const host = request.headers.get('host')?.split(':')[0].toLowerCase();
  const forwardedProtocol = request.headers.get('x-forwarded-proto')?.split(',')[0].trim().toLowerCase();
  const effectiveProtocol = forwardedProtocol || request.nextUrl.protocol.replace(':', '').toLowerCase();
  const needsHttps = effectiveProtocol !== 'https';
  const needsHost = Boolean(host && host !== canonicalHost && host !== 'localhost' && host !== '127.0.0.1');

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
