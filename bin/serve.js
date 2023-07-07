#!/usr/bin/env node
import { spawn } from 'node:child_process';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const server = spawn(`node`, [
 '-r', `${__dirname}/../node_modules/dotenv/config.js`, 
 `${__dirname}/../build`
]);

server.stdout.pipe(process.stdout) 
server.stderr.pipe(process.stderr)