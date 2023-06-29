<script lang="ts">
  import { Styles, Sizes } from "$lib/enums";
  import Icon from "$components/icons/Icon.svelte";
  export let label: string;
  export let style: Styles = Styles.PRIMARY;
  export let size: Sizes = Sizes.REGULAR;
  export let icon: string|undefined = undefined;
</script>


<span class="tag {style} {size}">
  <span class="label">
    {#if icon}
      <Icon name={icon} />
    {/if}
    { label }
  </span>
</span>


<style lang="scss">
  .label {
    font-size: 0.75em;
    letter-spacing: 0.05em;
    font-weight: 500;
    text-transform: uppercase;
    display: block;
  }
  .tag {
    font-size: 1rem;
    display: inline-block;
    border-radius: 3em;
    padding: 0.3125em 0.875em;

    /**
    * SIZES
    * ==================================================
    */
    &.tiny {
      font-size: 0.75rem;
      padding: 0.125em 0.625em 0.25em;
      :global .quote-mark {
        top: 0em;
        right: -0.6125em;
      }
    }
    &.small {
      font-size: 0.8125rem;
      padding: 0.3125em 0.75em 0.4125em;
      :global .quote-mark {
        top: 0;
        right: -0.6125em;
      }
    }

    /**
    * STYLES
    * ==================================================
    */
    &.primary {
      color: var(--text-color-reversed);
      background: var(--primary);
    }
    &.gray {
      color: var(--gray-50);
      background: var(--gray-90);
      @include dark {
        color: var(--gray-80);
        background: var(--gray-30);
      } 
    }
    &.outline {
      color: var(--primary);
      box-shadow: inset 0 0 0 2px  var(--primary);
      &.tiny {
        box-shadow: inset 0 0 0 1px  var(--primary);
      }
    }
  }
</style>
