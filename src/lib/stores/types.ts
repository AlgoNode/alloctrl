import type { NodeState } from "$lib/enums";

export interface StatusProps {
  state: NodeState,
  version: string|undefined,
  lastRound: number|undefined,
  lastTimestamp: number|undefined,
  blockTime: number|undefined,
  averageBlockTime: number,
  sampleSize: number,
}

export type SetStatusCallback = (set: StatusProps) => void;