<template>
  <Modal class="welcome-modal">
    <div class="columns modal-heading">
      <div class="column">
        <h1>Welcome to Casa Node 2.</h1>
      </div>
    </div>
    <hr>

    <div class="columns">
      <div class="column">
        <h3 class="accent-header">
          Faster and better than ever.
        </h3>
        <p class="details">
          The new Raspberry Pi 4 with 4GB of RAM and a fast 1TB SSD make running a full node faster and smoother than ever before.
        </p>
      </div>
    </div>


    <div class="columns">
      <div class="column">
        <h3 class="accent-header">
          Don't be <i>too</i> reckless
        </h3>
        <p class="details">
          Just one last thing to remember. Have fun with Lightning, but only store funds here that you're willing to lose. The Lightning Network and the Casa Node are experimental technology. 
        </p>
      </div>
    </div>
    <hr>

    <div class="buttons">
      <button type="submit" class="button is-primary" @click="close">
        Get Started
      </button>
    </div>
  </Modal>
</template>

<script>
  import Events from '~/helpers/events';

  export default {
    data() {
      return {}
    },

    methods: {
      close() {
        Events.$emit('modal-close');
      }
    }
  }
</script>

<style lang="scss">
  @import "~/assets/css/variables.scss";
  .modal-heading {
    text-align: center;
    font-size: 32px;
  }
  .accent-header {
    text-align: center;
    color: #e958d2;
    font-size: 26px;
  }
  .details {
    color: #FFF;
    opacity: 0.7;
    font-size: 26px;
  }
  .welcome-modal {
    .modal-content {
      min-width: 50%;
    }
    button {
      margin: 0 auto;
    }
  }
</style>
