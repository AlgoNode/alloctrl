<script lang="ts">
  import type { ParticipationProps } from "$lib/api/types";
  import type { StatusProps } from "$lib/stores/types";
  import type Profile from "$lib/profile/Profile";
  import { PropType, Sizes, Styles } from "$lib/enums";
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
  import ViewDetails from "./actions/ViewDetails.svelte";
  import Spinner from "$components/elements/Spinner.svelte";
    import { scale } from "svelte/transition";
  export let partKey: ParticipationProps;
  const {
    id,
    address,
    effectiveFirstValid,
    key: {
      voteFirstValid,
      voteLastValid,
    }
  } = partKey;
  let averageBlockTime: number = 3.38; // average block time
  let validUntilTime: number;
  let expired: boolean = false;
  let loading: boolean = false;
  const expireSoonTreshold = Math.round( 7 * 24 * 60 * 60 / averageBlockTime ); 

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
    if (!expired && status.lastRound >= voteLastValid) expired = true;
    if ( round(status.averageBlockTime, 2) === averageBlockTime ) return;
    averageBlockTime = round(status.averageBlockTime, 2);
    update();
  }
  async function update() {
    if (!$status.lastRound) return;
    const roundsDiff = (voteLastValid - $status.lastRound);
    const timeDiff = Math.round(roundsDiff * ($status.averageBlockTime * 1000));
    validUntilTime = Date.now() + timeDiff;
  }
</script>

<article class="card" out:scale|local={{ duration: 480, opacity: 0, start: 0.9 }}>
  <header class="card-header">
    <div class="left">
      <h3 class="card-title">
        { __('participation.id') }: { truncateString(id) }
      </h3>
      <div class="tags">     

        {#if $status.lastRound && $status.lastRound > voteLastValid }
          <Tag 
            label={ __('participation.expired') }
            style={ Styles.OUTLINE }
            size={ Sizes.TINY } 
          />
        {:else if $status.lastRound && voteLastValid - $status.lastRound < expireSoonTreshold  }
          <Tag 
            label={ __('participation.expiresSoon') }
            style={ Styles.PRIMARY }
            size={ Sizes.TINY } 
          />
          
        {/if}

        {#if partKey.online}
          <Tag 
            label={ __('participation.online.status') }
            style={ Styles.GRAY }
            size={ Sizes.TINY } 
          />
        {/if}
      </div>
    </div>

    <div class="right actions">
      {#if loading }
        <Spinner />
      {/if}

      {#if !loading && (expired || !partKey.online) }
        <div class="action">
          <DeletePartKey { partKey } bind:loading/>
        </div>
      {/if}

      {#if $wallet.addresses?.includes(address) && !expired}
        <div class="action register">
          <RegisterPartKey bind:partKey bind:loading />
        </div>
      {/if}
      
    </div>
    
  </header>
  <div class="card-content">
    <dl class="grid" >
      <Prop 
        label={ __('participation.validFrom') }
        value={ voteFirstValid }
        type={ PropType.BLOCK }
      />
      <Prop 
        label={ __('participation.validUntil') }
      >
        <svelte:fragment slot="value">
          #{ voteLastValid }
          {#if validUntilTime}
            {#key validUntilTime }
              &emsp;Approx. <Timestamp value={ validUntilTime } />
            {/key}
          {/if}
        </svelte:fragment>
      </Prop>
      <div class="view-more">
        <ViewDetails {partKey} />
      </div>
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
    grid-template-columns: repeat(2, 1fr);
    gap: var(--gap);
    @include min-width($bp50) {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  .action {
    display: inline-block;
    vertical-align: middle;
    margin-left: 0.5em;
    &.register {
      margin: -0.5em 0 -0.5em 0.5em;
    }
  }
  .view-more {
    @include min-width($bp50) {
      text-align: right;
    }
  }
</style>
