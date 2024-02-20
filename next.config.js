/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'static.lolesports.com',
                port: '',
                pathname: '/players/**.png',
            },
            {
                protocol: 'https',
                hostname: 'static.wikia.nocookie.net',
                port: '',
                pathname: '**.png',
            },
        ],
    },
}

module.exports = nextConfig
