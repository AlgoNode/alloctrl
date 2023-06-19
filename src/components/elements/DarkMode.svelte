<script lang="ts">
  import type Profile from "$lib/profile/Profile";
  import { Styles, Theme } from "$lib/enums";
  import { getContext } from "svelte";
  import Toggle from "$components/forms/Toggle.svelte";
  const profile: Profile = getContext('profile');
  const { userTheme } = profile;
</script>
<Toggle
  name="dark-mode"
  style={Styles.GRAY}
  bind:value={ $userTheme }
  options={[
    { value: Theme.LIGHT, icon: 'sun' },
    { value: Theme.AUTO, label: 'Auto' },
    { value: Theme.DARK, icon: 'moon' },
  ]}
/>