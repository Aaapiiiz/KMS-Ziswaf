// next.config.ts (FINAL, CORRECTED VERSION)

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ydxfwvmmdpontziiebbc.supabase.co', // <<< ADD THIS LINE FROM YOUR ERROR MESSAGE
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;