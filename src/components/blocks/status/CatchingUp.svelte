<script lang="ts">
  import __ from "$lib/locales";
  import { env } from "$env/dynamic/public";
  import { round } from "lodash-es";
  import { onDestroy, onMount } from "svelte";
  import { writable } from 'svelte/store';
  import { formatAmount } from "$lib/helpers/format";
  import { parseMetricsResponse } from "$lib/helpers/responses";
  import AlgodApi from "$lib/api/algod";
  import axios from "axios";
  import Icon from "$components/icons/Icon.svelte";
  
  let localInterval: NodeJS.Timeout;
  let remoteInterval: NodeJS.Timeout;

  const catchup = writable({
    currentRound: 0,
    totalRounds: 0,
  });
  
  onDestroy(destroy);
  function destroy() {
    if (localInterval) clearTimeout(localInterval);
    if (remoteInterval) clearTimeout(remoteInterval);
  }
  
  onMount(init);
  function init() {
    getLocalSyncedCount();
    if (env.PUBLIC_ALLOW_EXTERNAL_APIS) getRemoteBlockCount();
  }
  
  /**
  * Get local sync count
  * Runs every 2 seconds
  * ==================================================
  */
  async function getLocalSyncedCount() {
    if (localInterval) clearTimeout(localInterval);
    try {
      const response = await AlgodApi.private.get('/metrics') as string;
      const metrics = parseMetricsResponse(response);
      catchup.update($catchup => ({
        ...$catchup,
        currentRound: metrics.algod_ledger_round,
      }))
    }
    catch {}
    localInterval = setTimeout(getLocalSyncedCount, 2000);
  }

  /**
  * Get the blockchain latest block from Algonode
  * Runs every 30 seconds 
  * ==================================================
  */
  async function getRemoteBlockCount() {
    if (remoteInterval) clearTimeout(remoteInterval);
    try {
      const { data: status } = await axios.get('https://mainnet-api.algonode.cloud/v2/status');
      catchup.update($catchup => ({
        ...$catchup,
        totalRounds: status['last-round'],
      }))
    }
    catch {}
    remoteInterval = setTimeout(getRemoteBlockCount, 30000);
  }
</script>




<section class="card">
  <h2 class="card-title card-header">
    <Icon name="sync" />
    { __('status.catchingUp') }
  </h2>

  <div class="card-content">
    {#if env.PUBLIC_ALLOW_EXTERNAL_APIS }
      <div class="progress">
        <div 
          class="bar" 
          style:width={(
          $catchup.currentRound
            ? round($catchup.currentRound / $catchup.totalRounds * 100, 2)
            : 0
          ) + '%' } 
        />
      </div>

      <div class="status data-value">
        { __('status.synced') } { formatAmount($catchup.currentRound) } 
        / { formatAmount($catchup.totalRounds) } { __('status.totalBlocks') }
      </div>

    {:else }
      <div class="status data-value">
        { __('status.synced') } { formatAmount($catchup.currentRound) } { __('status.blocks') }
      </div>

    {/if}
  </div>
</section>



<style lang="scss">
  .progress {
    height: 2em;
    border-radius: var(--radius);
    border: 1px solid var(--border-color);
    padding: 3px;
    .bar {
      height: 100%;
      background: var(--primary);
      border-radius: var(--inner-radius);
      transition: width 1s var(--ease);
      min-width: 10px
    }
  }
  .status {
    margin-top: 1em;
  }
</style>
