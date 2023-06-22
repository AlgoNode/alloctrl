<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  export let event: string;
  export let callback: (e: Event) => void;
  
  onMount(() => { 
    if (typeof window === 'undefined') return;
    window.addEventListener(event, callback);
  });

  onDestroy(() => {
    if (typeof window === 'undefined') return;
    window.removeEventListener(event, callback);
  })

  
</script>

