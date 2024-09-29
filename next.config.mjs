/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    HOST: process.env.MAIN_URL,
  },
  images: {
    domains: ['127.0.0.1'],
  },
};
export default nextConfig;
