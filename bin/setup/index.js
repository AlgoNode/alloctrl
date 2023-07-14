#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'fs';
import { getBaseDir, getEnvPath } from "../helpers/files.js";
import { promptAlgodConfigs, promptAlgodSetupType, promptDashboardConfigs, promptDashboardSetupType, promptFeaturesConfigs } from "./prompts.js";
import { getAlgodConfigsFromFiles } from './automatic.js';

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
  
  
  //
  // Algod prompts
  // --------------------------------------------------
  console.log(''); // print empty line
  const algodSetupType = await promptAlgodSetupType(); 

  console.log(''); // print empty line
  const algodConfigs = algodSetupType.auto 
    ? await getAlgodConfigsFromFiles()
    : await promptAlgodConfigs();
  console.log(`✅ Algod is set.`);
  
  //
  // Dashboard prompts
  // --------------------------------------------------
  console.log(''); // print empty line
  const dashboardSetupType = await promptDashboardSetupType(); 
  
  console.log(''); // print empty line
  const dashboardConfigs = dashboardSetupType.useDefaults 
    ? {} // uses the configs from .env.example
    : await promptDashboardConfigs();  
  console.log(`✅ Dashboard is set.`);


  //
  // Features configs
  // --------------------------------------------------
  console.log(''); // print empty line
  const featuresConfigs = await promptFeaturesConfigs();  
  console.log(`✅ Features are set.`);

  
  //
  // Write the env file
  // --------------------------------------------------
  const configs = { ...algodConfigs, ...dashboardConfigs, ...featuresConfigs };
  let envContent = readFileSync(samplePath, 'utf-8');
  Object.entries(configs).forEach(([key, value]) => {
    const varLine = new RegExp(`^${ key }=(.+)`, 'gm')
    envContent = envContent.replace(varLine, `${ key }=${ value }` );
  });


  // Write file
  console.log(`
💾 Writing variables to your environment file...
`);
  writeFileSync(envPath, envContent);
  console.log(`✅ Done!`);
  
  return envPath;
}


