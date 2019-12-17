<template>
  <Modal class="edit-channel-modal">
    <form>
      <div class="columns modal-heading">
        <div class="column">
          <h3>
            Manage Channel
          </h3>
        </div>

        <div class="column modal-description">
          <UnitSwitch />
        </div>
      </div>
      <hr>
      
      <div class="columns">
        <div class="column">
          <InputField v-model="channel.name" label="Peer Name" />
        </div>
        <div class="column">
          <button type="button" class="button is-danger" @click="closeChannel">
            Close Channel
          </button>
        </div>
      </div>
      
      <div class="columns">
        <div class="column">
          <InputField v-model="channel.purpose" label="Channel Purpose" />
        </div>
      </div>     

      <div class="columns">
        <div class="column balance">
          <h2>{{ channel.localBalance }}</h2>
          <p class="help">
            BTC ON YOUR SIDE
          </p>
        </div>

        <div class="column balance">
          <h2>{{ channel.remoteBalance }}</h2>
          <p class="help">
            BTC ON OTHER SIDE OF CHANNEL
          </p>
        </div>
      </div>
      
      <div class="columns">
        <div class="column">
          <h3>Remote Node ID</h3>
          <p class="secondary">
            Public key of the remote peer.
          </p>
        </div>

        <div class="column channel-data">
          <p class="secondary">
            {{ channel.remotePubkey }}
          </p>
        </div>
      </div>
      
      <div class="columns">
        <div class="column">
          <h3>Withdrawal Timelock</h3>
          <p class="secondary">
            Refund delay for uncooperative close.
          </p>
        </div>

        <div class="column channel-data">
          <p class="secondary">
            {{ channel.csvDelay }}
          </p>
        </div>
      </div>

      <hr>

      <div class="buttons">
        <ModalClose />
        <button @click="updateChannel" class="button is-primary">
          Update Channel
        </button>
      </div>
    </form>
  </Modal>
</template>

<script>
  // import {satsToBtc} from '@/helpers/units';
  import Events from '~/helpers/events';
  import CloseChannel from '~/components/lightning/modals/CloseChannel';
 
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
      updateChannel() {
        // close modal on success
        // TODO: needs backend route to update peer name/channel purpose. This is low priority.
        Events.$emit('modal-close');
      },
      
      closeChannel() {
        Events.$emit('modal-close');
        Events.$emit('modal-open', CloseChannel);
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
    
    .info-light {
      margin-top: 2em;
      font-size: 18px;
      line-height: 1.33;
      color: #8d8e8e;
    }
    
    .secondary {
      margin-top: 0.1em;
      font-size: 16px;
      color: #8d8e8e;
      word-break: break-all;
    }
    
    .channel-data {
      max-width: 50%;
      margin-top: 0.5em;
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
    
    .button.is-danger {
      margin: 0;
      padding: 20px 40px;
      float: right;
    }
    
    .balance {
      border: solid 2px #383163;
      border-radius: 2px;
      margin: .8em;
      
      h2, p {
        text-align: center;
        margin: 0.25em 0;
      }
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
