<script lang="ts">
  import { page } from '$app/stores';
 
</script>

<div class="error">

  <h1 class="huge-title">
    {$page.status}
  </h1>
  
  <p class="text">
    {$page.error?.message}
  </p>

</div>
