<script lang="ts">
  import __ from "$lib/locales";
  export let hasError: boolean = false;
</script>

{#if hasError }
  <div class="wrapper text">
    { __('errors.hasErrors') }
  </div>
{/if}


<style lang="scss">
  .wrapper {
    margin: 1em 0;
    color: var(--red);
    font-style: italic;
  }
</style>
