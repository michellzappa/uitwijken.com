import type { NextConfig } from "next";

// Static export: Cloudflare serves ./out through worker/index.js.
const config: NextConfig = { output: "export" };
export default config;
