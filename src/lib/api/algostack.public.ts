import type { PlugableModules, Configs } from 'algostack';
import AlgoStack from 'algostack';
import Client from 'algostack/client';
import Txns from 'algostack/txns';


const globalConfigs: Configs = {}
const modules: PlugableModules = { 
  client: new Client({ namespace: 'ctrl/client' }),
  txns: new Txns(),
};

const algostack = new AlgoStack(globalConfigs, modules);
export default algostack;