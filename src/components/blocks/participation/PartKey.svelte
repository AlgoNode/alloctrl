<script lang="ts">
  import type { ParticipationProps } from "$lib/api/types";
  import { Sizes, Styles } from "$lib/enums";
  import { formatTimestamp, truncateString } from "$lib/helpers/format";
  import { onMount } from "svelte";
  import __ from "$lib/locales";
  import AlgodApi from "$lib/api/algod";
  import Prop from "$components/elements/Prop.svelte";
  import Tag from "$components/elements/Tag.svelte";
  import status from "$lib/stores/status";
  export let partKey: ParticipationProps;
  const {
    id,
    active,
    online,
    effectiveFirstValid,
    effectiveLastValid,
  } = partKey;
  let validFromTime: number;
  let validUntilTime: number;

  onMount(update);
  $: $status, update()
  async function update() {
    // const block = await AlgodApi.private.get(`/v2/blocks/${ effectiveFirstValid }`)
    // console.log(block)
    if (!$status.lastRound) return;
    const roundsDiff = (effectiveLastValid - $status.lastRound);
    const timeDiff = Math.round(roundsDiff * ($status.averageBlockTime * 1000));
    validUntilTime = Date.now() + timeDiff;
    console.log(validUntilTime)

  }
</script>

<article class="card">
  <header class="card-header">
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
    
  </header>
  <div class="card-content">
    <dl class="grid" >
      <Prop 
        label={ __('participation.validFrom') }
        value={ effectiveFirstValid }
      />
      <Prop 
        label={ __('participation.validUntil') }
        value={ `Round #${ effectiveLastValid } | ${ formatTimestamp(validUntilTime) }` }
      />
    </dl>
  </div>
</article>

<style lang="scss">
  .card-title,
  .tags {
    vertical-align: middle;
    display: inline-block;
  }
  .grid { 
    display: grid;
    width: 100%;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--gap);
  }
</style>
