import type { PlugableModules, Configs } from 'algostack';
import { SECRET_ALGOD_ADMIN_TOKEN } from '$env/static/private';
import { PUBLIC_NODE_HOST, PUBLIC_NODE_PORT } from '$env/static/public';
import AlgoStack from 'algostack';
import Txns from 'algostack/txns';


const globalConfigs: Configs = {
  apiPort: Number(PUBLIC_NODE_PORT),
  apiUrl: PUBLIC_NODE_HOST,
  apiToken: SECRET_ALGOD_ADMIN_TOKEN,
}
const modules: PlugableModules = { 
  txns: new Txns(),
};

const algostack = new AlgoStack(globalConfigs, modules);
export default algostack;