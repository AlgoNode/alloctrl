import type { PlugableModules, Configs } from 'algostack';
import { env as privateEnv } from '$env/dynamic/private';
import { env as publicEnv } from '$env/dynamic/public';
import AlgoStack from 'algostack';
import Txns from 'algostack/txns';


const globalConfigs: Configs = {
  apiPort: Number(publicEnv.PUBLIC_ALGOD_PORT),
  apiUrl: publicEnv.PUBLIC_ALGOD_HOST,
  apiToken: privateEnv.SECRET_ALGOD_ADMIN_TOKEN,
}
const modules: PlugableModules = { 
  txns: new Txns(),
};

const algostack = new AlgoStack(globalConfigs, modules);
export default algostack;