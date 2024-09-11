/** @type {import('next').NextConfig} */
const nextConfig = {
    env:{
        HOST: process.env.MAIN_URL,
    }
};

export default nextConfig;
