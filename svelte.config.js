import adapter from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
 
const file = fileURLToPath(new URL('package.json', import.meta.url));
const json = readFileSync(file, 'utf8');
const pkg = JSON.parse(json);

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess({
		scss: {
			prependData: `@use "sass:math";
										@import './src/styles/mixins';
										@import './src/styles/variables/breakpoints';`
		}
	}),
	kit: {
		adapter: adapter({ out: 'build' }),
		version: {
			name: pkg.version,
		},
		files: {
			hooks: {
				client: 'src/middlewares/hooks/client',
				server: 'src/middlewares/hooks/server',
			},
			params: 'src/middlewares/params',
		}
	}
};

export default config;
