<script lang="ts">
  import type { ToggleOption } from './types';
  import { Sizes, Styles } from '$lib/enums';
  import { onMount, tick, createEventDispatcher } from 'svelte';
  import Icon from '$components/icons/Icon.svelte';
    import Error from './Error.svelte';
  export let name: string = 'my.toggle';
  export let value: boolean|number|string|undefined;  
  export let label: string|undefined = undefined;
  export let icon: string|undefined = undefined;
  export let isBoolean: boolean = false;
  export let booleanLabelInside: boolean = true;
  export let error: FieldError|undefined = undefined;
  export let fullWidth: boolean = false;
  export let style: Styles = Styles.PRIMARY;
  export let options: ToggleOption[] = [
    { label: 'On', value: true },
    { label: 'Off', value: false },
  ];
  
  const dispatch = createEventDispatcher();
  const clickableWrapper: boolean = options.length === 2;

  /**
   * Boolean toggles
   * Click anywhere to switch state
   * ==================================================
   */
  function switchState(e: Event) {
    e.preventDefault();
    const currentIndex = options.findIndex(option => option.value === value);
    const nextIndex = (currentIndex + 1) % options.length;
    value = options[nextIndex].value;
    dispatch('change', { ...e, value });
  }

  /**
   * Transitions
   * ==================================================
   */
  const labelElements: HTMLElement[] = [];
  let activeElement: HTMLElement;
  let wrapperWidth: number;
  let wrapperHeight: number;

  onMount(setActiveEl);
  $: value, setActiveEl();
  $: wrapperWidth, setActiveEl();
  $: wrapperHeight, setActiveEl();

  async function setActiveEl() {
    await tick();
    const activeEl = labelElements.find(el => el?.classList.contains('active'))
    if(!activeEl || !activeElement) return;
    activeElement.style.left = `${activeEl.offsetLeft}px`;
    activeElement.style.width = `${activeEl.offsetWidth}px`;
  }
</script>


<div 
  class="toggle field toggle-field {style}"
  bind:offsetWidth={wrapperWidth}
  bind:offsetHeight={wrapperHeight}
>
  {#if label && !(isBoolean && booleanLabelInside)}
  <label class="field-label data-label" for={name}>
    {label}
  </label>
  {/if}
  
  <ul 
    class="options"
    class:full-width={fullWidth && !isBoolean}
    class:active={isBoolean && value === true}
    class:boolean-toggle={isBoolean}
    class:clickable={clickableWrapper}
    class:icons-only={ options.every(option => option.icon && !option.label) }
    on:click={clickableWrapper ? switchState : undefined}
    on:keydown
  >

    <!--  
    Boolean toggles
    ======================================
    -->
    {#if isBoolean}

      <li>
        <input 
          {name}
          type="radio" 
          class:active={value === false}
          id={`${name}:false`} 
          value={false}
          bind:group={value}
          on:change
        />
        <label
          class="option"
          class:icon-only={!!icon}
          class:active={value === false}
          class:hidden={value !== false && booleanLabelInside}
          for={`${name}:false`}
          bind:this={labelElements[0]}
        >
          {#if (value === false)}
            {#if icon}
              <Icon name={icon} />
            {:else}
              <span class="text">Off</span>
            {/if}
          {:else}
            <span class="spacer"></span>
          {/if}
        </label>
      </li>

      {#if booleanLabelInside}
        <li>
          <span class="option fake-option">
            {#if label}
              { label }
            {:else }
              <span class="spacer"></span>
            {/if }
          </span>
        </li>
      {/if}

      <li>
        <input 
          {name}
          type="radio" 
          class:active={value === true}
          id={`${name}:true`} 
          value={true}
          bind:group={value}
          on:change
        />
        <label
          class="option"
          class:icon-only={!!icon}
          class:active={value === true}
          class:hidden={value !== true && booleanLabelInside}
          for={`${name}:true`}
          bind:this={labelElements[1]}
        >
          {#if (value === true)}
            {#if icon}
              <Icon name={icon} />
            {:else}
              <span class="text">On</span>
            {/if}
          {:else}
            <span class="spacer"></span>
          {/if}
        </label>
      </li>

    <!--  
    Multi-label toggles
    ======================================
    -->
    {:else}
      {#each options as option, i (option.value)}
        <li>
          <input 
            {name}
            type="radio" 
            class:active={value === option.value}
            id={`${name}:${String(option.value)}`} 
            value={option.value}
            bind:group={value}
            on:change
          />
          <label
            class="option"
            class:active={value === option.value}
            class:icon-only={option.label === undefined}
            for={`${name}:${String(option.value)}`}
            bind:this={labelElements[i]}
          >
            {#if option.icon}
              <Icon name={option.icon} />
            {/if}
            
            {#if option.label}
              <span class="option-text text">
                {option.label}
              </span>
            {/if}
          </label>
        </li>
      {/each}

    {/if}
    
    <div class="active-state" bind:this={activeElement} />
  </ul>

  {#if error}
    <Error {error} />
  {/if}
</div>



<style lang="scss">
  $wrapper-padding: 2px;
  input {
    display: none;
  }
  ul, li {
    display: inline-block;
  }
  li {
    line-height: 1em;
  }

  .field-label {
    margin-bottom: 0.5em;
    display: block;
  }

  .options {
    padding: $wrapper-padding;
    background: var(--white);
    border: 1px solid var(--border-color);
    border-radius: 10rem;
    white-space: nowrap;
    position: relative;
    overflow: hidden;
    @include dark {
      background: var(--gray-15);
    }
    &.clickable {
      cursor: pointer;
    }
  }
  
  .option {
    color: var(--primary-light);
    font-size: 0.875em;
    font-family: var(--font-condensed);
    white-space: normal;
    display: inline-block;
    vertical-align: middle;
    padding: 0.25em 0.75em;
    position: relative;
    z-index: 1;
    cursor: pointer;
    &.hidden {
      display: none;
    }
    &.active {
      color: var(--primary-reversed);
    }
    // icon only
    &.icon-only {
      font-size: 1.125em;
      height: auto;
      width: 1.5em;
      line-height: 0.5;
      padding: 0;
      text-align: center;
      .icons-only & {
        width: 1.125em;
        height: 1em;
        line-height: 0.75;
      }
      :global(.icon) {
        font-size: 0.625em;
      }
    }
    // label
    &.fake-option {
     padding: 0 0.25em;
    }
  }

  .option-text {
    margin: -0.25em 0 0.125em;
    display: inline-block;
  }

  // active element
  .active-state {
    position: absolute;
    top: $wrapper-padding; 
    bottom: $wrapper-padding;
    z-index: 0;
    background: var(--primary);
    border-radius: 10rem;
    box-shadow: var(--shadow);
    transition: left 200ms var(--swing),
                width 200ms var(--swing),
                background-color 120ms ease;
  }

  /**
   * Boolean toggle
   * ==================================================
   */
  .boolean-toggle {
    transition: background-color 120ms ease,
                border-color 120ms ease;
    &.active {
      background: var(--primary);
      border-color: var(--blue-border);
      .fake-option {
        color: var(--primary-reversed);
      }
      .option.active {
        color: var(--primary);
      }
      .active-state {
        background: var(--primary-reversed);
      }
    }
    .spacer {
      width: 1em;
      display: inline-block;
    }
  }

  /**
  * Full width
  * ==================================================
  */
  .full-width {
    display: flex;
    flex-flow: row nowrap;
    li {
      flex-grow: 2;
    }
    .option {
      width: 100%;
      text-align: center;
    }
  }

</style>
