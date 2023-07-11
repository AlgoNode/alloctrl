import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'node:fs';
/**
* Check  for env file in possible locations
* ==================================================
*/
export function getEnvPath() {
  const cwd = process.cwd();
  const envLocations = [ 'alloctrl.env' ];
  let envPath = undefined;
  for ( let i=0; i< envLocations.length; i++ ) {
    if (existsSync(`${cwd}/${ envLocations[i]}`)) {
      envPath = `${cwd}/${ envLocations[i]}`;
      break;
    }
  }
  return envPath;
}



/**
* Get the dashboard buil directory
* ==================================================
*/
export function getBaseDir() {
  const currentDir = dirname(fileURLToPath(import.meta.url));
  const baseDir = resolve( dirname(currentDir + '/../../..') );
  return baseDir
}