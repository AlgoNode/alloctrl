
<span class="spinner"></span>

<style lang="scss">
  .spinner {
    display: inline-block;
    width: 1em;
    height: 1em;
    vertical-align: middle;
    border-radius: 1em;
    border: 0.125em solid var(--primary);
    border-top-color: transparent;
    animation: spin 2.5s cubic-bezier(.7,.1,.22,.9) infinite;
  }  
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(1800deg);
    }
  }
</style>
