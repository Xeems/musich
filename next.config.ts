import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    logging: false,
    images: {
        qualities: [25, 50, 75, 100],
    },
    allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev'],
}

export default nextConfig

