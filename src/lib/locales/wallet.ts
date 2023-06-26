import type { LocaleDictionnary } from "$lib/types";
import { Connector } from "algostack";

const strings: LocaleDictionnary =  {
  title: 'Connect your Wallet',
  intro: `Get your participation keys online/offline easily by connecting your web or mobile wallet.`,
  connect: 'Connect Wallet',
  connected: 'Connected',
  disconnect: 'Disconnect',
  providers: {
    [Connector.PERA]: 'Pera',
    [Connector.DEFLY]: 'Defly',
  }
}

export default strings;