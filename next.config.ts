import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    KV_URL: process.env.KV_URL,
    KV_PORT: process.env.KV_PORT,
    KV_REST_API_TOKEN: process.env.KV_REST_API_TOKEN,
    KV_REST_API_READ_ONLY_TOKEN: process.env.KV_REST_API_READ_ONLY_TOKEN,
    KV_REST_API_URL: process.env.KV_REST_API_URL
  },
};

export default nextConfig;
