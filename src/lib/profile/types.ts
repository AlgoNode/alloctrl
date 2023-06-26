import type { Connector } from "algostack";
import type { Writable } from "svelte/store";

export interface Wallet  {
  connector: Connector|undefined,
  addresses: string[]|undefined,
  currentAddress: string|undefined,
}

export type WalletStore = Writable<Wallet>;