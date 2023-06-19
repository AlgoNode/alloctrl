import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';

const config = {
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
};

export default config;
