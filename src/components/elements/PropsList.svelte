<script lang="ts">
  import type { PropsList } from "$lib/types";
  import Prop from "./Prop.svelte";
  export let title: string|undefined = undefined;
  export let props: PropsList = [];
</script>

{#if props.length }
  {#if title }
    <h4 class="list-title">
      { title }
    </h4>
  {/if}
  <dl class="list">
    {#each props as prop }
      <Prop { ...prop } />
    {/each }
  </dl>
{/if }

<style lang="scss">
  .list-title {
    margin: 1.5em 0 0.5em;
  }
  .list :global .prop {
    padding: 0.5em 0;
    border-top: 1px solid var(--border-color-secondary);
  }
  .list-title + .list :global .prop:first-child {
    border-color: var(--primary);
  }
</style>
