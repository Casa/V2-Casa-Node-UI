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
            <img
              v-tooltip.top-center="'Open and manage channels with specific nodes on the network, giving you more control over who you connect with.'"
              src="~/assets/icons/info-blue.svg"
              class="tooltip icon"
            >
          </div>

          <p>
            Automatically connect your node to others in the network.
          </p>
          <div v-if="autopilot" class="autopilot is-green">
            Active
          </div>
          <div v-else class="autopilot is-red">
            Not Active
          </div>
        </div>

        <div class="column right">
          <!-- OPEN MANAGE MODAL -->
          <button class="button">
            Manage
          </button>
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
          <InputField v-model="minChanSize" type="text" label="Sats" />
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
          <InputField v-model="nickName" type="text" label="Node Nickname" />
        </div>
      </div>

      <hr>

      <div class="columns space-between">
        <div class="column space-between">
          <h6>
            Node Color
          </h6>
          <p>
            Customize your node color in the Lightning Explorer with a hex code.
          </p>
        </div>

        <div class="column right custom-color">
          <div class="control skinny">
            <input v-model="color" type="text" class="input" name="nodeColor" @input="formatColor">
            <div class="color-output" :style="{'background-color': color}" />
          </div>
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
          <a class="link" :href="lnExplorer + $store.state.lightning.pubkey" target="_blank">
            <span class="link">Visit Lightning Explorer</span>
            <img src="~/assets/icons/external-link.svg" class="icon">
          </a>
        </div>
      </div>

      <hr>

      <div class="buttons">
        <ModalClose />
        <button type="submit" class="button is-primary">
          Save Settings
        </button>
      </div>
    </form>
  </Modal>
</template>

<script>
  import API from '@/helpers/api';
  //import Events from '~/helpers/events';

  const defaultColor = '#8865DF';
  const defaultString = '';
  const defaultAutopilot = false;

  export default {

    data() {
      return {
        lnExplorer: this.$env.LIGHTNING_EXPLORER,
        nickName: defaultString,
        color: defaultColor,
        minChanSize: defaultString,
        autopilot: defaultAutopilot,
      }
    },

    async created() {
      const settings = await API.get(this.$axios, `${this.$env.API_MANAGER}/v1/settings/read`);

      if (settings) {
        this.nickName = settings.lnd.nickName || defaultString;
        this.color = settings.lnd.color || defaultColor;
        this.minChanSize = settings.lnd.minChanSize || defaultString;
        this.autopilot = settings.lnd.autopilot || defaultAutopilot;
      }

      if(!this.$store.state.lightning.pubkey) {
        await this.$store.dispatch('lightning/getLndPageData');
      }
    },

    methods: {

      async save() {
        const data = {};

        if (this.nickName) {
          data.nickName = this.nickName;
        }

        if (this.color) {
          data.color = this.color;
        }

        if (this.minChanSize) {
          data.minChanSize = parseInt(this.minChanSize, 10);
        }

        await API.post({ axios: this.$axios, url: `${this.$env.API_MANAGER}/v1/settings/save`, data });

      },

      formatColor() {
        // Prepend # symbol if none is included
        if(this.color.length && this.color[0] != '#') {
          this.color = '#' + this.color;
        }

        // Remove duplicate # symbols if necessary
        this.color = this.color.replace(/#+/, '#');
      },
    }
  }
</script>

<style lang="scss">
  @import "~/assets/css/variables.scss";

  .lightning-manage-modal {
    .modal-content {
      width: 75%;
    }

    .autopilot {
      text-transform: uppercase;
      width: 120px;
      padding: 4px 0;
      border: solid 2px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      border-radius: 18px;
      font-weight: 900;
      font-size: 13px;
      margin-top: 1em;

      &.is-green {
        color: $green;
      }

      &.is-red {
        color: $red;
      }
    }

    h3 {
      margin-bottom: 1em;
    }
    .icon {
      width: 16px;
      height: 16px;
    }

    .input-wrap {
      width: 256px;
    }

    .color-output {
      position: absolute;
      top: 1px;
      bottom: 1px;
      width: 3em;
      background-color: #8865DF;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }

    .skinny {
      width: 256px;
      float: right;
    }

    .custom-color {

      input {
        padding-left: 4em !important;
      }

      .color-output {
        position: absolute;
        top: 0px;
        bottom: 0px;
        width: 3em;
        background-color: #8865DF;
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
      }
    }

    .tooltip {
      margin-left: 0.5em;
    }
  }
</style>
