<script lang="ts">
  import Icon from "$components/icons/Icon.svelte";
  import { Styles } from "$lib/enums";
  import type { FieldError, FieldValue } from "$lib/forms/types";
  import Error from "./Error.svelte";
  export let label: string|undefined = undefined;
  export let name: string = 'my.toggle';
  export let icon: string|undefined = undefined;
  export let value: FieldValue;
  export let error: FieldError|undefined = undefined;
  export let disabled: boolean = false;
  export let fullWidth: boolean = false;
  export let style: Styles = Styles.PRIMARY;
  
  $: value, valueChanged();
  function valueChanged () {
    if (error) error = undefined;
  }
</script>



<div 
  class="field text-field { style }" 
  class:full-width={ fullWidth }
  class:disabled={ disabled }  
>
  {#if label }
    <label class="field-label data-label" for={ name }>
      {label}
    </label>
  {/if}

  <div 
    class="input-wrapper" 
    class:has-icon={ icon }
    class:has-error={ !!error }
    class:full-width={ fullWidth }
    class:disabled={ disabled }
  >
    <slot></slot>
    {#if icon}
      <Icon name={icon} />
     {/if}
  </div>

  {#if error}
    <Error {error} />
  {/if}
</div>
  



<style lang="scss">
  .field-label {
    margin-bottom: 0.5em;
    display: block;
  }

  .input-wrapper {
    display: inline-block;
    background: var(--white);
    border: 1px solid var(--border-color);
    border-radius: 0.875rem;

    @include dark {
      background: var(--gray-15);
    }

    &:focus {
      outline: 1px dotted var(--primary);
      outline-offset: 2px;
    }

    &.has-icon {
      display: inline-block;
      position: relative;
      :global .icon {
        color: var(--text-color-light);
        font-size: 0.6125em;
        position: absolute;
        top: 0.925em;
        right: 1em;
      }
    }
   
    &.has-error {
      border-color: var(--red);
    }
    
    &.full-width {
      width: 100%;
    }
  
    &.disabled {
      opacity: 0.8;
    }
  }



  .input-wrapper %input {
    padding: 0.5em 1.5em 0.6em 0.75em; 
    background: none;
    border: none;
    outline: none;
    display: inline-block;
  }
  

  .input-wrapper.full-width {
    width: 100%;
    %input {
      width: 100%;
    }
  }
  .input-wrapper.small %input {
    padding: 3px 0.75em; 
  }


  .input-wrapper :global input,
  .input-wrapper :global textarea,
  .input-wrapper :global select {
    @extend %input;
  }

</style>
