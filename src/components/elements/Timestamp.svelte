<script lang="ts">
  export let value: number|string;
  export let displayDate: boolean = true;
  export let displayTime: boolean = true;
  const str = typeof value === 'string' || value > 0 
    ? new Date(value).toLocaleString('en-US') 
    : '—';
  const [ date, time ] = str.split(', '); 
</script>

<span class="date">
  {#if value }
    <span class="nowrap">
      {#if displayDate}
        { date } 
      {/if}
    </span>

    {#if displayDate && displayTime}
      <span class="separator" />
    {/if}
    
    <span class="nowrap">
      {#if displayTime}
        { time }
      {/if}
    </span>

  {:else}
    —
  {/if}
</span>


<style lang="scss">
  .nowrap {
    white-space: nowrap;
  }  
</style>
