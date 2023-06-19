<script lang="ts">
  import list from './list';
  export let name: string|undefined = undefined;
  export let svg: string|undefined = name ? list[name] : undefined; 
  export let src: string|undefined = undefined; 
</script>


{#if svg || src}
  <span class="icon">
    {#if svg}
      {@html svg}
    {:else if src}
      <img src="{src}" alt={name} />
    {/if}
  </span>
{/if}


<style lang="scss">
  .icon {
    display: inline-block;
    line-height: 1;
    vertical-align: middle;
    width: auto;
    height: 1em;
    img,
    :global svg {
      width: auto;
      height: 1em;
    }
    :global svg {
      margin-top: -0.03125em;
      fill: currentColor;
    }
  }
</style>
