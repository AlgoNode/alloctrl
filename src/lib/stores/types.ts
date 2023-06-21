export interface StatusProps {
  lastRound: number|undefined,
  blockTime: number|undefined,
};

export type SetStatusCallback = (set: StatusProps) => void;