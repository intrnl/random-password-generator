import * as esbuild from 'esbuild';
import buildAnalysis from '@intrnl/esbuild-plugin-build-analysis';

import { config } from '../esbuild.config.js';


await esbuild.build({
	minify: true,
	logLevel: 'info',
	...config,
	format: 'esm',
	bundle: true,
	splitting: true,
	plugins: [
		...config.plugins || [],
		buildAnalysis(),
	],
});
