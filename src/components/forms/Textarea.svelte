<script lang="ts">
  import { Styles } from '$lib/enums';
    import type { FieldError, FieldValue } from '$lib/forms/types';
  import BaseField from './BaseField.svelte';
  export let name: string = 'my.toggle';
  export let value: FieldValue;
  export let label: string|undefined = undefined;
  export let error: FieldError|undefined = undefined;
  export let style: Styles = Styles.PRIMARY;
  export let disabled: boolean = false;
</script>


<BaseField
  { label }
  { name }
  { style }
  { value }
  fullWidth
  bind:error
>
  <textarea
    class="input data-label"
    id={name}
    rows={ 3 }
    {name}
    bind:value 
    {disabled}
    {...$$restProps}
  /> 
</BaseField>
    



<style lang="scss">
  textarea {
    text-transform: none;
    line-height: 1.5em;
    resize: vertical;
    width: 100%;
    min-height: 3em;
    overflow: hidden;
    position: relative;
  }
  
</style>
