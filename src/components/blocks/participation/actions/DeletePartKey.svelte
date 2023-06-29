<script lang="ts">
  import type { ParticipationProps } from "$lib/api/types";
  import { Sizes, Styles } from "$lib/enums";
  import __ from "$lib/locales";
  import Button from "$components/elements/Button.svelte";
  import Confirm from "$components/elements/Confirm.svelte";
  import AlgodApi from "$lib/api/algod";
  export let partKey: ParticipationProps;
  export let loading: boolean = false;

  async function deletePartKey() {
    if (loading) return;
    loading = true;
    const response = await AlgodApi.private.delete(`/v2/participation/${partKey.id}`);
    dispatchEvent(new Event('participations.refresh'));
    loading = false;
  } 
</script>


<Confirm let:confirm >
  <Button 
    label={ __('participation.deletePartKey') }
    size={ Sizes.TINY }
    style={ Styles.OUTLINE }
    on:click={ () => confirm(deletePartKey) }
  />
</Confirm>

