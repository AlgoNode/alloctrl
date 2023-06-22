<script lang="ts">
  import type { ParticipationProps } from "$lib/api/types";
  import type { StatusProps } from "$lib/stores/types";
  import { Sizes, Styles } from "$lib/enums";
  import { formatTimestamp, truncateString } from "$lib/helpers/format";
  import { onMount, onDestroy} from "svelte";
  import { round } from "lodash-es";
  import __ from "$lib/locales";
  import AlgodApi from "$lib/api/algod";
  import Prop from "$components/elements/Prop.svelte";
  import Tag from "$components/elements/Tag.svelte";
  import status from "$lib/stores/status";
  import DeletePartKey from "./actions/DeletePartKey.svelte";
  export let partKey: ParticipationProps;
  const {
    id,
    active,
    online,
    effectiveFirstValid,
    effectiveLastValid,
  } = partKey;
  let averageBlockTime: number = 3.7;
  let validFromTime: number;
  let validUntilTime: number;
  let validUntilStr: string;
  
  const unsubscribe = status.subscribe(maybeUpdate)
  onMount(update);
  onDestroy(unsubscribe);
  function maybeUpdate(status: StatusProps) {
    if ( round(status.averageBlockTime, 2) === averageBlockTime ) return;
    averageBlockTime = round(status.averageBlockTime, 2);
    update();
  }
  async function update() {
    // const block = await AlgodApi.private.get(`/v2/blocks/${ effectiveFirstValid }`)
    // console.log(block)
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
      {#if !online}
        <DeletePartKey {partKey}/>
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
        value={ `#${ effectiveLastValid } — Approx. ${ validUntilTime ? formatTimestamp(validUntilTime) : '...' }` }
      />
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
