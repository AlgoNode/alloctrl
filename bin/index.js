#!/usr/bin/env node
import { spawn } from 'node:child_process';

import { getBaseDir, getEnvPath } from './helpers/files.js';
import dotenv from 'dotenv'
import inquirer from 'inquirer';


/**
* Get the env file
* ==================================================
*/
let envPath = getEnvPath()
if (!envPath) {
  const startSetup = await inquirer.prompt([
    {
      message: 'No environment file found. \nWould you like to launch the setup process and create one?',
      name: 'confirmed',
      type: 'confirm',
    }
  ]);
  if (!startSetup.confirmed){
    console.log('👋 Alright then. See you later!');
    process.exit(1);
  }
  const { setupEnvFile } = await import('./setup.js');
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
const server = spawn(`node`, [`${baseDir}/build`], { env: process.env });
server.stdout.pipe(process.stdout) 
server.stderr.pipe(process.stderr)