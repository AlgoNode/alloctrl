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


  // copy the .env sample
  const baseDir = getBaseDir();
  const currentDir = process.cwd();
  const samplePath = `${ baseDir }/.env.example`
  const envPath = `${ currentDir }/alloctrl.env`;
  


  // get the file content
  let envContent = readFileSync(samplePath, 'utf-8');
  const configs = await inquirer.prompt([
    // Algod API
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
`  You can find your token in <your data folder>/algod.admin.token
  Note: Your token will never be exposed to the browser.`
) }
`,
      name: 'SECRET_ALGOD_ADMIN_TOKEN',
      type: 'input',
    },

    // Dashboard
    {
      message: `
  🖥️  Now let's configure your dashboard.
  ${ chalk.reset(`Hit any key to continue.`) }
  `,
      name: '_2',
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

  // Remove temp messages
  delete configs._1;
  delete configs._2;

  // Add content to env file
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