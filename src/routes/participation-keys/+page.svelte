<script lang="ts">
  import Participations from "$components/blocks/participation/Participations.svelte";
  import NewPartKey from "$components/blocks/participation/actions/NewPartKey.svelte";
  import __ from "$lib/locales";
</script>

<header>
  <h1 class="page-title">
    { __('participation.title') }
  </h1>
</header>

<!-- <div class="actions">
  <NewPartKey />
</div> -->

<Participations />




<style lang="scss">
  .actions {
    margin-top: 0.5em;
  }
</style>
