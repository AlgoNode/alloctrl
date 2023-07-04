<script lang="ts">
  import type { StatusProps } from "$lib/stores/types";
  import type { Unsubscriber } from "svelte/store";
  import type Profile from "$lib/profile/Profile";
  import { getContext, onMount } from "svelte";
  import __ from "$lib/locales";
  import Button from "$components/elements/Button.svelte";
  import Popup from "$components/elements/Popup.svelte";
  import Text from "$components/forms/Text.svelte";
  import status from "$lib/stores/status";
  import Select from "$components/forms/Select.svelte";
  import CopyToClipboard from "$components/elements/CopyToClipboard.svelte";
  
  const profile: Profile = getContext('profile');
  const { wallet } = profile

  let selectedAddress: string = $wallet.currentAddress || '';
  let address: string = selectedAddress || '';
  let firstValid: number|undefined = $status.lastRound;
  let lastValid: number|undefined = undefined;
  let duration: number = 3_000_000;
  let dilution: number|undefined = undefined;
  let manualDilution: boolean = false;

  let ready: Unsubscriber;
  onMount(() => { ready = status.subscribe(init) })
  function init(status: StatusProps) {
    if (!status.lastRound) return;
    firstValid = status.lastRound;
    firstValidChanged();
    if (ready) ready();
  }

  function selectedAddressChanged() {
    if (selectedAddress === 'other') return;
    address = selectedAddress;
  }
  function firstValidChanged() {
    if (firstValid) 
      lastValid = Number(firstValid) + Number(duration);
    updateDilution();
  }
  function lastValidChanged() {
    if (lastValid && firstValid) 
      duration = Number(lastValid) - Number(firstValid);
    updateDilution();
  }
  function durationChanged() {
    if (firstValid) 
      lastValid = Number(firstValid) + Number(duration);
    updateDilution();
  }
  function updateDilution() {
    if (manualDilution) return;
    dilution = Math.floor( Math.sqrt(duration) );
  }


  let code: string = '';
  $: address, firstValid, lastValid, duration, dilution, updateCode();
  function updateCode() {
    code = `goal account addpartkey \\
  --address=${ address } \\
  --roundFirstValid=${ firstValid } \\
  --roundLastValid=${ lastValid } \\
  --keyDilution=${ dilution }`;
  }
</script>



<Popup small >
  <svelte:fragment slot="trigger" let:open >
    <Button 
      label={ __('participation.newPartKey') }
      on:click={ open }
    />
  </svelte:fragment>

  <svelte:fragment slot="content">
    <h3 class="popup-title">
      { __('participation.new.title') }
    </h3>
    <p class="text">
      { __('participation.new.description') }
    </p>


    <!-- 
    Select an address from the connected wallet
    ----------------------------------------- -->
    {#if $wallet.addresses?.length }
      <div class="field">
        <Select 
          name="selected-address"
          label={ __('participation.new.address.label') }
          info={ __('participation.new.address.info') }
          options={ [
            ...$wallet.addresses
              .map(address => ({ value: address, label: address })),
            { value: 'other', label: __('participation.new.address.other') }
          ]}
          bind:value={ selectedAddress }
          on:change={ selectedAddressChanged }
          fullWidth
        />
      </div>
    {/if}

    <!-- 
    Custom address
    ----------------------------------------- -->
    {#if selectedAddress === 'other' || !$wallet.addresses?.length }
      <div class="field">    
        <Text
          { ...(!$wallet.addresses?.length ? {
            label: __('participation.new.address.label'),
            info: __('participation.new.address.info') 
          } : {})}
          name="address"
          bind:value={ address }
          fullWidth
        />
      </div>
    {/if}

    <div class="field">
      <Text
        name="duration"
        label={ __('participation.new.duration.label') }
        info={ __('participation.new.duration.info') }
        type="number"
        step="1"
        bind:value={ duration }
        on:change={ durationChanged }
        fullWidth
      />
    </div>

    <div class="columns">
      <div class="field">
        <Text
          name="firstValid"
          label={ __('participation.new.firstValid.label') }
          info={ __('participation.new.firstValid.info') }
          type="number"
          step="1"
          bind:value={ firstValid }
          on:change={ firstValidChanged }
          fullWidth
        />
      </div>
      <div class="field">
        <Text
          name="lastValid"
          label={ __('participation.new.lastValid.label') }
          info={ __('participation.new.lastValid.info') }
          type="number"
          step="1"
          bind:value={ lastValid }
          on:change={ lastValidChanged }
          fullWidth
        />
      </div>
    </div>

    <div class="field">
      <Text
        name="dilution"
        label={ __('participation.new.dilution.label') }
        info={ __('participation.new.dilution.info') }
        type="number"
        step="1"
        bind:value={ dilution }
        fullWidth
      />
    </div>


    <div class="command">
      <h4 class="list-title">
          { __('participation.new.code.title') }
      </h4>
      <p class="text">
        { __('participation.new.code.description') }
      </p>
      <div class="command-code">
        <CopyToClipboard 
          content={ code } 
          clickable={ false }
          let:copy
        >
          <pre><code class="code-block">{ code }</code></pre>
          <div class="actions">
            <Button 
              label={ __('ui.copyToClipboard') }
              icon="copy"
              on:click={ copy }
            />
          </div>
        </CopyToClipboard>
      </div>
    </div>

  </svelte:fragment>
</Popup>

<style lang="scss">
  .field {
    margin-top: 1em;
  }
  .columns {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1em;
  }
  .command {
    margin-top: 2em;
    border-top: 1px dashed var(--border-color);
    padding-top: 2em; 
  }
  .command-code {
    margin-top: 1em;
  }
  .actions {
    margin-top: 1em;
    text-align: right;
  }
</style>

