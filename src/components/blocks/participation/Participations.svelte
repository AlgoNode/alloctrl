<script lang="ts">
  import type { ParticipationProps } from "$lib/api/types";
  import { groupBy } from "lodash-es";
  import { onMount } from "svelte";
  import { tinifyAddress } from "$lib/helpers/format";
  import AlgodApi from "$lib/api/algod";
  import Spinner from "$components/elements/Spinner.svelte";
  import PartKey from "./PartKey.svelte";
  import Icon from "$components/icons/Icon.svelte";
  import GlobalEvent from "$components/utils/GlobalEvent.svelte";
  import __ from "$lib/locales";

  let loading: boolean = false;
  let participations: { 
    address: string, 
    partKeys: ParticipationProps[]
  }[] = [];

  onMount(update);
  async function update() {
    if (loading) return;
    loading = true;
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

    participations = Object.entries(groupedKeys)
      .map(([address, partKeys]) => ({ address, partKeys }))
      .sort((a,b) => a.address.localeCompare(b.address));
    
    loading = false;
  }
</script>


<section class="wrapper">
  {#if loading }
    <Spinner /> { __('participation.loading') }
  {/if }
  
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
  callback={ update }
/>


<style lang="scss">
  .wrapper {
    margin-top: 2em;
  }
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
