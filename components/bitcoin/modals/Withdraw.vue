<template>
  <Modal class="bitcoin-withdraw-modal">
    <form v-if="step == 'input'" @submit.prevent="review()">
      <div class="columns modal-heading">
        <div class="column">
          <h3>
            Withdraw Bitcoin
          </h3>
        </div>

        <div class="column modal-description">
          <UnitSwitch />
        </div>
      </div>
      <hr>

      input

      0 sats

      <a class="button is-small">Send Max</a>
      <a class="button is-small">Switch to Sats</a>

      <InputField label="Recipient Bitcoin Address" />

      <div class="withdrawal-fee">
        <div class="label">Choose the fee you're willing to pay</div>

        <p v-if="fee[chosenFee].error === 'INSUFFICIENT_FUNDS'" class="help is-danger">
          This transaction is too large. Make sure have enough funds to cover the amount plus a withdrawal fee.
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
            <div class="fee-cost">Fast: {{fee.fast.total | usd}}</div>
            <div class="fee-time">~10 min</div>
          </div>

          <div class="fee-option" :class="{active: chosenFee === 'normal'}" @click="setFee('normal')">
            <div class="fee-cost">Normal: {{fee.normal.total | usd}}</div>
            <div class="fee-time">~60 min</div>
          </div>

          <div class="fee-option" :class="{active: chosenFee === 'slow'}" @click="setFee('slow')">
            <div class="fee-cost">Slow: {{fee.slow.total | usd}}</div>
            <div class="fee-time">~4 hours</div>
          </div>

          <div class="fee-option right" :class="{active: chosenFee === 'cheapest'}" @click="setFee('cheapest')">
            <div class="fee-cost">Cheapest: {{fee.cheapest.total | usd}}</div>
            <div class="fee-time">~24 hours</div>
          </div>
        </div>
      </div>

      <hr>

      <div class="buttons">
        <ModalClose />
        <button type="submit" class="button is-primary">Review Withdrawal</button>
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

      To <span class="numeric">Address</span>

      Total amount in units
      Total amount in dollars

      <div class="label">Miner fee</div>

      <div class="label">New Balance</div>

      <hr>

      <div class="buttons">
        <a class="button" @click="edit()">Go Back and Edit</a>
        <button type="submit" class="button is-primary">Confirm Withdrawal</button>
      </div>
    </form>
  </Modal>
</template>

<script>
  import {satsToBtc, btcToSats} from '@/helpers/units';
  import API from '@/helpers/api';

//  import Events from '~/helpers/events';

  export default {
    data() {
      return {
        step: 'input',
        feeTimeout: false,
        chosenFee: 'normal',

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
      }
    },

    methods: {
      async estimateFees() {
        if(this.feeTimeout) {
          clearTimeout(this.feeTimeout);
        }

        this.feeTimeout = setTimeout(async () => {
          if(this.txData.address && (this.txData.amount || this.sweep)) {
            const payload = {
              address: this.txData.address,
              confTarget: 0,
            };

            if(this.sweep) {
              payload.sweep = true;
            } else {
              if(this.system.displayUnit === 'btc') {
                payload.amt = btcToSats(this.txData.amount);
              } else {
                payload.amt = this.txData.amount;
              }
            }

            const estimates = await API.get(this.$axios, `${this.$env.API_LND}/v1/lnd/transaction/estimateFee`, payload);

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
        if(this.balance.btc && this.fee[this.chosenFee].total) {
          if(this.system.displayUnit === 'btc') {
            this.txData.amount = satsToBtc(this.fee[this.chosenFee].sweepAmount);
          } else {
            this.txData.amount = this.fee[this.chosenFee].sweepAmount;
          }
        }
      },

      setFee(choice) {
        this.chosenFee = choice;

        if(this.sweep) {
          this.estimateSweep();
        }
      },

      sendAmount() {
        this.sweep = false;
        this.estimateFees();
      },

      sendMax() {
        this.sweep = true;
        this.txData.amount = null;
        this.estimateFees();
      },

      review() {
        this.step = 'review';
      },

      edit() {
        this.step = 'input';
      },

      withdraw() {
        alert('withdraw btc!');
      },
    }
  }
</script>

<style lang="scss">
  @import "~/assets/css/variables.scss";

  .bitcoin-withdraw-modal {
    .modal-content {
      min-width: 50%;
    }

    .unit-switch {
      top: 2em;
      right: 2.1em;
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
          border-top: 3px solid rgba(255, 255, 255, 0.1);
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
  }
</style>
