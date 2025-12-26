import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    logging: false,
    images: {
        qualities: [25, 50, 75, 100],
    },
}

export default nextConfig

