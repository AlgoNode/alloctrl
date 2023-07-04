<script lang="ts">
  import type { SelectOption } from './types';
  import type { FieldError, FieldValue } from '$lib/forms/types';
  import { Sizes, Styles } from '$lib/enums';
  import BaseField from './BaseField.svelte';
  export let name: string = 'my.toggle';
  export let value: FieldValue;
  export let label: string|undefined = undefined;
  export let info: string|undefined = undefined;
  export let options: SelectOption[] = [];
  export let error: FieldError|undefined = undefined;
  export let fullWidth: boolean = false;
  export let size: Sizes = Sizes.REGULAR;
  export let style: Styles = Styles.PRIMARY;
</script>

<BaseField
  { label }
  { name }
  { info }
  { style }
  { fullWidth }
  { value }
  bind:error
  icon="select"
>
  <select 
    class="select data-label { size }"
    class:full-width={ fullWidth }
    id={ name } 
    { name } 
    bind:value 
    on:change 
  >
    {#each options as option, i (option.value)}
      <option value={option.value} >
        { option.label || option.value }
      </option>
    {/each}
  </select>
</BaseField>



<style lang="scss">
  $wrapper-padding: 3px;

  .field-label {
    margin-bottom: 0.5em;
    display: block;
  }
  
  .select {
    display: inline-block;
    font-size: 0.75em;
    font-family: var(--font-condensed);
    line-height: 1.125em;
    vertical-align: middle;
    white-space: nowrap;
    position: relative;
    overflow: hidden;
    appearance: none;
    border: none;
    outline: none;
    background: none;
    -webkit-appearance: none;
    -moz-appearance: none;
  }
  
  option {
    font-size: 0.8rem;
    color: var(--text-color);
    background: var(--card-bg);
  }



  /**
   * Styles
   * ==================================================
   */
   .outline {
    .select {
      color: var(--primary);
      background: none;
      border: 1px solid var(--primary);
    }
   } 
</style>
