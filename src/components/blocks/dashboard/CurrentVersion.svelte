<script lang="ts">
  import { ErrorCode } from "$lib/enums";
  import __ from "$lib/locales";
  import Prop from "$components/elements/Prop.svelte";
  import ErrorCard from "$components/elements/ErrorCard.svelte";
  import { getCurrentVersion } from "$lib/stores/status";
  import Skeleton from "$components/elements/Skeleton.svelte";
</script>

{#await getCurrentVersion }
  <Skeleton height="8em" />


{:then version }
  <section class="card">
    <h3 class="card-header card-title">
      { __('versions.version') }
    </h3>

    <div class="card-content">
      <div class="current">
        <Prop 
          label={ __('versions.current') }
          value={ version }
        />
      </div>
    </div>
  </section>


{:catch error }
  <ErrorCard code={ ErrorCode.API_NOT_RESPONDING } />

{/await}
