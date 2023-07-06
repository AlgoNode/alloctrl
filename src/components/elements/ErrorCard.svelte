<script lang="ts">
    import Icon from "$components/icons/Icon.svelte";
  import { ErrorCode } from "$lib/enums";
  import __ from "$lib/locales";
  export let code: ErrorCode|undefined = undefined;
  export let message: string|undefined = undefined; 
    
  const content = message 
    ? message 
      : code 
        ? __(`errors.${ code }`)
        : __(`errors.${ ErrorCode.DEFAULT }`);
</script>

<div class="card error">
  <div class="card-content grid">
    <span class="icon">
      <Icon name="error" />
    </span>
    <p class="text">
      { content }
    </p>
  </div>
</div>

<style lang="scss">
  .card-content {
    grid-template-columns: min-content auto;
  }  
</style>
