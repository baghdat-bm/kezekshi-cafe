import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
    images: {
        domains: ['localhost'], // внешние домены откуда загружаются изображения
    },
};

export default nextConfig;
