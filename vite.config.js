import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';

const config = {
    server: {
        port: process.env.PORT || 3000,
        host: process.env.HOST || 'localhost'
    },
	plugins: [
		sveltekit(),
	],
	resolve: {
		alias: {
			$assets: path.resolve('./src/assets'),
			$components: path.resolve('./src/components'),
			$middlewares: path.resolve('./src/middlewares'),
			$fa: '@fortawesome/fontawesome-free/svgs',
		},
	},

	ssr: {
		external: ['algostack'],
	},
};

export default config;
