<script lang="ts">
  import { ErrorCode, PropType, Sizes } from "$lib/enums";
  import __ from "$lib/locales";
  import ErrorCard from "$components/elements/ErrorCard.svelte";
  import Skeleton from "$components/elements/Skeleton.svelte";
  import AlgodApi from "$lib/api/algod";
  import Prop from "$components/elements/Prop.svelte";

  async function init() {
    const metrics: Record<string, number> = {};
    const response = await AlgodApi.private.get('/metrics') as string;
    response
      .replace(/^#.+/gm, '') // remove comments
      .replace(/\n+/g, '\n') // merge multiple new lines
      .replace(/^\n/g, '') // remove empty new line
      .replace(/{}/g, '') // remove curly braces
      .split('\n')
      .forEach((str: string) => {
        const [key, value] = str.split(' ');
        
        metrics[key] = Number(value);
      });

    return metrics
  }
</script>


{#await init() }
  <Skeleton height="8rem" />

{:then metrics }
  <!-- 
  Outgoing messages
  Tag lexicon can be found here:
  https://github.com/algorand/go-algorand/blob/cece133d93276a96f2aad101ac5e43bd90fefb67/protocol/tags.go#L30
  -->
  <section class="metrics">
    <dl class="grid">
      <div class="card card-content">
        <Prop 
          label={ __('metrics.connectedPeers') }
          value={ metrics.algod_network_peers }
          icon="peers"
          type={ PropType.AMOUNT }
          size={ Sizes.LARGE } 
        />
      </div>

      <div class="card card-content">
        <Prop 
          label={ __('metrics.proposalsSent') }
          value={ metrics.algod_network_message_sent_PP }
          icon="proposal"
          type={ PropType.AMOUNT }
          size={ Sizes.LARGE } 
        />
      </div>

      <div class="card card-content">
        <!-- Divide the number of vote messages by the number of peers to get the actual vote count -->
        <Prop 
          label={ __('metrics.votesSent') }
          value={ Math.ceil(metrics.algod_network_message_sent_AV / metrics.algod_network_outgoing_peers) }
          icon="vote"
          type={ PropType.AMOUNT }
          size={ Sizes.LARGE } 
        />
      </div>
    </dl>
  </section>

{:catch _ }
  <ErrorCard code={ ErrorCode.API_NOT_RESPONDING } />

{/await}



<style lang="scss">
  .grid {
    grid-template-columns: 1fr 1fr 1fr;
  }
</style>
