/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    HOST: process.env.MAIN_URL,
  },
  // images: {
  //   domains: ['127.0.0.1'],
  // },
  images: {
    domains: ['127.0.0.1'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**',
      },
    ],
  },
};
export default nextConfig;
