/** @type {import('next').NextConfig} */
import withPWA  from '@ducanh2912/next-pwa'

withPWA({
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
  })

  
const nextConfig = {};

export default nextConfig;
