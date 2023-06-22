<script lang="ts">
  import Icon from '$components/icons/Icon.svelte';
  import NavLink from '$components/elements/NavLink.svelte';
    import __ from '$lib/locales';
</script>

<header class="wrapper">
  <h1 class="logo">
    <a href="/">
      <Icon name="logo" />
    </a>
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
          label={ __('nav.stats') }
          href='/stats'
        />
      </li>
      <li>
        <NavLink 
          label={ __('nav.participationKeys') }
          href='/participation-keys'
        />
      </li>
    </ul>
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
  
  nav {
    margin-top: 1.75em;
  }
</style>
