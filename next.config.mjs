/** @type {import('next').NextConfig} */
import withPWA  from '@ducanh2912/next-pwa'

withPWA({
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
  })

  
const nextConfig = {
  async redirects() {
    return [
      { source: '/colleges', destination: '/product/campus-suite', permanent: true },
    ];
  },
};

export default nextConfig;
