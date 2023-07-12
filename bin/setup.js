#!/usr/bin/env node
import chalk from 'chalk';
import { getBaseDir, getEnvPath } from "./helpers/files.js";
import { copyFileSync, readFileSync, unlinkSync, writeFileSync } from 'fs';
import inquirer from "inquirer";

/**
* Create a new env file 
* and prompt the user to fill it up
* ==================================================
*/
export async function setupEnvFile() {
  // Check for existing environment files
  const currentEnvFile = getEnvPath();
  if (currentEnvFile) {
    console.log(`An environment file already exists (${ currentEnvFile })`);
    console.log('❌ Setup aborted.');
    process.exit(1);
  }


  // Copy the .env sample
  const baseDir = getBaseDir();
  const currentDir = process.cwd();
  const samplePath = `${ baseDir }/.env.example`
  const envPath = `${ currentDir }/alloctrl.env`;
  
  // Get the file content
  let envContent = readFileSync(samplePath, 'utf-8');
  
  // Prompt for configs
  const algodConfigs = await promptAlgodConfigs();
  const dashboardConfigs = await promptDashboardConfigs();

  
  // Add content to env file
  const configs = { ...algodConfigs, ...dashboardConfigs };
  Object.entries(configs).forEach(([key, value]) => {
    const varLine = new RegExp(`^${ key }=(.+)`, 'gm')
    envContent = envContent.replace(varLine, `${ key }=${ value }` );
  });


  // Write file
  console.log('');
  console.log('Almost done...');
  console.log('💾 Writing variables to your environment file...');
  writeFileSync(envPath, envContent);
  console.log('Done!');
  console.log('');
  
  return envPath;
}




/**
* Prompt for configs
* ==================================================
*/
async function promptConfigs(prompts = []) {
  const configs = await inquirer.prompt(prompts);
  delete configs._;
  return configs;
}

function promptDashboardConfigs() {
  return promptConfigs([
    {
      message: `
  🖥️  Now let's configure your dashboard.
  ${ chalk.reset(`Hit any key to continue.`) }
  `,
      name: '_',
    },
    {
      message: `The HOST used to access the dashboard?
  ${ chalk.reset(`(leave blank for default)`) }
  `,
      name: 'HOST',
      default: '127.0.0.1',
      type: 'input',
    },
    {
      message: `The PORT used to access the dashboard?
  ${ chalk.reset(`(leave blank for default)`) }
  `,
      name: 'PORT',
      default: '3333',
      type: 'input',
    },
    {
      message: `Allow the dashboard connect to GitHub to check the latest versions?
  ${ chalk.reset(`(leave blank for default)`) }
  `,
      name: 'PUBLIC_CHECK_VERSION_ON_GITHUB',
      type: 'confirm',
      default: true,
    },
  ]);
}


function promptAlgodConfigs() {
  return promptConfigs([
    {
      message: `
  📡 Let's start by connecting to your node's REST API.
  ${ chalk.reset(`Hit any key to start!`) }
  `,
      name: '_1',
    },
    {
      message: `What HOST is your node's REST API listening to? 
  ${ chalk.reset(`(leave blank for default)`) }
  `,
      name: 'PUBLIC_ALGOD_HOST',
      default: '127.0.0.1',
      type: 'input',
    },
    {
      message: `What PORT is your node's REST API listening to? 
  ${ chalk.reset(`(leave blank for default)`) }
  `,
      name: 'PUBLIC_ALGOD_PORT',
      default: '8080',
      type: 'input',
    },
    {
      message: `What is your ALGOD API token?
  ${ chalk.reset(
  `You can find your token in <your data folder>/algod.admin.token
  Note: Your token will never be exposed to the browser.`
  ) }
  `,
      name: 'SECRET_ALGOD_ADMIN_TOKEN',
      type: 'input',
    },
  ]);
}