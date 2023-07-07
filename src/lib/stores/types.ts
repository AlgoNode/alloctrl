export interface StatusProps {
  version: string|undefined,
  lastRound: number|undefined,
  lastTimestamp: number|undefined,
  blockTime: number|undefined,
  averageBlockTime: number,
  sampleSize: number,
}

export type SetStatusCallback = (set: StatusProps) => void;