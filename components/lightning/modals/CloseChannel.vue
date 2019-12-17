<template>
  <Modal class="edit-channel-modal">
    <form>
      <div class="columns modal-heading">
        <div class="column">
          <h3>
            Edit Channel
          </h3>
        </div>

        <div class="column modal-description">
          <UnitSwitch />
        </div>
      </div>
      <hr>

      <div class="columns">
        <div class="column">
          <h2>{{ channel.localBalance }}</h2>
          <p class="help">
            BTC ON YOUR SIDE
          </p>
        </div>

        <div class="column">
          <h2>{{ channel.remoteBalance }}</h2>
          <p class="help">
            BTC ON OTHER SIDE OF CHANNEL
          </p>
        </div>
      </div>

      <p class="info-light">
        There is a waiting period of up to 24 hours while this channel is counting down if the other party is not online. During this time, the non-closing party can dispute the record sent to the chain and seize the channel funds if this claim is fraudulent.
      </p>

      <hr>

      <div class="buttons">
        <button class="button" @click="goBack()">
          Go Back
        </button>
        <button class="button is-primary" @click="closeChannel">
          Close Channel
        </button>        
      </div>
    </form>
  </Modal>
</template>

<script>
  // import {satsToBtc} from '@/helpers/units';
  import Events from '~/helpers/events';
  import EditChannel from '~/components/lightning/modals/EditChannel';

  export default {
    data() {
      return {
        channel: {},
      }
    },
    mounted() {
      this.channel = this.$store.state.lightning.pendingChannelEdit;
    },
    methods: {
      async closeChannel() {
        try {
          const payload = {
            data: {
              channelPoint: this.channel.channelPoint,
              force: !this.channel.active // Avoids force closing if channel is active
            }
          };

          const closedChannel = await this.$axios.delete(`${this.$env.API_LND}/v1/lnd/channel/close`, payload);
          // TODO: Add success and error toasts
          console.log('Channel closed', closedChannel);
          Events.$emit('modal-close');
        } catch (err) {
          console.log('Error closing channel', err);
        }
      },
      goBack() {
        Events.$emit('modal-close');
        Events.$emit('modal-open', EditChannel);
      }
    }
  }
</script>

<style lang="scss">
  @import "~/assets/css/variables.scss";
  .edit-channel-modal {
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
    
    .info-light {
      margin-top: 2em;
      font-size: 18px;
      line-height: 1.33;
      color: #8d8e8e;
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
      border-radius: 100%;
      width: 3em;
      height: 3em;
      line-height: 3em;
      vertical-align: middle;
      text-align: center;
      margin: -0.5em 1em 0 0;
    }

    .help.is-danger {
      font-size: 16px;
      margin: -1em 0 1.5em 0;
    }
  }
</style>
