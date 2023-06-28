<script lang="ts">
  import type { ParticipationProps } from "$lib/api/types";
  import { Sizes, Styles } from "$lib/enums";
  import __ from "$lib/locales";
  import Confirm from "$components/elements/Confirm.svelte";
  import Spinner from "$components/elements/Spinner.svelte";
  import Toggle from "$components/forms/Toggle.svelte";
  import AlgodApi from "$lib/api/algod";
  import { TransactionType } from "algostack";

  export let partKey: ParticipationProps;
  const { id, address, key } = partKey;
  let { online } = partKey;
  let toggleState: boolean = online || false;
  $: toggleState = online;

  let loading: boolean = false;


  function canceled() {
    console.log('canceled');
    toggleState = online;
  }

  async function confirmed() {
    console.log('confirmed');
    loading = true;
    const txn = await AlgodApi.private.txn({
      type: TransactionType.keyreg,
      from: address,
      ...( !online 
        ? {
          voteFirst: key.voteFirstValid,
          voteLast: key.voteLastValid,
          voteKeyDilution: key.voteKeyDilution,
          selectionKey: key.selectionParticipationKey, 
          voteKey: key.voteParticipationKey,
          stateProofKey: key.stateProofKey,
        } 
        : {
          voteFirst: null,
          voteLast: null,
          voteKeyDilution: null,
          selectionKey: null, 
          voteKey: null,
          stateProofKey: null,
        }
      ),
    });

    if (txn) {
      online = !online;
      console.log(txn)
    }

    // console.log(online)
    dispatchEvent(new Event('participation.refresh'));
    loading = false;
  }
</script>

{#if loading}
  <Spinner />
{:else }
  <Confirm 
    let:confirm 
    on:confirm={ confirmed }
    on:cancel={ canceled }
  >

    <Toggle
      name={`togglePartkey.${ id }`}
      bind:value={ toggleState }
      options={[
        { label: __('participation.offline'), value: false },
        { label: __('participation.online'), value: true },
      ]} 
      on:change={ confirm }
      style={ Styles.OUTLINE }
    />
  </Confirm>

{/if}

