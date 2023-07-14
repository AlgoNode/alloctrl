#!/usr/bin/env node
import { getBaseDir, getEnvPath } from './helpers/files.js';
import { prompt } from './helpers/prompt.js';
import { spawn } from 'child_process';
import dotenv from 'dotenv'


/**
* Get the env file
* ==================================================
*/
let envPath = getEnvPath()
if (!envPath) {
  const startSetup = await prompt([
    {
      prefix: '⚠️ ',
      message: `No environment file found. 
        Would you like to launch the setup process and create one?` ,
      name: 'confirmed',
      type: 'confirm',
    }
  ]);
  if (!startSetup.confirmed){
    console.log('👋 Alright then. See you later!');
    process.exit(1);
  }

  // No env, start setup process
  const { setupEnvFile } = await import('./setup/index.js');
  await setupEnvFile();
}

/**
* Load the env files
* ==================================================
*/
envPath = getEnvPath()
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