<script lang="ts">
  import type { ParticipationProps } from "$lib/api/types";
  import { groupBy } from "lodash-es";
  import { tinifyAddress } from "$lib/helpers/format";
  import AlgodApi from "$lib/api/algod";
  import PartKey from "./PartKey.svelte";
  import Icon from "$components/icons/Icon.svelte";
  import GlobalEvent from "$components/utils/GlobalEvent.svelte";
  import __ from "$lib/locales";
  import Skeleton from "$components/elements/Skeleton.svelte";
  import ErrorCard from "$components/elements/ErrorCard.svelte";
  import { ErrorCode } from "$lib/enums";

 
  async function getParticipationKeys() {
    const partKeys = await AlgodApi.private.get('/v2/participation') as ParticipationProps[];
    const groupedKeys = groupBy(partKeys, 'address');
    const addresses = Object.keys(groupedKeys);
    const accounts = await Promise.all(addresses.map(address => (
      AlgodApi.private.get(`/v2/accounts/${address}?exclude=all`))
    ));
    
    accounts.forEach(account => {
      const { address, status, participation: currentKey } = account;
      const accountPartKeys = groupedKeys[address];
      accountPartKeys
        .sort((a,b) => a.id.localeCompare(b.id))
        .forEach(accountPartKey => {
          const { key } = accountPartKey; 
          accountPartKey.active = key?.voteParticipationKey === currentKey?.voteParticipationKey;
          accountPartKey.online = status === 'Online' && accountPartKey.active; 
        });
    });

    const participations = Object.entries(groupedKeys)
      .map(([address, partKeys]) => ({ address, partKeys }))
      .sort((a,b) => a.address.localeCompare(b.address));
    

    return participations;
  }
</script>



{#await getParticipationKeys() }
  <Skeleton height="2em" width="66%" />  
  <Skeleton height="8em" />

{:then participations }
  <section>
    <ul class="participants">
      {#each participations as { address, partKeys } (address)}
        <li class="participant">
          <h2 class="block-title">
            <span class="icon">
              <Icon name="user" /> 
            </span>
            { tinifyAddress(address) }
          </h2>
          <ul class="part-keys">
          {#each partKeys as partKey (partKey.id) }
            <li class="part-key">
              <PartKey { partKey } />
            </li>
          {/each}
          </ul>
        </li>
      {/each}
    </ul>
  </section>
  
  <GlobalEvent 
    event="participations.refresh" 
    callback={ getParticipationKeys }
  />

{:catch _}
  <ErrorCard code={ ErrorCode.API_NOT_RESPONDING } />

{/await}



<style lang="scss">
  .participant {
    margin-top: 2em;
    .icon {
      font-size: 0.6125em;
      margin: -0.25em 0.25em 0 0;
      vertical-align: middle;
      display: inline-block;
    }
  }
  .part-key {
    margin-top: 0.5em;
  }
</style>
