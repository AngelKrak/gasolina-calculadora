import withPWA from 'next-pwa';

const repo = 'gasolina-calculadora';

const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  basePath: isProd ? `/${repo}` : '',
  assetPrefix: isProd ? `/${repo}/` : '',
  trailingSlash: true,
  reactStrictMode: false,
  output: 'export' as const,
};

export default withPWA({
  dest: 'public',
  disable: !isProd,
})(nextConfig);