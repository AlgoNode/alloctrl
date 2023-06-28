

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
  selectionParticipationKey: string,
  stateProofKey: string,
  voteFirstValid: number,
  voteKeyDilution: number,
  voteLastValid: number,
  voteParticipationKey: string,
}