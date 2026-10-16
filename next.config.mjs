/** @type {import("next").NextConfig} */
const securityHeaders = [
  { key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self' 'unsafe-inline' https://acrtracking.stealthagents.us https://static.cloudflareinsights.com; connect-src 'self' https://cloudflareinsights.com https://acrtracking.stealthagents.us; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'; font-src 'self' data:; frame-src 'self' https://*.oncehub.com https://*.scheduleonce.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'self'; upgrade-insecure-requests" },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
];

/** @type {import("next").NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  async headers() { return [{ source: '/(.*)', headers: securityHeaders }]; },
  async redirects() { return [{ source: '/contact', destination: '/contact-us', permanent: true }]; },
  async rewrites() { return [{ source: '/favicon.ico', destination: '/icon.svg' }]; },
};
export default nextConfig;
