<script lang="ts">
  export let label: string;
  export let value: any|undefined = undefined;
</script>

<div class="prop">
  <dt class="data-label">
    <slot name="label">
      { label }
    </slot>
  </dt>
  <dd class="data-value">
    <slot name="value">
      { value || '—' }
    </slot>
  </dd>
</div>

<style lang="scss">
  .data-label {
    margin-bottom: 0.25em;
  }
</style>
