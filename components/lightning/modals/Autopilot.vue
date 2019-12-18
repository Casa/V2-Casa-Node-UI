<template>
  <Modal class="autopilot-modal">
    <form>
      <div class="columns modal-heading">
        <div class="column">
          <h3>
            Autopilot Settings
          </h3>
        </div>

        <div class="column modal-description">
          <div class="toggle-switch">
            <label class="toggle">
              <input v-model="autopilot" type="checkbox" :checked="autopilot">
              <span class="toggle-slider" />
              <div class="toggle-options">
                <div class="toggle-option one">Off</div>
                <div class="toggle-option two">On</div>
              </div>
            </label>
          </div>
        </div>
      </div>
      <hr>

      <div class="flex centered">
        <span class="dot label">Amount you have in Autopilot</span>
      </div>

      <div class="columns">
        <div class="column is-full">
          <span class="primary-input numeric">{{ getTotal }}</span>
        </div>
      </div>
      
      <hr>
      <div class="columns">
        <div class="column">
          <p>
            Cannot exceed the {{ walletBalance }} sats in your Node wallet. To change the amount of sats you have in Autopilot Channels, tweak the values below.
          </p>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <InputField v-model="maxChannelSize" label="Max Channel Size" />
          <p class="help">
            Can range from 10,000 sats to 1,600,000 sats.
          </p>
        </div>

        <div class="column">
          <InputField v-model="maxChannels" label="Max Channels" />
          <p class="help">
            Depends on balance. Can range from 1 to 100s.
          </p>
        </div>
      </div>

      <hr>

      <div class="buttons">
        <ModalClose />
        <button class="button is-primary" @click="saveSettings">
          Save Settings
        </button>
      </div>
    </form>
  </Modal>
</template>

<script>
  import API from '~/helpers/API';
  import Events from '~/helpers/events';

  export default {
    data() {
      return {
        autopilot: false,
        maxChannelSize: 10000,
        maxChannels: 1,
        walletBalance: 0
      }
    },
    
    computed: {
      getTotal() {
        let value = this.maxChannelSize * this.maxChannels;
        if(isNaN(value)) {
          value = 0;
        }
        return value;
      }
    },

    async created() {
      this.$store.dispatch('bitcoin/getBalance');
      this.walletBalance = this.$store.state.bitcoin.balance.total;
      
      const settings = await API.get(this.$axios, `${this.$env.API_MANAGER}/v1/settings/read`);

      if (settings) {
        this.autopilot = settings.lnd.autopilot;
      }
    },

    methods: {
      async saveSettings() {
        const data = {
          autopilot: this.autopilot,
          maxChannels: parseInt(this.maxChannels) || 0,
          maxChanSize: parseInt(this.maxChannelSize) || 0,
        };
        try {
          await this.$axios.post(`${this.$env.API_MANAGER}/v1/settings/save`, data);
        } catch (err) {
          console.log('Error:', err);
        }
      },

      close() {
        Events.$emit('modal-close');
      }
    }
  }
</script>

<style lang="scss">
  @import "~/assets/css/variables.scss";

  .autopilot-modal {
    .modal-content {
      min-width: 50%;
    }

    .toggle-switch {
      top: 2em;
      right: 2.1em;
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

    .input-field input {
      font-size: 14px;
      font-weight: bold;
    }
  }
  
    .toggle-switch {
    position: absolute;
    right: 0;
    top: 0.75em;
  }

  /* Toggle switch buttons */
  .toggle {
    position: relative;
    display: inline-block;
    width: 128px;
    height: 35px;
    max-width: 100%;
    font-size: 14px;
    font-weight: 900;
  }

  .toggle input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .toggle-slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 3px solid $blue;
    transition: 0.5s;
    border-radius: 20px;
  }

  .toggle-slider:before {
    position: absolute;
    content: "";
    height: 100%;
    width: 50%;
    left: 0;
    top: -3px;
    left: -1px;
    background-color: $blue;
    transition: 0.5s;
    border: 3px solid $blue;
    box-sizing: content-box;
    border-radius: 20px;
  }

  .toggle input:checked + .toggle-slider:before {
    transform: translateX(calc(100% - 7px));
  }

  .toggle-options {
      display: flex;
      text-decoration: none;
  }

  .toggle-option {
      position: relative;
      z-index: 1;
      cursor: pointer;
      top: -1em;
      transition: 0.5s;
      transition-property: font-weight, color;
      width: 50%;
      text-align: center;
      font-weight: bold;
      padding-left: 0.5em;
      font-size: 13px;
      letter-spacing: 1px;
  }

  .toggle-option.two {
    padding-right: 0.5em;
  }

  .toggle-option.active {
      transition-delay: 0.2s;
      color: #fff;
  }
</style>
