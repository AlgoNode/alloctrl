#!/usr/bin/env node
import { spawn } from 'node:child_process';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const appDir = dirname(scriptDir + '/../..');
const server = spawn(`node`, [
 '-r', `${appDir}/../node_modules/dotenv/config.js`, 
 `${appDir}/build`
]);

server.stdout.pipe(process.stdout) 
server.stderr.pipe(process.stderr)