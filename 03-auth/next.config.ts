import type { NextConfig } from "next";
import { dirname } from "node:path";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  turbopack: {
    root: dirname(__filename),
  },
};

export default nextConfig;
