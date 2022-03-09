import * as os from 'os';
import * as http from 'http';
import * as esbuild from 'esbuild';

import { config } from '../esbuild.config.js';


const args = process.argv.slice(2);

const serverOptions = {
	host: args.includes('--host') ? '0.0.0.0' : '127.0.0.1',
	port: 3000,
};

const internal = await esbuild.serve({
	servedir: 'dist/',
}, {
	minify: false,
	...config,
	format: 'esm',
	bundle: true,
	splitting: true,
	sourcemap: true,
	plugins: [
		...config.plugins || [],
	],
});

const server = http.createServer((request, response) => {
	const options = {
		hostname: internal.host,
		port: internal.port,
		path: request.url,
		method: request.method,
		header: request.headers,
	};

	const handleProxyRequest = (res) => {
		if (res.statusCode === 404 && options.path !== '/') {
			options.path = '/';

			const proxy = http.request(options, handleProxyRequest);
			request.pipe(proxy, { end: true });
			return;
		}

		response.writeHead(res.statusCode, res.headers);
		res.pipe(response, { end: true });
	};

	const proxy = http.request(options, handleProxyRequest);
	request.pipe(proxy, { end: true });
});

const result = await startServer(server, serverOptions);
printServerInfo(result);


function startServer (server, options) {
	const { host, port } = options;

	return new Promise((resolve, reject) => {
		const handleError = (error) => {
			if (error.code === 'EADDRINUSE') {
				console.log(`port ${port} already in use, retrying...`);
				server.listen(0, host);
			}
			else {
				server.removeListener('error', handleError);
				reject(error);
			}
		};

		server.on('error', handleError);

		server.listen(port, host, () => {
			server.removeListener('error', handleError);

			const { address: host, port } = server.address();
			resolve({ host, port });
		});
	});
}

function printServerInfo ({ host, port }) {
	if (host === '127.0.0.1') {
		console.info(`> local: http://${host}:${port}`);
		console.info(`> network: not exposed`);
	}
	else {
		const addresses = Object.values(os.networkInterfaces())
			.flatMap((intrf) => intrf ?? [])
			.filter((address) => address.family === 'IPv4');

		for (const address of addresses) {
			const type = address.internal ? 'local' : 'network';
			const hostname = address.internal ? 'localhost' : address.address;
			console.info(`> ${type}: http://${hostname}:${port}`);
		}
	}

	console.log('');
}
