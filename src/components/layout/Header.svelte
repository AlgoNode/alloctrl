<script lang="ts">
  import Icon from "$components/icons/Icon.svelte";
  import DarkMode from "$components/elements/DarkMode.svelte";  
</script>

<header class="contained container">
  <h1 class="logo">
    <Icon name="logo" />
  </h1>

  <div class="settings">
    <DarkMode />
  </div>
</header>


<style lang="scss">
  .logo {
    font-size: 2em;
  }
  .container {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
  }
</style>
