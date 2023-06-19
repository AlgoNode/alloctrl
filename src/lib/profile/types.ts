import type { Connector } from "algostack";
import type { Writable } from "svelte/store";

export interface Wallet  {
  connector: Connector|undefined,
  addresses: string[]|undefined,
  currentAddress: string|undefined,
  nfds: string[]|undefined,
  holdsPass: boolean,
}

export type WalletStore = Writable<Wallet>;