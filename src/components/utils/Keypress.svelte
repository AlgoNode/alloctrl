<script lang="ts">
  import { onMount } from "svelte";
  import { nextFrame } from "$lib/helpers/ui";
  export let keycode: number|string;
  export let callback: (e: Event) => void;
    
  let mounted: boolean = false;
  onMount(async () => { 
    await nextFrame();
    mounted = true 
  });

  function keyPredded(e: KeyboardEvent) {
    if (!mounted) return;
    if (e.key === keycode) callback(e);
  }
</script>


<svelte:body on:keydown={keyPredded} />
