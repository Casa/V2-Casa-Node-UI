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

      <div class="columns">
        <div class="column is-full">
          <input v-model="amountDisplayed" class="primary-input numeric" @input="updateAmount" @click="updateAmountDisplayed">
        </div>
      </div>

      <div class="columns">
        <div class="column centered centered-vertically">
          <template v-if="inputMode === 'usd'">
            <span class="numeric">{{ amountSats | localized }}</span> sats
          </template>

          <template v-else-if="inputMode === 'sats'">
            <span class="numeric">${{ amountUsd | localized }}</span>
          </template>
        </div>

        <div class="column right">
          <a v-if="inputMode === 'usd'" class="button is-small" @click="setInput('sats')">Switch to Sats</a>
          <a v-else-if="inputMode === 'sats'" class="button is-small" @click="setInput('usd')">Switch to USD</a>
        </div>
      </div>

      <InputField label="Memo (Optional)" />

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
        inputMode: 'usd',
        paymentCode: '',
        amountDisplayed: '$0',
        amountSats: 0,
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
    .modal-content {
      min-width: 50%;
    }

    .unit-switch {
      top: 2em;
      right: 2.1em;
    }

    .primary-input {
      background: none;
      border: none;
      outline: none;
      color: $white;
      font-size: 60px;
      text-align: center;
      margin: 0 auto;
      display: block;
    }

    .input-wrap {
      width: 100%;
    }
  }
</style>
