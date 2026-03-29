/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/motivation",
  env: {
    NEXT_PUBLIC_BASE_PATH: "/motivation",
  },
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
