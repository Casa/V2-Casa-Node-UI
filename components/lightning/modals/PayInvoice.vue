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

        <div class="column modal-description narrow">
          <UnitSwitch />
        </div>
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
        <ModalClose />

        <button type="submit" class="button is-primary">
          Review Payment
        </button>
      </div>
    </form>
  </Modal>
</template>

<script>
//  import {satsToBtc} from '@/helpers/units';
//  import API from '@/helpers/api';/
//  import Events from '~/helpers/events';

  export default {
    data() {
      return {
        step: 'input',
        paymentCode: '',
        amountSats: 0,
      }
    },

    methods: {
      review() {
        if(!this.paymentCode) {
          // Todo - Display error message via toast
          console.error('Unable to continue. Please make sure all fields are filled in.');
        } else {
          this.step = 'review';
        }
      },

      edit() {
        this.step = 'input';
      },

      submit() {

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
