<script lang="ts">
  import NodeStatus from "$components/elements/NodeStatus.svelte";
  import WalletConnect from "$components/elements/WalletConnect.svelte";
</script>



<div class="wrapper">
  <div class="group">
    <NodeStatus />
  </div>
  <div class="group">
    <WalletConnect />
  </div>
</div>



<style lang="scss">
  .wrapper {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
  }
  .group {
    // white-space: nowrap;
    & > * {
      vertical-align: middle;
    }
  }
</style>
