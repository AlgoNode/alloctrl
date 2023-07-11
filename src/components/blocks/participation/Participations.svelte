<script lang="ts">

  import { ErrorCode } from "$lib/enums";
  import { scale } from "svelte/transition";
  import { tinifyAddress } from "$lib/helpers/format";
  import { participations, updateParticipationKeys } from "$lib/stores/participations";
  import PartKey from "./PartKey.svelte";
  import Icon from "$components/icons/Icon.svelte";
  import Skeleton from "$components/elements/Skeleton.svelte";
  import GlobalEvent from "$components/utils/GlobalEvent.svelte";
  import ErrorCard from "$components/elements/ErrorCard.svelte";
</script>


<GlobalEvent 
  event="participations.refresh" 
  callback={ updateParticipationKeys }
/>

{#await updateParticipationKeys() }
  <Skeleton height="2em" width="66%" />  
  <Skeleton height="8em" />

{:then _ }
  <section>
    <ul class="participants">
      {#each $participations as { address, partKeys } (address)}
        <li class="participant" out:scale|local={{ duration: 480, opacity: 0, start: 0.9 }}>
          <h2 class="block-title">
            <span class="icon">
              <Icon name="user" /> 
            </span>
            { tinifyAddress(address) }
          </h2>
          <ul class="part-keys">
          {#each partKeys as partKey (partKey.id) }
            <li class="part-key">
              <PartKey { partKey } />
            </li>
          {/each}
          </ul>
        </li>
      {/each}
    </ul>
  </section>
  
 

{:catch _}
  <ErrorCard code={ ErrorCode.API_NOT_RESPONDING } />

{/await}



<style lang="scss">
  .participant {
    margin-top: 2em;
    .icon {
      font-size: 0.6125em;
      margin: -0.25em 0.25em 0 0;
      vertical-align: middle;
      display: inline-block;
    }
  }
  .part-key {
    margin-top: 0.5em;
  }
</style>
