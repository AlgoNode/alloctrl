<script lang="ts">
  import type { ParticipationProps } from "$lib/api/types";
  import type { StatusProps } from "$lib/stores/types";
  import type Profile from "$lib/profile/Profile";
  import { Sizes, Styles } from "$lib/enums";
  import { truncateString } from "$lib/helpers/format";
  import { onMount, onDestroy, getContext} from "svelte";
  import { round } from "lodash-es";
  import __ from "$lib/locales";
  import Prop from "$components/elements/Prop.svelte";
  import Tag from "$components/elements/Tag.svelte";
  import status from "$lib/stores/status";
  import DeletePartKey from "./actions/DeletePartKey.svelte";
  import Timestamp from "$components/elements/Timestamp.svelte";
  import RegisterPartKey from "./actions/RegisterPartKey.svelte";
  export let partKey: ParticipationProps;
  const {
    id,
    active,
    address,
    effectiveFirstValid,
    effectiveLastValid,
    online,
  } = partKey;
  let averageBlockTime: number = 3.7;
  let validUntilTime: number;
  let expired: boolean = false;
  

  const profile: Profile = getContext('profile');
  const { wallet } = profile
  
  /**
  * Estimate expiration date
  * ==================================================
  */
  const unsubscribe = status.subscribe(maybeUpdate)
  onMount(update);
  onDestroy(unsubscribe);
  function maybeUpdate(status: StatusProps) {
    if (!status.lastRound) return;
    if (!expired && status.lastRound >= effectiveLastValid) expired = true;
    if ( round(status.averageBlockTime, 2) === averageBlockTime ) return;
    averageBlockTime = round(status.averageBlockTime, 2);
    update();
  }
  async function update() {
    if (!$status.lastRound) return;
    const roundsDiff = (effectiveLastValid - $status.lastRound);
    const timeDiff = Math.round(roundsDiff * ($status.averageBlockTime * 1000));
    validUntilTime = Date.now() + timeDiff;
  }
</script>

<article class="card">
  <header class="card-header">
    <div class="left">
      <h3 class="card-title">
        ID: { truncateString(id) }
      </h3>
      <div class="tags">
        {#if active}
          <Tag 
            label={ __('participation.active') }
            size={ Sizes.TINY } 
          />
        {/if}
        {#if $status.lastRound && $status.lastRound > effectiveLastValid }
          <Tag 
            label={ __('participation.expired') }
            style={ Styles.OUTLINE }
            size={ Sizes.TINY } 
          />
        {/if}
      </div>
    </div>

    <div class="right actions">
      {#if $wallet.addresses?.includes(address) && !expired}
        <RegisterPartKey { partKey } />
      {/if}
      {#if expired || !online }
        <DeletePartKey { partKey }/>
      {/if}
    </div>
    
  </header>
  <div class="card-content">
    <dl class="grid" >
      <Prop 
        label={ __('participation.validFrom') }
        value={ effectiveFirstValid }
      />
      <Prop 
        label={ __('participation.validUntil') }
      >
        <svelte:fragment slot="value">
          #{ effectiveLastValid }
          {#if validUntilTime}
            {#key validUntilTime }
              &emsp;Approx. <Timestamp value={ validUntilTime } />
            {/key}
          {/if}
        </svelte:fragment>
      </Prop>
    </dl>
  </div>
</article>

<style lang="scss">
  .card-header {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
  }
  .card-title,
  .tags {
    vertical-align: middle;
    display: inline-block;
  }
  .grid { 
    display: grid;
    width: 100%;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-auto-flow: column;
    gap: var(--gap);
  }
</style>
