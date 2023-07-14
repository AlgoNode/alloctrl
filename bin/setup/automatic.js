import { existsSync, readFileSync } from 'fs';
import { prompt } from '../helpers/prompt.js';


export async function getAlgodConfigsFromFiles() {
  const currentDir = process.cwd();
  
  // Check for Algorun in the current folder (docker-compose file)
  const dockerComposePath = `${ currentDir }/docker-compose.yml`;
  const hasDockerCompose = existsSync(dockerComposePath);
  if (hasDockerCompose) {
    const dockerCompose = readFileSync(dockerComposePath, 'utf-8');
    // make sure the node's data volume is linked in current directory 
    const hasDataVolume = /\s*-\s*(\$\{PWD\}\/data\:\/algod\/data\/\:rw)/gm.test(dockerCompose);
    if (hasDataVolume) return readDataFolder(`${ currentDir }/data`);
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
    configs = readDataFolder('/'+dataDir.path);
    if (!configs) console.log(`❌ This doesn't look like an Algorand Node data folder... Please select another one.`);
  } 
  
  return configs;
}



function readDataFolder(dataPath) {
  if (!dataPath || !existsSync(`${ dataPath }/algod.admin.token`)) return; 
  const nodeConfigsRaw = readFileSync(`${ dataPath }/config.json`, 'utf-8');
  const nodeConfigs = JSON.parse(nodeConfigsRaw);
  const [ host, port ] = nodeConfigs.EndpointAddress.split(':');
  const token = readFileSync(`${ dataPath }/algod.admin.token`, 'utf-8');

  return {
    PUBLIC_ALGOD_HOST: host,
    PUBLIC_ALGOD_PORT: port,
    SECRET_ALGOD_ADMIN_TOKEN: token,
  };
}