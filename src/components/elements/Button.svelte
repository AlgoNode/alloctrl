<script lang="ts">
  import { Styles, Sizes } from '$lib/enums';
  import ButtonContent from './ButtonContent.svelte';
  export let style: Styles = Styles.PRIMARY;
  export let size: Sizes = Sizes.REGULAR;
  export let label: string|undefined = undefined;
  export let icon: string|undefined = undefined;
  export let classnames: string|undefined = $$restProps.class;
  export let href: string|undefined = undefined;
  export let disabled: boolean = false;
  export let fullWidth: boolean = false;
  delete $$restProps.class
</script>


<!-- Links -->
{#if href }
  <a 
    class="btn { classnames || '' } { style || '' } { size || '' }"
    class:disabled
    class:has-icon={ !!icon }
    class:icon-only={ !!icon && !label }
    class:full-width={ fullWidth }
    {href}
    { ...$$restProps }
  >
    {#if $$slots.default }
      <ButtonContent {icon} {label} ><slot></slot></ButtonContent>
    {:else }
      <ButtonContent {icon} {label} />
    {/if }
  </a>

<!-- Buttons -->
{:else }
  <button 
    class="btn { classnames } { style } { size }"
    class:disabled
    class:has-icon={ !!icon }
    class:icon-only={ !!icon && !label }
    class:full-width={ fullWidth }
    on:click
    { ...$$restProps }
  >
    {#if $$slots.default }
      <ButtonContent {icon} {label} ><slot></slot></ButtonContent>
    {:else }
      <ButtonContent {icon} {label} />
    {/if }
  </button>

{/if }


<style lang="scss">
  .btn {
    display: inline-block;
    font-size: 1rem;
    font-family: var(--font-title);
    line-height: 0;
    white-space: nowrap;
    border-radius: 4em;
    padding: 0.25em 0.75em;
    text-decoration: none;
    &:focus {
      outline: 1px dotted var(--primary);
      outline-offset: 0.125rem;
    }
    :global .icon {
      line-height: 0;
      margin-right: 0.25em;
    }
    :global .text {
      display: inline-block;
      font-size: 0.875em;
      font-weight: bold;
      line-height: 1.8;
      vertical-align: middle;
      min-width: 0.875em;
    }
    &.has-icon :global .text {
      margin-left: 0.25em;
    }

    /**
    * Variants
    * ==================================================
    */
    &.icon-only {
      width: 1.625em;
      height: 1.625em;
      padding: 0.3125em;
      :global .icon {
        font-size: 0.9375em;
        margin-right: 0;
      }
    }
    &.disabled {
      pointer-events: none;
      cursor: default; 
    }
    &.full-width {
      width: 100%;
      text-align: center;
    }

    /**
    * Sizes
    * ==================================================
    */
    &.tiny {
      font-size: 0.75rem;
      padding: 0 0.5em;
      &.icon-only {
        font-size: 0.5em;
        width: 2em;
        height: 2em;
      }
    }
    &.small {
      font-size: 0.875rem;
      padding: 0.125em 0.75em;
      &.icon-only {
        width: 2em;
        height: 2em;
        padding: 0.5em 0.5em;
      }
    }
    &.large {
      padding: 0.5em 1em;
      &.icon-only {
        width: 2em;
        height: 2em;
        padding: 0.5em 0.5em;
      }
    }

    /**
    * Styles
    * ==================================================
    */

    


    &.primary {
      color: var(--text-color-reversed);
      background: var(--primary);
      @include hoverFill(var(--primary-light));
    }

    &.outline {
      background: none;
      border: 1px solid var(--primary);
      color: var(--primary);
      @include hoverFill(var(--primary)) {
        // background: var(--primary);
        color: var(--text-color-reversed);
      };
    }
    &.ghost {
      background: none;
      color: var(--primary);
      border: 1px solid transparent;
      &:hover {
        border: 1px solid var(--primary);
        // color: var(--text-color-reversed);
      }
    }
    &.gray {
      background: none;
      border: 1px solid var(--text-color-light);
      color: var(--text-color-light);
      &:hover {
        color: var(--primary);
        border-color: var(--primary);
      }
    }
    
    &.disabled {
      background: none;
      border: 1px solid var(--gray-60);
      color: var(--gray-60);
    }
    
  }
</style>
