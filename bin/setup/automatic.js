import { existsSync, readFileSync } from 'fs';
import { prompt } from '../helpers/prompt.js';
import { getDockerCompose } from '../helpers/files.js';
import path from 'path';


export async function getAlgodConfigsFromFiles() {
  const currentDir = process.cwd();
  // Check for Algorun in the current folder (docker-compose file)
  const dockerCompose = getDockerCompose(currentDir);
  if (dockerCompose) {
    const configPath = path.join(currentDir, 'data');
    let configs = readDataFolder(configPath);
    configs = mergeDockerConfigs(configs, dockerCompose)
    return configs;
  } 

  let configs;
  while(!configs) {
    const dataDir = await prompt([{
      message: `Where is located your node's data folder?`,
      type: 'file-tree-selection',
      name: 'path',
      onlyShowDir: true,
      enableGoUpperDirectory: true,
    }])
    console.log(dataDir)
    configs = readDataFolder(dataDir.path);
    
    if (!configs) {
      console.log(`❌ This doesn't look like an Algorand Node data folder... Please select another one.`);
      continue;
    }
    // Check for a docker-compose file (aka: Algorun)
    const dockerCompose = getDockerCompose(dataDir.path);
    if (dockerCompose) configs = mergeDockerConfigs(configs, dockerCompose)
  } 
  
  return configs;
}


/**
* Read Algod configs from a given data folder
* ==================================================
*/
function readDataFolder(dataPath) {
  if (!dataPath) return;
  const tokenPath = path.join(dataPath, 'algod.admin.token');
  const token = existsSync(tokenPath) && readFileSync(tokenPath, 'utf-8');
  if (!token) return;

  const configPath = path.join(dataPath, 'config.json');
  if (!existsSync(configPath)) 
    return { SECRET_ALGOD_ADMIN_TOKEN: token };
  
  const nodeConfigsRaw = readFileSync(configPath, 'utf-8');
  const nodeConfigs = JSON.parse(nodeConfigsRaw);
  const [ host, port ] = nodeConfigs.EndpointAddress.split(':');
  return {
    PUBLIC_ALGOD_HOST: host,
    PUBLIC_ALGOD_PORT: Number(port) ? port : '8080',
    SECRET_ALGOD_ADMIN_TOKEN: token,
  };
}

/**
* Get configs from docker-compose
* ==================================================
*/
function mergeDockerConfigs(configs = {}, dockerComposeContent = '') {
  // Check for algod mapped port
  const dockerPortRegex = new RegExp(`\n\\s*-\\s(\\d+?):${ configs.PUBLIC_ALGOD_PORT }\n`, 'g');
  const portMatched = dockerPortRegex.exec(dockerComposeContent);
  if (portMatched && portMatched[1]) configs.PUBLIC_ALGOD_PORT = portMatched[1];
  
  return configs;
}