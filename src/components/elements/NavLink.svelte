<script lang="ts">
  import { Styles } from '$lib/enums';
  import { page } from '$app/stores'
  import Icon from '$components/icons/Icon.svelte';
  export let label: string|undefined = undefined;
  export let href: string;
  export let strict: boolean = true;
  export let active: boolean|null = false;
  export let canonical: string[] = [];
  export let style: Styles = Styles.PRIMARY;
  
  $: checkState($page.url.pathname);

  function checkState(pathname:string) {
    if (active === null) return;
    if (isMatch(href, pathname))
      return active = true;
    if ( canonical.find(href => isMatch( href, pathname) ) ) 
      return active = true
    return active = false;
  }

  function isMatch(href: string, pathname: string) {
    return strict 
        ? pathname === href
        : pathname.startsWith(href);
  }
</script>


<a 
  class="navlink {style}"
  class:active
  href={href} 
  {...$$restProps}
>
  <div class="icon">
    <Icon name="chevronRight" />
  </div>
  <div class="label">
    {#if label}
      { label }
    {/if}
    <slot></slot>
  </div>
</a>


<style lang="scss">
  .navlink {
    --icon-spacer: 1.25em;
    --transition-duration: 180ms;
    color: var(--primary);
    font-size: 0.875em;
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: 0.125em;
    padding: 0.75em var(--icon-spacer) 0.75em 0;
    display: block;
    position: relative;
    &:hover {
      color: var(--primary-light);
    }  
  }
  .icon {
    font-size: 0.75em;
    position: absolute;
    inset: 1.125em auto auto 0;
    opacity: 0;
    transform: translateX(-0.25em);
    transition: opacity var(--transition-duration) ease,
                transform var(--transition-duration) var(--ease);
    .navlink.active &,
    .navlink:hover & {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .label {
    transition: transform var(--transition-duration) var(--ease);
    .navlink.active &,
    .navlink:hover & {
      transform: translateX(var(--icon-spacer));
    }
  }

</style>
