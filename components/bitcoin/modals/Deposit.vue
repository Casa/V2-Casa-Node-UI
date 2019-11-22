<template>
  <Modal class="bitcoin-deposit-modal">
    <div class="columns modal-heading">
      <div class="column">
        <h3>
          Deposit Bitcoin
        </h3>
      </div>

      <div class="column is-two-thirds modal-description">
        Receive Bitcoin on your Casa Node using this address or QR code.
      </div>
    </div>
    <hr>

    <div class="flex centered">
      <CopyField :value="address" />
    </div>

    <div class="flex centered qr-code">
      <qriously :value="address" :size="320" foreground="#865efc" />
    </div>

    <hr>

    <div class="buttons centered">
      <a class="button is-primary" @click="close()">Close</a>
    </div>
  </Modal>
</template>

<script>
  import Events from '~/helpers/events';
  import API from '@/helpers/api';

  export default {
    data() {
      return {
        address: false,
      }
    },

    async created() {
      const bitcoinAddress = await API.get(this.$axios, `${this.$env.API_LND}/v1/lnd/address`);
      this.address = bitcoinAddress.address;
    },

    methods: {
      close() {
        Events.$emit('modal-close');
      }
    }
  }
</script>

<style lang="scss">
  .bitcoin-deposit-modal {
    .modal-content {
      min-width: 50%;
    }

    .qr-code {
      margin: 3em 0 2.5em;

      canvas {
        border-radius: 16px;
      }
    }
  }
</style>
