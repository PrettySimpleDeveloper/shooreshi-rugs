const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.shooreshirugs.**"
      }
    ]
  },
  logging: {
    fetches: {
      fullUrl: true
    }
  }
};

module.exports = withNextIntl(nextConfig);
