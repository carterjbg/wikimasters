import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL("https://wc7fqa2b9wf5r2ws.public.blob.vercel-storage.com/**"),
    ],
  },
};

export default nextConfig;
