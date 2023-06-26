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

  // New Part Key
  new: {
    title: 'Generate a new participation key',
    description: `This process can take several minutes. The list will update itself when it's done.`,
    address: 'Address',
    submit: 'Generate'
  }
}

export default strings;