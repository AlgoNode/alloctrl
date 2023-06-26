import type { PlugableModules, Configs } from 'algostack';
import { browser } from '$app/environment';
import  AlgoStack from 'algostack';
import Client from 'algostack/client';
import Txns from 'algostack/txns';


/**
* CONFIGS
* ==================================================
*/
const globalConfigs: Configs = {
  apiUrl: `https://mainnet-api.algonode.${ browser ? 'cloud' : 'network' }`,
  indexerUrl: `https://mainnet-idx.algonode.${ browser ? 'cloud' : 'network' }`, 
}


/**
* Init
* ==================================================
*/
const modules: PlugableModules = { 
  client: new Client(),
  txns: new Txns(),
};

const algostack = new AlgoStack(globalConfigs, modules);
export default algostack;