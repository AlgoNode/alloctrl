<script lang="ts">
  import type Profile from "$lib/profile";
  import { Connector } from "algostack";
  import { Sizes, Styles } from "$lib/enums";
  import { tinifyAddress } from "$lib/helpers/format";
  import { getContext } from "svelte";
  import { upperFirst } from "lodash-es";
  import __ from "$lib/locales";
  import Button from "$components/elements/Button.svelte";
  import Popup from "./Popup.svelte";
  import Icon from "$components/icons/Icon.svelte";

  interface Wallet { slug: Connector, icon: string }
  const wallets: Wallet[] = [
    { slug: Connector.PERA, icon: 'pera' },
    { slug: Connector.DEFLY, icon: 'defly' },
  ];
  const profile: Profile = getContext('profile');
  const { wallet } = profile

  function disconnect() {
    profile.disconnect.call(profile);
  }

</script>


<Popup small>
  <svelte:fragment slot="trigger" let:open >
    <Button 
      label={  $wallet.addresses?.length
        ? `${__('wallet.connectedWith')} ${ upperFirst($wallet.connector) }`
        : __('wallet.connect') 
      }
      on:click={ open }
    />
  </svelte:fragment>



  <svelte:fragment slot="content">
    <!-- 
    CONNECT YOUR WALLET
    --------------------------------------- -->
    {#if !$wallet.addresses?.length }
      <div class="connect-wallet">
        <h2 class="title popup-title">
          { __('wallet.title') }
        </h2>
    
        <p class="text">
          { __('wallet.intro') }
        </p>
    
        <ul class="options providers">
          {#each wallets as wallet}
            <li class="provider">
              <Button 
                icon={ wallet.icon }
                label={ __(`wallet.providers.${ wallet.slug }`) }
                size={ Sizes.LARGE } 
                style={ Styles.OUTLINE }
                fullWidth
                on:click={ () => profile.connect.call(profile, wallet.slug) }
              />
            </li>
          {/each}
        </ul>
      </div>

    
    <!-- 
    SELECT AN ACCOUNT
    --------------------------------------- -->
    {:else if $wallet.addresses.length }
      <div class="select-account">
        <h3 class="title popup-title">
          { __('wallet.connected')} 
        </h3>
      
        <ul class="addresses">
          {#each $wallet.addresses as address}
            <li class="address">
              <span class="icon">
                <Icon name="user" />
              </span>
              { tinifyAddress( address, 8 ) }
            </li>
          {/each}
        </ul>

        <div class="action" >
          <Button 
            label={ __('wallet.disconnect') }
            on:click={ disconnect }
            size={ Sizes.SMALL }
            style={ Styles.OUTLINE }
          />
        </div>
      </div>
    {/if}

  </svelte:fragment>
</Popup>




<style lang="scss">
  .options {
    margin-top: 1.5em;
  }
  .action {
    margin-top: 1em;
    text-align: right;
  }
  .provider {
    margin-top: 0.25em;
  }
  .address {
    padding: 0.75em 0;
    border-top: 1px solid var(--border-color-secondary);
    &:first-child {
      border: none;
    }
    .icon {
      font-size: 0.75em;
      display: inline-block;
      vertical-align: middle;
      margin: -0.125em 0.5em 0 0;
    }
  }
</style>