import type { Wallet } from "./types";


export const emptyWallet: Wallet = {
  connector: undefined,
  addresses: undefined,
  currentAddress: undefined,
  nfds: undefined,
  holdsPass: false,
} 