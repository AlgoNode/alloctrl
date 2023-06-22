<script lang="ts">
  export let label: string;
  export let value: any;
</script>

<div class="prop">
  <dt class="data-label">
    { label }
  </dt>
  <dd class="data-value">
    { value }
  </dd>
</div>

<style lang="scss">
  .data-label {
    margin-bottom: 0.25em;
  }
</style>
