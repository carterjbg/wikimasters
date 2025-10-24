import type { NextConfig } from "next";
import { dirname } from "node:path";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL("https://wc7fqa2b9wf5r2ws.public.blob.vercel-storage.com/**"),
    ],
  },
  turbopack: {
    root: dirname(__filename),
  },
};

export default nextConfig;
