/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // !! WARNING !!
    // Dangerously allow builds to succeed even if there are TypeScript errors.
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
