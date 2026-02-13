import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/cardiorenal-risk-report",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
