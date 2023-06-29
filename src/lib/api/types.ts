

export interface ParticipationProps {
  id: string
  address: string,
  effectiveFirstValid: number,    
  effectiveLastValid: number,
  lastBlockProposal: number,
  lastStateProof: number,
  lastVote: number,
  key: ParticipationKeyProps,
  active?: boolean,
  online: boolean,
}

export interface ParticipationKeyProps {
  voteFirstValid: number,
  voteLastValid: number,
  voteKeyDilution: number,
  selectionParticipationKey: string,
  voteParticipationKey: string,
  stateProofKey: string,
}