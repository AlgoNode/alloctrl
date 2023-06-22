<script lang="ts">
  import type { ParticipationProps } from "$lib/api/types";
  import { groupBy } from "lodash-es";
  import { onMount } from "svelte";
  import { tinifyAddress } from "$lib/helpers/format";
  import AlgodApi from "$lib/api/algod";
  import Spinner from "$components/elements/Spinner.svelte";
  import PartKey from "./PartKey.svelte";
    import Icon from "$components/icons/Icon.svelte";

  let loading: boolean = false;
  let participations: { 
    address: string, 
    partKeys: ParticipationProps[]
  }[] = [];

  onMount(init);
  async function init() {
    loading = true;
    const partKeys = await AlgodApi.private.get('/v2/participation') as ParticipationProps[];
    const groupedKeys = groupBy(partKeys, 'address');
    const addresses = Object.keys(groupedKeys);
    const accounts = await Promise.all(addresses.map(address => (
      AlgodApi.private.get(`/v2/accounts/${address}?exclude=all`))
    ));
    accounts.forEach(account => {
      const { address, status, participation: currentKey } = account;
      const accountParticipations = groupedKeys[address];
      accountParticipations.forEach(accountParticipation => {
        const { key } = accountParticipation; 
        accountParticipation.active = key.voteParticipationKey === currentKey.voteParticipationKey;
        accountParticipation.online = status === 'Online' && accountParticipation.active; 
      });
    });

    participations = Object.entries(groupedKeys)
      .map(([address, partKeys]) => ({ address, partKeys }));
    
    loading = false;
  }
</script>


{#if loading }
 <Spinner />

{:else }
  <ul class="participants">
    {#each participations as { address, partKeys } }
      <li class="participant">
        <h2 class="block-title">
          <span class="icon">
            <Icon name="user" /> 
          </span>
          { tinifyAddress(address) }
        </h2>
        <ul class="part-keys">
        {#each partKeys as partKey}
          <li class="part-key">
            <PartKey {partKey} />
          </li>
        {/each}
        </ul>
      </li>
    {/each}
  </ul>

{/if}



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
