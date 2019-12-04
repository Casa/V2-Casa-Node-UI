<template>
  <Modal class="new-channel-modal">
    <form v-if="step == 'input'" @submit.prevent="review()">
      <div class="columns modal-heading">
        <div class="column">
          <h3>
            Open New Channel
          </h3>
        </div>

        <div class="column modal-description">
          <UnitSwitch />
        </div>
      </div>
      <hr>

      <div class="columns">
        <div class="column">
          <InputField v-model="address" label="Peer Name" @input="estimateFees" />
        </div>

        <div class="column">
          <InputField v-model="address" label="Channel Purpose" @input="estimateFees" />
        </div>
      </div>

      <div class="columns">
        <div class="column">
          <InputField v-model="address" label="Peer Connection Code" @input="estimateFees" />
        </div>
      </div>

      <div class="columns">
        <div class="column">
          <InputField v-model="amountSats" label="Channel Funding" @input="estimateFees" />
        </div>
      </div>

      <p>
        You have {{ $store.state.bitcoin.balance.confirmed | localized }} sats available in your Bitcoin wallet.
      </p>

      <div class="withdrawal-fee">
        <div class="label">
          Choose the fee you're willing to pay to open this channel
        </div>

        <p v-if="fee[chosenFee].error === 'INSUFFICIENT_FUNDS'" class="help is-danger">
          This transaction is too large. Make sure you have enough funds to cover the amount plus a withdrawal fee.
        </p>

        <p v-if="fee[chosenFee].error === 'OUTPUT_IS_DUST'" class="help is-danger">
          This transaction is too small and cannot be sent on-chain. Try increasing the amount to send or decrease the withdrawal fee.
        </p>

        <p v-if="fee[chosenFee].error === 'FEE_RATE_TOO_LOW'" class="help is-danger">
          The fee for this transaction is too small and cannot currently be sent on-chain. Try increasing the fee or the amount to send.
        </p>

        <p v-if="fee[chosenFee].error === 'INVALID_ADDRESS'" class="help is-danger">
          The address you entered is invalid. Make sure you are sending to a mainnet Bitcoin address.
        </p>

        <div class="fee-options">
          <div class="fee-option left" :class="{active: chosenFee === 'fast'}" @click="setFee('fast')">
            <div class="fee-cost">
              Fast: {{ fee.fast.total | usd }}
            </div>
            <div class="fee-time">
              ~10 min
            </div>
          </div>

          <div class="fee-option" :class="{active: chosenFee === 'normal'}" @click="setFee('normal')">
            <div class="fee-cost">
              Normal: {{ fee.normal.total | usd }}
            </div>
            <div class="fee-time">
              ~60 min
            </div>
          </div>

          <div class="fee-option" :class="{active: chosenFee === 'slow'}" @click="setFee('slow')">
            <div class="fee-cost">
              Slow: {{ fee.slow.total | usd }}
            </div>
            <div class="fee-time">
              ~4 hours
            </div>
          </div>

          <div class="fee-option right" :class="{active: chosenFee === 'cheapest'}" @click="setFee('cheapest')">
            <div class="fee-cost">
              Cheapest: {{ fee.cheapest.total | usd }}
            </div>
            <div class="fee-time">
              ~24 hours
            </div>
          </div>
        </div>
      </div>

      <hr>

      <div class="buttons">
        <ModalClose />
        <button type="submit" class="button is-primary">
          Open Channel
        </button>
      </div>
    </form>

    <form v-else-if="step == 'review'" @submit.prevent="withdraw()">
      <div class="columns modal-heading">
        <div class="column">
          <h3>
            Review Bitcoin Withdrawal
          </h3>
        </div>

        <div class="column modal-description">
          <UnitSwitch />
        </div>
      </div>
      <hr>

      <div class="review-total">
        <div class="flex centered">
          <span class="dot label">To</span> <span class="numeric">{{ address }}</span>
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

      <div class="columns misc-total">
        <div class="column centered">
          <div class="numeric">
            {{ fee[chosenFee].total | usd }}
          </div>
          <div class="label">
            Miner fee
          </div>
        </div>

        <div class="column centered border-left">
          <div>
            <span class="numeric">{{ $store.state.bitcoin.balance.confirmed - amountSats | localized }}</span> sats
          </div>
          <div class="label">
            New Balance
          </div>
        </div>
      </div>

      <hr>

      <div class="buttons">
        <a class="button" @click="edit()">Go Back and Edit</a>
        <button type="submit" class="button is-primary">
          Confirm Withdrawal
        </button>
      </div>
    </form>
  </Modal>
</template>

<script>
  import {satsToBtc, btcToSats, toPrecision} from '@/helpers/units';
  import API from '@/helpers/api';
  import Events from '~/helpers/events';

  export default {
    data() {
      return {
        step: 'input',
        inputMode: 'usd',
        amountDisplayed: '$0',
        amountSats: 0,
        amountBtc: 0,
        amountUsd: 0,
        address: '',
        sweep: false,

        fee: {
          fast: {
            total: '--',
            perByte: '--',
            error: false,
          },
          normal: {
            total: '--',
            perByte: '--',
            error: false,
          },
          slow: {
            total: '--',
            perByte: '--',
            error: false,
          },
          cheapest: {
            total: '--',
            perByte: '--',
            error: false,
          },
        },

        feeTimeout: false,
        chosenFee: 'normal',
      }
    },

    async created() {
      if(!this.$store.state.bitcoin.operational) {
        await this.$store.dispatch('bitcoin/getStatus');
      }

      this.$store.dispatch('bitcoin/getBalance');
      this.$store.dispatch('bitcoin/getPrice');
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
        this.sweep = false;

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
        this.estimateFees();
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

      async estimateFees() {
        if(this.feeTimeout) {
          clearTimeout(this.feeTimeout);
        }

        this.feeTimeout = setTimeout(async () => {
          if(this.amountSats) {
            const payload = {
              confTarget: 0,
              amt: this.amountSats,
            };

            const estimates = await API.get(this.$axios, `${this.$env.API_LND}/v1/lnd/channel/estimateFee`, {params: payload});

            if(estimates) {
              for(const [speed, estimate] of Object.entries(estimates)) {
                // If the API returned an error message
                if(estimate.code) {
                  this.fee[speed].total = 'N/A';
                  this.fee[speed].perByte = 'N/A';
                  this.fee[speed].error = estimate.code;
                } else {
                  this.fee[speed].total = estimate.feeSat;
                  this.fee[speed].perByte = estimate.feerateSatPerByte;
                  this.fee[speed].sweepAmount = estimate.sweepAmount;
                  this.fee[speed].error = false;
                }
              }

              if(this.sweep) {
                this.estimateSweep();
              }
            }
          }
        }, 500);
      },

      estimateSweep() {
        if(this.fee[this.chosenFee].total) {
          let sweepAmount = this.fee[this.chosenFee].sweepAmount;

          this.amountSats = sweepAmount;
          this.amountBtc = satsToBtc(sweepAmount);
          this.amountUsd = parseFloat(this.amountBtc * this.$store.state.bitcoin.price).toFixed(2);

          this.updateAmountDisplayed();
        }
      },

      setFee(choice) {
        this.chosenFee = choice;

        if(this.sweep) {
          this.estimateSweep();
        }
      },

      sendMax() {
        this.sweep = true;
        this.estimateFees();
      },

      review() {
        this.step = 'review';
      },

      edit() {
        this.step = 'input';
      },

      async withdraw() {
        const payload = {
          sweep: this.sweep,
          addr: this.address,
          amt: this.amountSats,
          satPerByte: parseInt(this.fee[this.chosenFee].perByte),
        };

        try {
          await this.$axios.post(`${this.$env.API_LND}/v1/lnd/transaction`, payload);

          // Todo - Toast notification
          Events.$emit('modal-close');
        } catch (error) {
          console.error('Error sending BTC - ', error);
        }
      },
    }
  }
</script>

<style lang="scss">
  @import "~/assets/css/variables.scss";

  .new-channel-modal {
    .modal-content {
      min-width: 50%;
    }

    .unit-switch {
      top: 2em;
      right: 2.1em;
    }

    p {
      color: $translucentWhite;
      margin-top: -0.75em;
      margin-left: 2px;
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

    .withdrawal-fee {
      margin-top: 2.5em;

      .label {
        font-size: 13px;
        margin-bottom: 2em;
        letter-spacing: 1.08px;
      }

      .fee-options {
        position: relative;
        display: flex;

        &::before {
          position: absolute;
          width: 95%;
          left: 2.5%;
          top: 0.75em;
          content: '';
          border-top: 3px solid $transparentWhite;
        }
      }

      .fee-option {
        position: relative;
        flex-grow: 1;
        padding-top: 2.4em;
        font-weight: bold;
        text-align: center;
        cursor: pointer;

        .fee-time {
          font-size: 15px;
          font-weight: normal;
          color: $lightGray;
        }

        &::before {
          position: absolute;
          top: -0.2em;
          left: calc(50% - 0.85em);
          width: 2em;
          height: 2em;
          content: '';
          border-radius: 100%;
          border: solid 2px $transparentWhite;
          background-color: $blue;
        }
      }

      .fee-option.left {
        text-align: left;
        flex-grow: 0;
        width: 9em;

        &::before {
          left: 0;
        }
      }

      .fee-option.right {
        text-align: right;
        flex-grow: 0;
        width: 9em;

        &::before {
          left: auto;
          right: 0;
        }
      }

      .fee-option:hover {
        .fee-cost {
          color: $lightBlue;
        }

        &::before {
          border-color: $lightBlue;
          opacity: 1;
        }
      }

      .fee-option.active {
        .fee-cost {
          color: $lightBlue;
        }

        &::before {
          border-color: $lightBlue;
          background-color: $lightBlue;
          background-image: url('~assets/icons/checkmark.svg');
          background-size: 1em;
          background-repeat: no-repeat;
          background-position: center;
          opacity: 1;
        }
      }
    }

    .dot {
      background-color: $transparentSand;
      border-radius: 100%;
      width: 3em;
      height: 3em;
      line-height: 3em;
      vertical-align: middle;
      text-align: center;
      margin: -0.5em 1em 0 0;
    }

    .review-total {
      margin: 3em;

      .big {
        font-size: 60px;
        margin: 15px;
      }
    }

    .misc-total {
      padding: 0;
      margin: 1.5em 0;
      font-size: 24px;

      .column {
        padding: 0;
      }

      .label {
        color: $gray;
        letter-spacing: 1px;
        font-size: 13px;
      }
    }

    .help.is-danger {
      font-size: 16px;
      margin: -1em 0 1.5em 0;
    }
  }
</style>
