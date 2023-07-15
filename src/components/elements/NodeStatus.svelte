<script lang="ts">
  import { round } from 'lodash-es';
  import { NodeState } from '$lib/enums';
  import __ from '$lib/locales';
  import status from '$lib/stores/status';
  import Spinner from '$components/elements/Spinner.svelte';
  $: console.log($status)
</script>


<div class="status">
  {#if $status.state === NodeState.LOADING }
    <Spinner />


  {:else if $status.state === NodeState.OFFLINE }
    <span class="info error">
      { __('status.isOffline') } 
    </span>

  {:else if $status.state === NodeState.CATCHING_UP }
    <span class="info error">
      { __('status.isCatchingUp') } 
    </span>

  {:else if $status.state === NodeState.READY }
    {#if $status.version }
      <span class="info">
        { $status.version } 
      </span>
    {/if}
    {#if $status.lastRound }
      <span class="info">
        Block #{ $status.lastRound } 
      </span>
      {#if $status.blockTime }
        <span class="info">
          { round($status.blockTime, 2)}s Block Time 
          ({round($status.averageBlockTime, 2)}s Avg)
        </span>
      {/if}
        
    {:else}
      <Spinner />
    {/if }
    
  {/if}
</div>

<style lang="scss">
  .status {
    font-size: 0.875em;
    font-family: var(--font-condensed);
  }
  .info {
    padding-right: 1em;
    & + .info {
      padding-left: 1em;
      border-left: 1px solid var(--border-color);
    }
  }
</style>
