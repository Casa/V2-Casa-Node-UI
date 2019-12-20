<template>
  <Modal class="new-channel-modal">
    <form @submit.prevent="validate()">
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
          <ValidationProvider ref="peerName" v-slot="{ errors }" rules="required|alpha_num_space">
            <InputField v-model="peerName" label="Peer Name" :error="Boolean(errors.length)" />
            <p class="error-message">
              {{ errors[0] }}
            </p>
          </ValidationProvider>
        </div>

        <div class="column">
          <ValidationProvider ref="channelPurpose" v-slot="{ errors }" rules="required|alpha_num_space">
            <InputField v-model="channelPurpose" label="Channel Purpose" :error="Boolean(errors.length)" />
            <p class="error-message">
              {{ errors[0] }}
            </p>
          </ValidationProvider>
        </div>
      </div>

      <div class="columns">
        <div class="column">
          <InputField v-model="connectionCode" label="Peer Connection Code" />
        </div>
      </div>

      <div class="columns">
        <div class="column">
          <InputField v-model="amountDisplayed" label="Channel Funding" @input="updateAmount" />
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
        <ButtonSpinner class="is-primary" :loading="isLoading" :dark="true" @click.native="validate">
          Open Channel
        </ButtonSpinner>
      </div>
    </form>
  </Modal>
</template>

<script>
  import {satsToBtc} from '@/helpers/units';
  import API from '@/helpers/api';
  import Events from '~/helpers/events';

  export default {
    data() {
      return {
        peerName: '',
        channelPurpose: '',
        connectionCode: '',
        amountDisplayed: '',
        amountSats: 0,
        amountBtc: 0,
        address: '',

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
        isLoading: false
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
      // Update the amount displayed and the amount saved in local memory
      updateAmount() {
        let value = parseInt(this.amountDisplayed) || 0;

        this.amountSats = value;
        this.amountBtc = satsToBtc(value);

        this.estimateFees();
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

      setFee(choice) {
        this.chosenFee = choice;

        if(this.sweep) {
          this.estimateSweep();
        }
      },

      validate() {
        this.isLoading = true;
        if(!this.peerName || !this.channelPurpose || !this.connectionCode || !this.amountSats) {
          // Todo - Display error messages in a toast based on vee validate rules
          console.error("Please make sure all required fields are filled in");
          this.isLoading = false;
        } else {
          this.openChannel();
        }
      },

      async openChannel() {
        const payload = {
          amt: this.amountSats,
          name: this.peerName,
          purpose: this.channelPurpose,
          satPerByte: parseInt(this.fee[this.chosenFee].perByte),
        };

        const parsedConnectionCode = this.connectionCode.match(/^(.*?)@(.*?)(?::([0-9]+))?$/);

        if(parsedConnectionCode) {
          payload.pubKey = parsedConnectionCode[1];
          payload.ip = parsedConnectionCode[2];

          // If we matched a port in the connection code
          // Otherwise the backend will automatically determine which port to use
          if(parsedConnectionCode[3]) {
            payload.port = parsedConnectionCode[3];
          }
        } else {
          // Todo - Display toast message
          console.error("Unable to parse connection code.");
          return;
        }

        // Todo - We need the settings route to get this information
        /*
        if(payload.ip.match(/\.onion$/) && !this.system.settings.bitcoind.bitcoindTor && !this.system.settings.lnd.lndTor) {
          this.$toast.open({duration: 10000, message: "You can't connect to a Tor node unless you are running Tor yourself. You can enable Tor from the Connections menu on your dashboard.", position: 'is-top', type: 'is-danger'});
          return;
        }
        */

        try {
          await this.$axios.post(`${this.$env.API_LND}/v1/lnd/channel/open`, payload);
          this.isLoading = false;
          Events.$emit('modal-close');
        } catch(error) {
          // Todo - Display toast message
          this.isLoading = false;
          console.error(error.response.data);
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
    
    .error-message {
      color: #f0649e;
      font-size: 13px;
      margin-top: 0.3em;
      text-align: left;
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
