/** @type {import('next').NextConfig} */
// const withFonts = require('next-fonts');

const API_KIE = '9fc49939685eaa1b8f3c3b7a8005d5aa';
const BASE_URL = 'https://api.themoviedb.org/3/';

const nextConfig = {
    reactStrictMode: false,
    // 특정 url 접근시 다른 url로 리다이렉션
    async redirects() {
        return [
            {
                source: '/contact/:id',
                destination: 'https://www.naver.com',
                permanent: false,
            },
        ];
    },
    // destination 주소를 source의 주소로 보임 (API KEY가 가려짐)
    async rewrites() {
        return [
            {
                source: '/api/movies',
                destination: `${BASE_URL}movie/popular?api_key=${API_KIE}`,
            },
            {
                source: '/api/movies/:id',
                destination: `${BASE_URL}movie/:id?api_key=${API_KIE}`,
            },
        ];
    },
    webpack: (config) => {
        config.module.rules.push(
            {
                test: /\.svg$/,
                use: ['@svgr/webpack'],
            },
            {
                test: /\.(ttf)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        limit: 100000,
                        name: '[name].[ext]',
                    },
                },
            },
        );
        return config;
    },
};

module.exports = nextConfig;
