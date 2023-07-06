<script lang="ts">
  import { PUBLIC_CHECK_VERSION_ON_GITHUB } from "$env/static/public";
  import VersionCheck from "$components/blocks/dashboard/VersionCheck.svelte";
  import __ from "$lib/locales";
    import Metrics from "$components/blocks/dashboard/Metrics.svelte";

</script>

<header class="page-header">
  <h1 class="page-title">
    { __('dashboard.title') }
  </h1>
</header>

<div class="grid">
  {#if PUBLIC_CHECK_VERSION_ON_GITHUB }
    <VersionCheck />
  {/if}
  
  <Metrics />
</div>

