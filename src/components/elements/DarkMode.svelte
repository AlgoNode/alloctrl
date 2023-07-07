<script lang="ts">
  import type Profile from "$lib/profile/Profile";
  import { Styles, Theme } from "$lib/enums";
  import { getContext } from "svelte";
  import Toggle from "$components/forms/Toggle.svelte";
  const profile: Profile = getContext('profile');
  const { userTheme } = profile;
</script>

<div class="wrapper">
  <Toggle
    name="dark-mode"
    bind:value={ $userTheme }
    options={[
      { value: Theme.LIGHT, icon: 'sun' },
      { value: Theme.AUTO, label: 'Auto' },
      { value: Theme.DARK, icon: 'moon' },
    ]}
    style={ Styles.GRAY }

  />
</div>

<style lang="scss">
  .wrapper {
    display: inline-block;
    vertical-align: middle;
  }  
</style>
