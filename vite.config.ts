import { defineConfig } from 'vite';

import solid from 'vite-plugin-solid';

export default defineConfig({
	base: './',
	plugins: [solid()],
	build: {
		sourcemap: true,
		target: 'esnext',
		modulePreload: {
			polyfill: false,
		},
	},
	resolve: {
		alias: {
			'date-fns': 'date-fns/esm',
		},
	},
});
