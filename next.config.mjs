const isProd = process.env.NODE_ENV === 'production';
const repo = 'rs-react-2025q3';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: isProd ? `/${repo}` : '',
  assetPrefix: isProd ? `/${repo}/` : '',
  images: { unoptimized: true },
  trailingSlash: true,
  distDir: './dist',
};

export default nextConfig;
