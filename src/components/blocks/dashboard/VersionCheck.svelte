<script lang="ts">
  import { ErrorCode } from "$lib/enums";
  import __ from "$lib/locales";
  import axios from "axios";
  import Prop from "$components/elements/Prop.svelte";
  import ErrorCard from "$components/elements/ErrorCard.svelte";
  import status, { getCurrentVersion } from "$lib/stores/status";
  import Icon from "$components/icons/Icon.svelte";
  import Skeleton from "$components/elements/Skeleton.svelte";
    import CurrentVersion from "./CurrentVersion.svelte";

  const githubLatestReleaseUrl = 'https://api.github.com/repos/algorand/go-algorand/releases/latest';

  async function init() {
    const [{ data: latestVersion }, currentVersion ] = await Promise.all([
      axios.get(githubLatestReleaseUrl),
      getCurrentVersion,
    ])
    return {
      isLatest: latestVersion.tag_name === currentVersion,
      latest: {
        version: latestVersion.tag_name,
        publishedAt: latestVersion.published_at,
      },
    }
  }

  

</script>



{#await init() }
  <Skeleton height="8em" />


{:then { isLatest, latest } }
  <section class="card">
    <h3 class="card-header card-title">
      {#if isLatest }
        <Icon name="ok" />
        { __('versions.isLatest') }
      {:else }
        <Icon name="warning" />
        { __('versions.newReleaseAvailable') }
      {/if}
    </h3>

    <div class="card-content grid">
      <div class="current">
        <Prop 
          label={ __('versions.current') }
          value={ $status.version }
        />
      </div>
      {#if !isLatest }
        <div class="latest">
          <Prop label={ __('versions.latest') }>
            <svelte:fragment slot="value">
              { latest.version } <br/>
              { __('versions.published') } { new Date(latest.publishedAt).toLocaleDateString() }
            </svelte:fragment>
          </Prop> 
        </div>
      {/if}
    </div>
  </section>


{:catch error }
  {#if error?.config?.url === githubLatestReleaseUrl }
    <ErrorCard code={ ErrorCode.GITHUB_API_LIMIT_EXCEEDED } />
    <CurrentVersion />
  {:else }
    <ErrorCard code={ ErrorCode.API_NOT_RESPONDING } />

  {/if}

{/await}



<style lang="scss">
  .grid {
    grid-template-columns: 1fr 1fr;
  }
  
</style>
