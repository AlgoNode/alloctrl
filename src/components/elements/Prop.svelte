<script lang="ts">
  import type { PropLabel, PropValue } from "$lib/types";
  import { PropType, Sizes } from "$lib/enums";
  import { formatAmount, tinifyAddress } from "$lib/helpers/format";
  import Icon from "$components/icons/Icon.svelte";
  export let label: PropLabel;
  export let value: PropValue = undefined;
  export let type: PropType|undefined = undefined;
  export let size: Sizes = Sizes.REGULAR;
  export let icon: string|undefined = undefined;
</script>

<div class="prop">
  <dt class="data-label">
    <slot name="label">
      { label }
    </slot>
  </dt>
  <dd class="data-value size-{ size }">
    {#if icon}
      <span class="icon">
        <Icon name={ icon } />
      </span>
    {/if}
    <slot name="value">
      {#if value === undefined }
        —
      {:else }
        {#if type === PropType.ADDRESS }
          <a class="text-link" href={ `https://preview.allo.info/account/${ value }` } target="_blank" >
            { tinifyAddress(String(value)) }
          </a>

        {:else if type === PropType.BLOCK }
          <a class="text-link" href={ `https://preview.allo.info/block/${ value }` } target="_blank" >
            #{ value }
          </a>

        {:else if type === PropType.AMOUNT }
          { formatAmount( Number(value) ) }

        {:else }
          { value }

        {/if}
      {/if}
      
    </slot>
  </dd>
</div>

<style lang="scss">
  .data-label {
    margin-bottom: 0.25em;
  }
  .data-value {
    word-break: break-all;
    &.size-large {
      font-size: 1.5em;
      font-weight: bold;
    }
  }
  .icon {
    font-size: 0.875em;
    display: inline-block;
    margin: -0.5em 0.3125em 0 0;
    vertical-align: middle;
  }
</style>
