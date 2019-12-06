<template>
  <Modal class="create-invoice-modal">
    <form v-if="step == 'input'" @submit.prevent="review()">
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

      <div class="flex centered">
        <span class="dot label">Amount to Request</span>
      </div>

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

      <InputField v-model="memo" label="Memo (Optional)" />

      <hr>

      <div class="buttons">
        <ModalClose />

        <button type="submit" class="button is-primary">
          Continue
        </button>
      </div>
    </form>

    <form v-else-if="step == 'review'" @submit.prevent="createInvoice()">
      <div class="columns modal-heading">
        <div class="column">
          <h3>
            Review Lightning Invoice
          </h3>
        </div>

        <div class="column modal-description">
          <UnitSwitch />
        </div>
      </div>
      <hr>

      <div class="review-total">
        <div class="flex centered">
          <span class="dot label">Expires in One Hour</span>
        </div>

        <template v-if="inputMode === 'usd'">
          <div class="flex centered big">
            <span class="numeric">${{ amountUsd }}</span>
          </div>

          <div class="flex centered">
            <span class="numeric">{{ amountSats | localized }}</span>&nbsp;sats
          </div>
        </template>

        <template v-else-if="inputMode === 'sats'">
          <div class="flex centered big">
            <span class="numeric">{{ amountSats | localized }}</span>&nbsp;sats
          </div>

          <div class="flex centered">
            <span class="numeric">${{ amountUsd }}</span>
          </div>
        </template>
      </div>

      <hr>

      <template v-if="memo !== ''">
        <div class="flex centered">
          {{ memo }}
        </div>

        <hr>
      </template>

      <div class="buttons">
        <a class="button" @click="edit()">Go Back and Edit</a>
        <button type="submit" class="button is-primary">
          Create Invoice
        </button>
      </div>
    </form>

    <form v-else-if="step == 'qrcode'">
      <div class="columns modal-heading">
        <div class="column">
          <h3>
            Lightning Invoice Ready
          </h3>
        </div>

        <div class="column modal-description">
          Copy or scan the payment code below.
        </div>
      </div>

      <hr>

      <div class="flex centered">
        <CopyField :value="paymentCode" />
      </div>

      <div class="flex centered qr-code">
        <qriously :value="paymentCode" :size="320" foreground="#865efc" />
      </div>

      <hr>

      <div class="buttons centered">
        <a class="button is-primary" @click="close()">Close</a>
      </div>
    </form>
  </Modal>
</template>

<script>
  import {satsToBtc, btcToSats, toPrecision} from '@/helpers/units';
  import Events from '~/helpers/events';

  export default {
    data() {
      return {
        step: 'input',
        inputMode: 'usd',
        paymentCode: '',
        amountDisplayed: '$0',
        amountSats: 0,
        amountBtc: 0,
        memo: '',
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

      async review() {
        if(this.amountSats) {
          this.step = 'review';
        } else {
          // Todo - Display error message via toast
          console.error('Unable to continue. Please make sure all fields are filled in.');
        }
      },

      edit() {
        this.step = 'input';
      },

      async createInvoice() {
        const payload = {
          amt: this.amountSats,
          memo: this.memo
        };

        try {
          const invoice = await this.$axios.post(`${this.$env.API_LND}/v1/lnd/lightning/addInvoice`, payload);
          this.paymentCode = invoice.data.paymentRequest;
          this.step = 'qrcode';
        } catch (error) {
          console.error(error.response.data);
        }
      },

      close() {
        Events.$emit('modal-close');
      }
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

    .dot {
      background-color: $transparentSand;
      border-radius: 16px;
      vertical-align: middle;
      text-align: center;
      padding: 0.75em 2.5em;
      margin: 1em 0 2.5em;
    }

    .copy-field {
      margin-top: 1em;
      max-width: 75%;
    }

    .qr-code {
      margin: 3em 0 2.5em;

      canvas {
        border-radius: 16px;
      }
    }
  }
</style>
