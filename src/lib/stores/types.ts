export interface StatusProps {
  lastRound: number|undefined,
  blockTime: number|undefined,
  averageBlockTime: number,
};

export type SetStatusCallback = (set: StatusProps) => void;