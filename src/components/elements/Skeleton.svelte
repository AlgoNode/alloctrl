<script lang="ts">
  export let loading:boolean = true;
  export let width: string = '100%';  
  export let height: string = '1em';
</script>


{#if loading}
  <span 
    class="skeleton" 
    style="
      max-width: {width};
      height: {height};
    "
  />
{:else}
  <slot></slot>
{/if}


<style lang="scss">
  .skeleton {
    display: inline-block;
    position: relative;
    height: 1em;
    width: 100%;
    border-radius: var(--radius);
    overflow: hidden;
    & :global + .skeleton {
      margin-top: var(--gap);
    }
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 400%;
      animation: load 1.8s linear infinite;
      background-image: linear-gradient(
        120deg,
        var(--gray-95) 0%, 
        var(--gray-90) 25%,
        var(--gray-95) 50%, 
        var(--gray-90) 75%,
        var(--gray-95) 100%,
      );
      @include dark {
        background-image: linear-gradient(
          120deg,
          var(--gray-10) 0%, 
          var(--gray-15) 25%,
          var(--gray-10) 50%, 
          var(--gray-15) 75%,
          var(--gray-10) 100%,
        );
      }
    }
  }
  @keyframes load {
    from {
      transform: translateX(0%);
    }
    to {
      transform: translateX(-50%);
    }
  }

</style>
