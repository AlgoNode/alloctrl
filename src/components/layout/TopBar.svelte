<script lang="ts">
  import DarkMode from "$components/elements/DarkMode.svelte";  
  import NodeStatus from "$components/elements/NodeStatus.svelte";
  
</script>



<div class="wrapper">
  <NodeStatus />
  <DarkMode />
</div>



<style lang="scss">
  .wrapper {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
  }
</style>
