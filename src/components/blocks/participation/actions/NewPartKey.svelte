<script lang="ts">
  import __ from "$lib/locales";
  import { FieldType } from "$lib/forms/enums";
  import Button from "$components/elements/Button.svelte";
  import Popup from "$components/elements/Popup.svelte";
  import Form from "$lib/forms/Form";
  import Text from "$components/forms/Text.svelte";
  import Spinner from "$components/elements/Spinner.svelte";
  import AlgodApi from "$lib/api/algod";
  
  let loading:boolean = false;
  let generating: string|undefined;
  const form = new Form({
    address: {
      type: FieldType.ADDRESS,
      required: true,
    }
  })

  /**
  * Submit form
  * ==================================================
  */
  const { data,  errors } = form;
  async function submit() {
    const isValid = form.validate();
    if (!isValid) return;
    loading = true;
    try {
      const response = await AlgodApi.private.post('/v2/participation', $data.address)
      console.log(response)
      form.reset();
      loading = false;
    }
    catch (e: any) {
      loading = false;
    
    }
  } 

</script>

<Popup small>
  <svelte:fragment slot="trigger" let:open >
    <Button 
      label={ __('participation.newPartKey') }
      on:click={ open }
    />
  </svelte:fragment>

  <svelte:fragment slot="content">
    <h3 class="block-title">
      { __('participation.new.title') }
    </h3>
    <p class="text">
      { __('participation.new.description') }
    </p>

    <form on:submit|preventDefault|stopPropagation={ submit }>
      <!-- Title -->
      <div class="field">
        <Text
          label={ __('participation.new.address') }
          name="address"
          fullWidth
          bind:value={ $data.address }
          bind:error={ $errors.address }
        />
      </div>
    
      <!-- Submit -->
      <div class="submit">
        {#if loading}
          <Spinner />
        {/if}
        <Button
          type="submit"
          label={ __('participation.new.submit') }
          disabled={ loading }
        />
      </div>
    </form>

  </svelte:fragment>
</Popup>

<style lang="scss">
  .field {
    margin-top: 1em;
  }
  .submit {
    margin-top: 1em;
    text-align: right;
  }
</style>
