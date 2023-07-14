import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { existsSync, readFileSync } from 'fs';

function getFirstPathMatched(basePath = process.cwd(), paths = []) {
  let foundPath = undefined;
  for ( let i=0; i < paths.length; i++ ) {
    if (existsSync(`${basePath}/${ paths[i]}`)) {
      foundPath = `${basePath}/${ paths[i]}`;
      break;
    }
  }
  return foundPath;
}


/**
* Check  for env file in possible locations
* ==================================================
*/
export function getEnvPath() {
  return getFirstPathMatched(process.cwd(), [ 'alloctrl.env' ]);
}



/**
* Get the dashboard build directory
* ==================================================
*/
export function getBaseDir() {
  const currentDir = dirname(fileURLToPath(import.meta.url));
  const baseDir = resolve( dirname(currentDir + '/../../..') );
  return baseDir
}


/**
* Check if there's a docker-compose.ymlfile in the given path
* ==================================================
*/
export function getDockerComposePath(path = process.cwd()) {
  if (!path) return;
  return getFirstPathMatched(path, [ 
    'docker-compose.yml',
    '../docker-compose.yml', 
  ]);
}

export function getDockerCompose(path = process.cwd()) {
  const dockerComposePath = getDockerComposePath(path);
  if (!dockerComposePath) return;
  const dockerComposeContent = readFileSync(dockerComposePath, 'utf-8');
  const hasDataVolume = /\s*-\s*(\$\{PWD\}\/data\:\/algod\/data\/\:rw)/gm.test(dockerComposeContent);
  return hasDataVolume ? dockerComposeContent : undefined;
}