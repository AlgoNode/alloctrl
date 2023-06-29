import type { LocaleDictionnary } from "$lib/types";

const strings: LocaleDictionnary =  {
  title: 'Participation Keys',
  loading: 'Getting participation keys...',
  active: 'Online',
  expired: 'Expired',
  validFrom: 'Valid from',
  validUntil: 'Valid until',

  // actions
  newPartKey: 'Generate new key',
  deletePartKey: 'Delete',
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
  // new: {
  //   title: 'Generate a new participation key',
  //   description: `This process can take several minutes. The list will update itself when it's done.`,
  //   address: 'Address',
  //   submit: 'Generate'
  // }
}

export default strings;