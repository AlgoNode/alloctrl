<script lang="ts">
  import type { FieldError, FieldValue } from '$lib/forms/types';
  import { Styles } from '$lib/enums';
  import BaseField from './BaseField.svelte';
  export let name: string = 'my.field';
  export let value: FieldValue;
  export let label: string|undefined = undefined;
  export let info: string|undefined = undefined;
  export let error: FieldError|undefined = undefined;
  export let icon: string|undefined = undefined;
  export let style: Styles = Styles.PRIMARY;
  export let disabled: boolean = false;
  export let fullWidth: boolean = false;
</script>

<BaseField
  { label }
  { info }
  { name }
  { icon }
  { style }
  { fullWidth }
  { value }
  bind:error
>
  <input
    type="text"
    class="input data-label"
    class:full-width={ fullWidth }
    class:has-icon={ !!icon }
    id={ name }
    bind:value
    on:change
    { name }
    { disabled }
    { ...$$restProps }
  />  
</BaseField>
    




<style lang="scss">
  .input {
    white-space: nowrap;
  }  
</style>
