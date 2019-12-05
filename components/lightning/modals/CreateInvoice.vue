<template>
  <Modal class="create-invoice-modal">
    <form @submit.prevent="validate()">
      <div class="columns modal-heading">
        <div class="column">
          <h3>
            Create Invoice
          </h3>
        </div>

        <div class="column modal-description">
          <UnitSwitch />
        </div>
      </div>
      <hr>

      <InputField label="Payment Code" />

      <hr>

      <div class="buttons">
        <ModalClose />

        <button type="submit" class="button is-primary">
          Continue
        </button>
      </div>
    </form>
  </Modal>
</template>

<script>
//  import {satsToBtc} from '@/helpers/units';
//  import API from '@/helpers/api';
//  import Events from '~/helpers/events';

  export default {
    data() {
      return {
        paymentCode: '',
      }
    },

    methods: {
      validate() {
        //
      },
    }
  }
</script>

<style lang="scss">
  @import "~/assets/css/variables.scss";

  .create-invoice-modal {
    //
  }
</style>
