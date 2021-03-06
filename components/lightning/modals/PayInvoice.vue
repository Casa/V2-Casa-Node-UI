<template>
  <Modal class="pay-invoice-modal">
    <form v-if="step == 'input'" @submit.prevent="review()">
      <div class="columns modal-heading">
        <div class="column">
          <h3>
            Pay Invoice
          </h3>
        </div>
      </div>
      <hr>

      <InputField v-model="paymentCode" label="Payment Code" />

      <hr>

      <div class="buttons">
        <ModalClose />

        <button type="submit" class="button is-primary">
          Review Payment
        </button>
      </div>
    </form>

    <form v-if="step == 'review'" @submit.prevent="submit()">
      <div class="columns modal-heading">
        <div class="column">
          <h3>
            Confirm Lightning Payment
          </h3>
        </div>

        <!-- <div class="column modal-description narrow">
          <UnitSwitch />
        </div> -->
      </div>
      <hr>

      <div class="review-total">
        <div class="flex centered">
          <span class="dot label">You're Sending</span>
        </div>

        <div class="flex centered big">
          <span class="numeric">{{ amountSats | localized }}</span>&nbsp;sats
        </div>

        <div class="flex centered">
          <span class="numeric">{{ amountSats | usd }}</span>
        </div>
      </div>

      <hr>

      <div class="columns new-balance">
        <div class="column centered total">
          <span class="numeric">{{ $store.state.lightning.balance.confirmed - amountSats | localized }}</span> sats
          <div class="label">
            Approximate New Balance
          </div>
        </div>

        <div class="column is-three-fifths">
          Because Lightning payment fees aren't set before sending, this is an estimate of your remaining balance.
        </div>
      </div>

      <hr>

      <div class="buttons">
        <a class="button" @click="edit()">Go Back and Edit</a>
        <ButtonSpinner class="is-primary" :loading="isLoading" :dark="true" @click.native="submit">
          Confirm Payment
        </ButtonSpinner>
      </div>
    </form>
  </Modal>
</template>

<script>
  import Events from '~/helpers/events';
  import API from '@/helpers/api';

  export default {
    data() {
      return {
        step: 'input',
        paymentCode: '',
        amountSats: 0,
        isLoading: false
      }
    },

    async created() {
      if(!this.$store.state.lightning.operational) {
        await this.$store.dispatch('lightning/getStatus');
      }

      this.$store.dispatch('lightning/getBalance');
      this.$store.dispatch('bitcoin/getPrice');
    },

    methods: {
      async review() {
        if(this.paymentCode) {
          const payload = {
            paymentRequest: this.paymentCode,
          };

          const invoice = await API.get(this.$axios, `${this.$env.API_LND}/v1/lnd/lightning/invoice`, {params: payload});

          if(invoice) {
            this.amountSats = parseInt(invoice.numSatoshis);
            this.step = 'review';
          } else {
            this.$toasted.global.error({ message: 'Unable to parse payment code.' });
          }
        } else {
          this.$toasted.global.error({ message: 'Unable to continue. Please make sure all fields are filled in.' });
        }
      },

      edit() {
        this.step = 'input';
      },

      async submit() {
        this.isLoading = true;
        const payload = {
          paymentRequest: this.paymentCode,
        };

        try {
          await this.$axios.post(`${this.$env.API_LND}/v1/lnd/lightning/payInvoice`, payload);
          this.$store.dispatch('lightning/getTransactions');
          this.isLoading = false;
          this.$toasted.global.success({ message: 'Payment sent successfully.' });
          Events.$emit('modal-close');
          this.$destroy();
        } catch(error) {
          this.isLoading = false;
          this.$toasted.global.error({ message: error.response.data });
        }
      },
    }
  }
</script>

<style lang="scss">
  @import "~/assets/css/variables.scss";

  .pay-invoice-modal {
    .modal-content {
      min-width: 50%;
    }

    .input-wrap {
      width: 100%;
      margin: 1em 0;
    }

    .unit-switch {
      top: 2em;
      right: 2.1em;
    }

    .dot {
      background-color: $transparentSand;
      border-radius: 16px;
      vertical-align: middle;
      text-align: center;
      padding: 0.75em 2.5em;
      margin-bottom: 1.25em;
    }

    .review-total {
      margin: 3em;

      .big {
        font-size: 60px;
        margin: 15px;
      }
    }

    .new-balance {
      margin: 1em 0;
      font-size: 18px;
      color: $translucentWhite;

      .total {
        color: $white;
        font-size: 24px;
      }

      .label {
        color: $translucentistWhite;
      }
    }
  }
</style>
