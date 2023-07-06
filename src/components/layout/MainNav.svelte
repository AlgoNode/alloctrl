<script lang="ts">
  import { version } from '$app/environment';
  import Icon from '$components/icons/Icon.svelte';
  import NavLink from '$components/elements/NavLink.svelte';
  import DarkMode from '$components/elements/DarkMode.svelte';
  import __ from '$lib/locales';
</script>

<header class="wrapper">
  <h1 class="logo">
    <a href="/">
      <Icon name="logo" />
    </a>
    <small class="app-version data-value">
      Version { version }
    </small>
  </h1>

  <nav>
    <ul>
      <li>
        <NavLink 
          label={ __('nav.dashboard') }
          href='/'
        />
      </li>
      <li>
        <NavLink 
          label={ __('nav.participationKeys') }
          href='/participation-keys'
        />
      </li>
      <li>
        <div class="theme">
          <DarkMode />
        </div>
      </li>
    </ul>
  </nav>

  <nav>
  </nav>
</header>


<style lang="scss">
  .logo {
    font-size: 2em;
    a {
      color: inherit;
      transition: color 90ms ease;
      &:hover {
        color: var(--primary-light);
      }
    }
  }

  .app-version {
    display:  block;
    font-size: 0.75rem;
    margin-top: 0.5em;
  }
  
  nav {
    margin-top: 1.75em;
  }
  .theme {
    margin-top: 1.5em;
  }
</style>
