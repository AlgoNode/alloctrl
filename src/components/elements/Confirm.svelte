<script lang="ts">
  import type { MaybePromise } from "@sveltejs/kit";
  import { Sizes, Styles } from "$lib/enums";
  import { createEventDispatcher } from "svelte";
  import __ from "$lib/locales";
  import Popup from "./Popup.svelte";
  import Button from "./Button.svelte";
  export let title: string = __('forms.confirmTitle');
  export let description: string|undefined = __('forms.confirmDescription');
  
  const dispatch = createEventDispatcher();
  let active: boolean = false;
  let callbackFn:  MaybePromise<any>;
  export function confirm (callback: MaybePromise<any>) {
    active = true;
    callbackFn = callback;
  };


  function accept() {
    active = false;
    if (typeof callbackFn === 'function') callbackFn();
    dispatch('confirm');
  }
  function cancel() {
    active = false;
    dispatch('cancel');
  }
  function popupClosed() {
    cancel();
  }
</script>



<slot {confirm}></slot>

<Popup 
  bind:active 
  on:close={ popupClosed }
  size={ Sizes.SMALL } 
>
  <svelte:fragment slot="content">
    <h3 class="popup-title">
      { title }
    </h3>
    {#if description}
      <p class="text">
        { description }
      </p>
    {/if}
    <div class="actions">
      <Button  
        label={ __('forms.cancel') }
        on:click={ cancel }
        style={ Styles.OUTLINE }
      />
      <Button  
        label={ __('forms.confirm') }
        on:click={ accept }
        style={ Styles.PRIMARY }
      />
    </div>
  </svelte:fragment>

</Popup>

<style lang="scss">
  .actions {
    text-align: right;
    margin-top: 1em;
  }
</style>
