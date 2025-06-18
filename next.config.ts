import withPWA from 'next-pwa';

const repo = 'gasolina-calculadora';

const nextConfig = {
  basePath: `/${repo}`,
  assetPrefix: `/${repo}/`,
  trailingSlash: true,
  output: 'export' as const,
};

export default withPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
})(nextConfig);