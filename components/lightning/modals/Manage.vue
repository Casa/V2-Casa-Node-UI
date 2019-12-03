<template>
  <Modal class="lightning-manage-modal modal">
    <form @submit.prevent="save()">
      <div class="columns modal-heading">
        <div class="column">
          <h3>
            Manage Channels
          </h3>
        </div>
      </div>

      <div class="columns space-between">
        <div class="column">
          <div class="flex">
            <h6>
              Custom Lightning Channels
            </h6>
            <button v-tooltip="'You have new messages.'"/>
          </div>

          <p>
            Open and close channels with specific nodes.
          </p>
        </div>

        <div class="column right">
          <button class="button">Manage</button>
        </div>
      </div>

      <hr>

      <div class="columns space-between">
        <div class="column">
          <h6>
            Minimum Incoming Channel Size
          </h6>
          <p>
            20,000 sats - 16,000,000 sats are the current channel size limits set by the Lightning Network.
          </p>
        </div>

        <div class="column right">
          <InputField v-model="minChanSize" type="text" label="Sats"/>
        </div>
      </div>

      <hr>

      <div class="columns space-between">
        <div class="column">
          <h6>
            Node Nickname
          </h6>
          <p>
            This is publicly viewable. Nicknames aren't unique, so always check the node address.
          </p>
        </div>

        <div class="column right">
          <InputField v-model="minChanSize" type="text" label="Node Nickname"/>
        </div>
      </div>

      <hr>

      <div class="columns space-between">
        <div class="column">
          <h6>
            Node Color
          </h6>
          <p>
            Customize your node color in the Lightning Explorer with a hex code.
          </p>
        </div>

        <div class="column right">
          <InputField v-model="color" type="text" label="#8865DF"/>
        </div>
      </div>

      <hr>

      <div class="columns space-between">
        <div class="column">
          <h6>
            See Your Node
          </h6>
        </div>

        <div class="column right">
          <span>Visit Lightning Explorer</span>
        </div>
      </div>

      <hr>

      <div class="buttons">
        <ModalClose />
        <button type="submit" class="button is-primary">Save Settings</button>
      </div>
    </form>
  </Modal>
</template>

<script>
  //import API from '@/helpers/api';

  //  import Events from '~/helpers/events';

  export default {
    data() {
      return {
        minChanSize: '',
      }
    },

    methods: {

      save() {
      },
    }
  }
</script>

<style lang="scss">
  @import "~/assets/css/variables.scss";

  // Override default width
  .modal {
    .modal-content {
      width: 75%;
    }
  }

  .lightning-manage-modal {

    .input-wrap {
      width: 256px;
    }

    .tooltip {
      display: none;
      opacity: 0;
      transition: opacity .15s;
      pointer-events: none;
      padding: 4px;
      z-index: 10000;
    }

    .tooltip .tooltip-content {
      background: white;
      color: white;
      border-radius: 16px;
      padding: 5px 10px 4px;
      z-index: 10000;

    }

    .tooltip.tooltip-open-transitionend {
      display: block;
      z-index: 10000;
    }

    .tooltip.tooltip-after-open {
      opacity: 1;
      z-index: 10000;
    }
  }
</style>
