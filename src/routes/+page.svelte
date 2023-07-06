<script lang="ts">
  import { PUBLIC_CHECK_VERSION_ON_GITHUB } from "$env/static/public";
  import { envBool } from "$lib/helpers/env";
  import __ from "$lib/locales";
  import VersionCheck from "$components/blocks/dashboard/VersionCheck.svelte";
  import CurrentVersion from "$components/blocks/dashboard/CurrentVersion.svelte";
  import Metrics from "$components/blocks/dashboard/Metrics.svelte";
</script>

<header class="page-header">
  <h1 class="page-title">
    { __('dashboard.title') }
  </h1>
</header>

<div class="grid">
  {#if envBool(PUBLIC_CHECK_VERSION_ON_GITHUB) }
    <VersionCheck />

  {:else}
    <CurrentVersion />
  {/if}
  
  <Metrics />
</div>

