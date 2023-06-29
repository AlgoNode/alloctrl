<script lang="ts">
  import type { PropLabel, PropValue } from "$lib/types";
  import { PropType } from "$lib/enums";
    import { tinifyAddress } from "$lib/helpers/format";
  export let label: PropLabel;
  export let value: PropValue = undefined;
  export let type: PropType|undefined = undefined;
</script>

<div class="prop">
  <dt class="data-label">
    <slot name="label">
      { label }
    </slot>
  </dt>
  <dd class="data-value">
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
  }
</style>
