#!/usr/bin/env node
import { getBaseDir, getEnvPath } from "./helpers/files.js";
import { readFileSync, writeFileSync } from 'fs';
import { promptAlgodConfigs, promptDashboardConfigs } from "./helpers/promts.js";

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
  console.log(`
Almost done...
💾 Writing variables to your environment file...
`);
  writeFileSync(envPath, envContent);
  console.log(`
Done!
`);
  
  return envPath;
}


