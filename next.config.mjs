/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // !! WARNING !!
    // Dangerously allow builds to succeed even if there are TypeScript errors.
    ignoreBuildErrors: true,
  },
  eslint: {
    // !! WARNING !!
    // Dangerously allow builds to succeed even if there are ESLint errors.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
