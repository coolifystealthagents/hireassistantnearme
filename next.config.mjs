/** @type {import("next").NextConfig} */
const nextConfig = {
  async headers() {
    return [{ source: '/(.*)', headers: [{ key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self' 'unsafe-inline' https://acrtracking.stealthagents.us; connect-src 'self'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'; font-src 'self' data:; frame-src 'self' https://*.oncehub.com https://*.scheduleonce.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'self'" }] }];
  },
};
export default nextConfig;
