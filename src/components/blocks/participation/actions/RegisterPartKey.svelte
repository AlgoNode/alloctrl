<script lang="ts">
  import type { ParticipationProps } from "$lib/api/types";
  import { Styles } from "$lib/enums";
  import { TransactionType } from "algosdk";
  import __ from "$lib/locales";
  import Confirm from "$components/elements/Confirm.svelte";
  import Toggle from "$components/forms/Toggle.svelte";
  import AlgodApi from "$lib/api/algod";

  export let partKey: ParticipationProps;
  export let loading: boolean = false;
  
  const { id, address, key } = partKey;
  let toggleState: boolean = partKey.online || false;

  /**
  * Sync online state 
  * between partkey and local component
  * ==================================================
  */
  $: partKey.online, syncPartKey();
  function syncPartKey() {
    if (toggleState === partKey.online) return; 
    toggleState = partKey.online;
  }

  /**
  * Confirm / Cancel
  * ==================================================
  */
  async function confirmed() {
    if (loading) return;
    loading = true;
    const txn: any = partKey.online ? await takeOffline() : await takeOnline();
    if (txn?.txId) {
      partKey.online = !partKey.online;
      dispatchEvent(new Event('participations.refresh'));
    } 
    loading = false;
  }
  function canceled() {
    toggleState = partKey.online;
  }

  /**
  * Online / Offline transactions
  * ==================================================
  */
  async function takeOnline() {
    const txn = await AlgodApi.private.txn({
      type: TransactionType.keyreg,
      from: address,
      voteFirst: key.voteFirstValid,
      voteLast: key.voteLastValid,
      voteKeyDilution: key.voteKeyDilution,
      selectionKey: key.selectionParticipationKey, 
      voteKey: key.voteParticipationKey,
      stateProofKey: key.stateProofKey,
    });
    return txn;
  }
  async function takeOffline() {
    const txn = await AlgodApi.private.txn({
      type: TransactionType.keyreg,
      from: address,
      voteFirst: null,
      voteLast: null,
      voteKeyDilution: null,
      selectionKey: null, 
      voteKey: null,
      stateProofKey: null,
    });
    return txn
  }


</script>


<Confirm 
  let:confirm 
  on:confirm={ confirmed }
  on:cancel={ canceled }
  title={ partKey.online ? __('participation.offline.confirmTitle') : __('participation.online.confirmTitle') }
  description={ partKey.online ? __('participation.offline.confirm') : __('participation.online.confirm') }
>
  <div class="wrapper" class:disabled={ loading } >
    <Toggle
      name={`togglePartkey.${ id }`}
      isBoolean={ false }
      bind:value={ toggleState }
      on:change={ confirm }
      style={ partKey.online ? Styles.PRIMARY : Styles.GRAY }
      options={[
        {  value: false, label: !partKey.online ? __('participation.offline.status') : __('participation.offline.action') },
        {  value: true, label: partKey.online ? __('participation.online.status') : __('participation.online.action') },
      ]} 
    />
  </div>
</Confirm>

