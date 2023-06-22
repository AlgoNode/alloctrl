<script lang="ts">
  import { Styles } from "$lib/enums";
  import { fly, fade } from "svelte/transition";
  import { createEventDispatcher, onMount } from "svelte";
  import Keypress from "$components/utils/Keypress.svelte";
  import ClickAnywhere from "$components/utils/ClickAnywhere.svelte";
  import Button from "./Button.svelte";
  import GlobalEvent from "$components/utils/GlobalEvent.svelte";
  
  export let active: boolean = false;
  export let small: boolean = false;
  export let openOnMount: boolean = false;

  onMount(() => {
    if (openOnMount) open();
  })

  const dispatch = createEventDispatcher();
  function open (e?: Event) {
    if (e) e.preventDefault();
    dispatch('open');
    active = true;
  }
  function close (e?: Event) {
    if (e) e.preventDefault();
    dispatch('close');
    active = false;
  }
  function toggle (e?: Event) {
    if (e) e.preventDefault();
    dispatch(active ? 'close' : 'open');
    active = !active;
  }
</script>


<slot name="trigger" {open} {close} {toggle} ></slot>


{#if active}

  <div class="popup">
    <div 
      class="inner-wrapper container" 
      class:contained={ !small }
      class:contained-small={ small }
    >
      <section 
        class="card" 
        on:click|stopPropagation
        on:keydown={undefined}
        transition:fly|local={{ duration: 360, y: 10 }}
      >
        <div class="close-btn">
          <Button 
            icon="close"
            on:click={close}
            style={Styles.GHOST}
          />
        </div>

        {#if $$slots.header}
          <div class="card-header">
            <slot name="header">...</slot>
          </div>
        {/if}
        
        <!-- padded content -->
        {#if $$slots.content}
          <div class="card-content">
            <slot name="content">...</slot>
          </div>
        {/if}

        <!-- loopable slot -->
        <slot></slot>

      </section>
    </div>
    <div 
      class="overlay"
      transition:fade|local={{ duration: 360 }}
    ></div>
  </div>

  <Keypress callback={close} keycode={'Escape'} />
  <ClickAnywhere callback={close} />
  <GlobalEvent event="close" callback={close} />

{/if}


<style lang="scss">
  .popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    overflow: auto;
    backdrop-filter: blur(2px);
  }
  .inner-wrapper {
    min-height: 100%;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
  }
  .card {
    font-size: 1rem;
    width: 100%;
    position: relative;
    z-index: 1;
    box-shadow: var(--shadow-popup);
    overflow: hidden;
  }
  
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    background: var(--bg-color);
    opacity: 0.5;
  }
  .close-btn {
    position: absolute;
    top: var(--card-padding-y);
    right: var(--card-padding-x);
    margin: -0.5em;
  }
</style>
