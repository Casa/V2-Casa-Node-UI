<template>
  <Modal class="factory-reset-modal">
    <form>
      <h3>Are you sure?</h3>

      <hr>

      <p class="info">
        WARNING: DO NOT DO THIS UNLESS INSTRUCTED BY CASA SUPPORT.
      </p>

      <p class="info">
        If you have funds on the Node:
      </p>

      <p>
        - Close all channels with funds in them.
      </p>
      <p>
        - Wait for the BTC to appear in your on chain wallet.
      </p>
      <p>
        - Recommended to transfer all on chain BTC to a different wallet.
      </p>
      <p class="info">
        - Make sure you have your seed phrase.
      </p>

      <p class="info">
        After wiping and factory resetting the device, you will get a new seed phrase and will need to resync the Lightning Network. Make sure to contact Casa support before taking this action.
      </p>

      <hr>

      <div class="buttons">
        <ModalClose />
        <a class="button is-primary" @click="factoryReset()">I understand, reset device</a>
      </div>
    </form>
  </Modal>
</template>

<script>
  import API from '@/helpers/api';
  import Events from '~/helpers/events';

  export default {
    data() {
      return {
        password: '',
        error: false,
        errorMessage: '',
      }
    },

    methods: {
      async factoryReset() {
        await API.post({ axios: this.$axios, url: `${this.$env.API_MANAGER}/v1/device/factory-reset` });

        Events.$emit('modal-closed');
        this.$router.push('/');
      }
    }
  }
</script>

<style lang="scss">
  .factory-reset-modal {
    .info {
      margin-bottom: 1em;
    }

    .pass {
      display: block;
    }
  }
</style>
