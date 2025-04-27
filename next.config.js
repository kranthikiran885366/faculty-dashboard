/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
    ignoreDuringBuilds: true,
    },
    typescript: {
    ignoreBuildErrors: true,
    },
    images: {
    unoptimized: true,
    },
    experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
    },
    output: 'export',
    basePath: '/faculty-dashboard',
};

module.exports = nextConfig;