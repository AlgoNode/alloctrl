<script lang="ts">
  import { onMount } from "svelte";
  import AlgodApi from "$lib/api/algod";
  import { Method } from "$lib/enums";


  onMount(init);
  async function init() {
    const response = await AlgodApi.private(Method.GET, '/v2/participation');
    console.log(response?.data)
  }

</script>



<div class="container contained">
  <h1 class="page-title"> HELLO! </h1>
</div>





<style lang="scss">
 
</style>
