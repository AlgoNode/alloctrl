#!/usr/bin/env node
import { spawn } from 'child_process';
import { existsSync, unlinkSync } from 'fs';
import { getBaseDir, getEnvPath } from './helpers/files.js';
import { setupEnvFile } from './setup/index.js';
import { confirmNewSetup, confirmRestartSetup } from './setup/prompts.js';

import dotenv from 'dotenv'

let envPath = getEnvPath()

/**
* Parse command arguments
* ==================================================
*/
const arg = process.argv[2];
if (arg) {
  switch (arg) {

    // Restart setup
    case 'setup':
      await confirmRestartSetup();
      if (envPath) unlinkSync(envPath);
      await setupEnvFile();
      envPath = getEnvPath();
      break;

    // Check if arg is an env file
    default:
      if (existsSync(`${ process.cwd() }/${ arg }`)) {
        envPath = `${ process.cwd() }/${ arg }`;
        console.log('path', envPath)
      }
      break;
  }
}


/**
* Setup new env file
* ==================================================
*/
if (!envPath) {
  await confirmNewSetup();
  await setupEnvFile();
  envPath = getEnvPath()
}


/**
* Load the env files
* ==================================================
*/
if (!envPath) {
  console.log(`❌ Could not load the environment file. Aborting.`);
  process.exit(1);
}
dotenv.config({ path: envPath });
const baseDir = getBaseDir();



/**
* Spawn the server process
* ==================================================
*/
console.log('');
console.log(`⚡ Starting dashboard on http://${ process.env.HOST }:${ process.env.PORT }`)

const server = spawn(`node`, [`${baseDir}/build`], { env: process.env });
server.stdout.pipe(process.stdout) 
server.stderr.pipe(process.stderr)