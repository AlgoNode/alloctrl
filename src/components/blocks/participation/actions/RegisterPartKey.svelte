<script lang="ts">
  import type { ParticipationProps } from "$lib/api/types";
  import { Sizes, Styles } from "$lib/enums";
  import { TransactionType } from "algostack";
  import __ from "$lib/locales";
  import Confirm from "$components/elements/Confirm.svelte";
  import Spinner from "$components/elements/Spinner.svelte";
  import Toggle from "$components/forms/Toggle.svelte";
  import AlgodApi from "$lib/api/algod";

  export let partKey: ParticipationProps;
  export let loading: boolean = false;
  
  const { id, address, key } = partKey;
  let toggleState: boolean = partKey.online || false;
  // $: toggleState = partKey.online;



  function canceled() {
    console.log('canceled');
    toggleState = partKey.online;
  }

  async function confirmed() {
    console.log('confirmed');
    loading = true;
    const txn = partKey.online ? await takeOffline() : await takeOnline();
    partKey.online = !partKey.online;
    toggleState = partKey.online;
    dispatchEvent(new Event('participation.refresh'));
    loading = false;
  }

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

  <Toggle
    name={`togglePartkey.${ id }`}
    isBoolean={ false }
    bind:value={ toggleState }
    on:change={ confirm }
    options={[
      {  value: false, label: !partKey.online ? __('participation.offline.status') : __('participation.offline.action') },
      {  value: true, label: partKey.online ? __('participation.online.status') : __('participation.online.action') },
    ]} 
  />
</Confirm>


<style lang="scss">
  
</style>
