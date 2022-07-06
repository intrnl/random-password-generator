import * as esbuild from 'esbuild';

import velvet from '@intrnl/esbuild-plugin-velvet';
import env from '@intrnl/esbuild-plugin-env';


/** @type {esbuild.BuildOptions} */
export let config = {
	entryPoints: ['src/App.velvet'],
	entryNames: 'app',
	outdir: 'dist/_assets',

	sourcemap: true,

	plugins: [
		env(),
		velvet(),
	],
};
