<script lang="ts">
  import Icon from "$components/icons/Icon.svelte";
  import __ from "$lib/locales";
  export let content: string;
  export let clickable: boolean = true;

  async function copy () {
    try {
      await navigator.clipboard.writeText(content);
      console.log( __('ui.copiedToClipboard') );
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }
</script>


<span
  class="wrapper"
  class:show-icon={ clickable } 
  on:click={ clickable ? copy : undefined } 
  on:keydown
>
  <slot { copy } />
  {#if clickable }
    <span class="icon">
      <Icon name="copy" />
    </span>
  {/if}
</span>


<style lang="scss">
  .wrapper {
    display: inline-block;
    position: relative;
    max-width: 100%;
  }
  .icon {
    font-size: 0.75em;
    color: var(--primary-light);
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
  }
  .show-icon {
    padding-right: 1.25em;
    &:hover .icon {
      color: var(--primary);
    }
  }
</style>
