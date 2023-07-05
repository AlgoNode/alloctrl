<script lang="ts">
  import { ErrorCode } from "$lib/enums";
  import type { FieldError } from "$lib/forms/types";
  import __ from "$lib/locales";
  export let error: FieldError;
  const message = error.message 
    ? error.message
    : error.code 
      ? __(`errors.${ error.code }`)
      : __(`errors.${ ErrorCode.DEFAULT }`);
</script>


<div class="text error">
  { message }
</div>


<style lang="scss">
  .error {
    color: var(--red);
    font-style: italic;
  }
</style>
