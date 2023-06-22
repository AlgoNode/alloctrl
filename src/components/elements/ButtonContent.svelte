<script lang="ts">
  import Icon from '$components/icons/Icon.svelte';
  export let label: string|undefined = undefined;
  export let icon: string|undefined = undefined;
</script>


{#if icon}
  <Icon name={ icon } />
{/if}

<slot>
  {#if label}
    <span class="text">
      { label }
    </span>
  {/if}
</slot>

