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
            <img src="~/assets/icons/info-blue.svg" v-tooltip.top-center="'Open and manage channels with specific nodes on the network, giving you more control over who you connect with.'" class="tooltip icon">
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
            <input type="text" class="input" placeholder="#8865DF" v-model="color" @input="formatColor" name="nodeColor" v-validate="{regex: /^#[0-9a-f]{6}$/}">
            <div class="color-output" :style="{'background-color': color}"></div>
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
          <span>Visit Lightning Explorer</span>
          <img src="~/assets/icons/external-link.svg" class="icon">
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
        color: '#8865DF',
      }
    },

    methods: {

      save() {
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

  // Override default width
  .modal {
    .modal-content {
      width: 75%;
    }
  }

  .lightning-manage-modal {

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

    // TODO right align this field
    .skinny {
      width: 256px;
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
