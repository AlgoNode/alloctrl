import type { LocaleDictionnary } from "$lib/types";

const strings: LocaleDictionnary =  {
  title: 'Participation Keys',
  loading: 'Getting participation keys...',
  id: 'Key ID',
  
  
  about: 'About',
  account: 'Account',
  validFrom: 'Valid From',
  validUntil: 'Valid Until',
  lastVote: 'Last block voted on',
  lastProposal: 'Last block proposed',

  details: 'Details',
  voteFirstValid: 'First Round',
  voteLastValid: 'Last Round',
  voteKeyDilution: 'Key Dilution',
  selectionParticipationKey: 'Selection Key',
  voteParticipationKey: 'Voting Key',
  stateProofKey: 'State Proof Key',


  // actions
  viewDetails: 'View details',
  newPartKey: 'New Participation Key',
  deletePartKey: 'Delete',
  
  // Status
  expiresSoon: 'Expires Soon!',
  expired: 'Expired',

  online: {
    status: 'Online',
    action: 'Take Online',
    confirmTitle: 'Take key online?',
    confirm: `This will take the participation keys online. The account will start participating in consensus. The participation key can be taken offline anytime.`, 
  },
  offline: {
    status: 'Offline',
    action: 'Take Offline',
    confirmTitle: 'Take key offline?',
    confirm: `This will take the participation keys offline. The account will no longer participate in consensus. The participation key can be brought back online anytime, as long as it is not expired.`, 
  },

  // New Part Key
  new: {
    title: 'Generate a new participation key',
    description: `This tool generates a command you can copy/paste in your terminal 
      to start generating new participation keys. Just tweak the values here to your convenience.`,
    
    code: {
      title: 'Your Command',
      description: `Paste this command in your terminal to generate your participation keys.`,
    },

    address: {
      label: 'Address',
      info: 'Account to associate with the generated partkey',
      other: 'Other address...',
    },

    firstValid: {
      label: 'First Valid Round',
      info: 'The first round for which the generated partkey will be valid',
    },
    lastValid: {
      label: 'Last Valid Round',
      info: 'The last round for which the generated partkey will be valid',
    },
    duration: {
      label: 'Key Duration',
      info: 'Duration (rounds) for which the partkey will be valid'
    },
    dilution: {
      label: 'Key Dilution',
      info: 'Key dilution for two-level participation keys (defaults to sqrt of validity window)',
    },
  }
}

export default strings;