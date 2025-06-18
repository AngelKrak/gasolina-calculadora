import type { NextConfig } from "next";
import withPWA from "next-pwa";

const repo = 'gasolina-calculadora';

const nextConfig: NextConfig = {
  basePath: `/${repo}`,
  assetPrefix: `/${repo}/`,
  trailingSlash: true,
  output: 'export',
};

export default withPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
})(nextConfig);