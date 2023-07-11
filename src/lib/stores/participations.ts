import type { ParticipationProps, ParticipationsProps } from "$lib/api/types";
import type { Account } from "algosdk/dist/types/client/v2/indexer/models/types";
import { groupBy } from "lodash-es";
import { writable, type Writable } from "svelte/store";
import AlgodApi from "$lib/api/algod";


export const participations: Writable<ParticipationsProps> = writable([]);

export async function updateParticipationKeys() {
  const partKeys = await AlgodApi.private.get('/v2/participation') as ParticipationProps[];
  const groupedKeys = groupBy(partKeys, 'address');
  const addresses = Object.keys(groupedKeys);
  const accounts = await Promise.all(addresses.map(address => (
    AlgodApi.private.get(`/v2/accounts/${address}?exclude=all`)) as Promise<Account>                         
  ));
  
  accounts.forEach(account => {
    const { address, status, participation: currentKey } = account;
    const accountPartKeys = groupedKeys[address];
    accountPartKeys
      .sort((a,b) => a.id.localeCompare(b.id))
      .forEach(accountPartKey => {
        const { key } = accountPartKey; 
        accountPartKey.active = key?.voteParticipationKey === String(currentKey?.voteParticipationKey);
        accountPartKey.online = status === 'Online' && accountPartKey.active; 
      });
  });

  participations.set(
     Object.entries(groupedKeys)
      .map(([address, partKeys]) => ({ address, partKeys }))
      .sort((a,b) => a.address.localeCompare(b.address))
  );
}