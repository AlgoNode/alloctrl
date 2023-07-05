<script lang="ts">
  import type { ParticipationProps } from "$lib/api/types";
  import Button from "$components/elements/Button.svelte";
  import Popup from "$components/elements/Popup.svelte";
  import { PropType, Sizes, Styles } from "$lib/enums";
  import { truncateString } from "$lib/helpers/format";
  import __ from "$lib/locales";
  import PropsList from "$components/elements/PropsList.svelte";
  export let partKey: ParticipationProps;
</script>



<Popup>
  <svelte:fragment slot="trigger" let:open>
    <Button
      label={ __('participation.viewDetails') }
      on:click={ open }
      size={ Sizes.SMALL }
      style={ Styles.GHOST }
    />
  </svelte:fragment>

  <svelte:fragment slot="content">
    <h3 class="popup-title">
      { __('participation.id') }: { truncateString(partKey.id) }
    </h3>
    <PropsList 
      title={ __('participation.about') }
      props={[
        { 
          label: __('participation.account'),
          value: partKey.address,
          type: PropType.ADDRESS,
        },
        { 
          label: __('participation.validFrom'),
          value: partKey.effectiveFirstValid,
        },
        { 
          label: __('participation.validUntil'),
          value: partKey.effectiveLastValid,
        },
        { 
          label: __('participation.lastVote'),
          value: partKey.lastVote,
          type: PropType.BLOCK,
        },
        { 
          label: __('participation.lastProposal'),
          value: partKey.lastBlockProposal,
          type: PropType.BLOCK,
        },
      ]} 
    />


    <PropsList 
      title={ __('participation.details') }
      props={[
        {
          label: __('participation.voteFirstValid'),
          value: partKey.key.voteFirstValid,
        },
        {
          label: __('participation.voteLastValid'),
          value: partKey.key.voteLastValid,
        },
        {
          label: __('participation.voteKeyDilution'),
          value: partKey.key.voteKeyDilution,
        },
        {
          label: __('participation.selectionParticipationKey'),
          value: partKey.key.selectionParticipationKey,
        },
        {
          label: __('participation.voteParticipationKey'),
          value: partKey.key.voteParticipationKey,
        },
        {
          label: __('participation.stateProofKey'),
          value: partKey.key.stateProofKey,
        },
      ]} 
    />
  </svelte:fragment>
</Popup>



<style lang="scss">
  
</style>
