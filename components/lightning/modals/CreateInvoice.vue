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
        <div class="column is-offset-one-third centered centered-vertically">
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
  import {satsToBtc, btcToSats, toPrecision} from '@/helpers/units';
//  import API from '@/helpers/api';
//  import Events from '~/helpers/events';

  export default {
    data() {
      return {
        inputMode: 'usd',
        paymentCode: '',
        amountDisplayed: '$0',
        amountSats: 0,
        amountBtc: 0,
      }
    },

    methods: {
      // Automatically clear the input field unless the user has already entered a value
      updateAmountDisplayed() {
        if(this.inputMode === 'usd') {
          if(this.amountUsd) {
            this.amountDisplayed = '$' + this.amountUsd;
          } else {
            this.amountDisplayed = '$';
          }
        } else if(this.inputMode === 'sats') {
          if(this.amountSats) {
            this.amountDisplayed = this.amountSats;
         } else {
            this.amountDisplayed = '';
          }
        }
      },

      // Update the amount displayed and the amount saved in local memory
      updateAmount(event) {
        if(this.inputMode === 'usd') {
          let value = event.target.value.replace(/[^0-9.]/g, '');

          // Force the dollar amount to only have two decimals when it gets too long
          if(value.match(/\.[0-9]{3,}/)) {
            // toPrecision() truncates trailing zeroes, using toFixed fixes that
            value = parseFloat(toPrecision(value, 2)).toFixed(2);
          }

          this.amountUsd = value;
          this.amountBtc = value / this.$store.state.bitcoin.price;
          this.amountSats = Math.round(btcToSats(this.amountBtc));
        } else if(this.inputMode === 'sats') {
          let value = parseInt(event.target.value) || 0;

          this.amountSats = value;
          this.amountBtc = satsToBtc(value);
          this.amountUsd = parseFloat(this.amountBtc * this.$store.state.bitcoin.price).toFixed(2);
        }

        this.updateAmountDisplayed();
      },

      setInput(mode) {
        this.inputMode = mode;

        if(mode === 'usd') {
          this.amountDisplayed = '$' + this.amountUsd;
        } else if(mode === 'sats') {
          this.amountDisplayed = this.amountSats;
        } else if(mode === 'btc') {
          // Todo - Requires btc / sats switch button integrated with the vuex store
        }
      },

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
