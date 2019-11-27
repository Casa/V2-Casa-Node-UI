<template>
  <Modal class="sats-app-modal">
    <div class="columns modal-heading">
      <div class="column">
        <h3>
          Sats App Address
        </h3>
      </div>

      <div class="column is-two-thirds modal-description">
        Scan this QR code with the Sats app to access your Casa Node remotely.
      </div>
    </div>
    <hr>

    <div class="flex centered">
      <CopyField :value="$store.state.system.onionAddress" class="copy"/>
    </div>

    <div class="flex centered qr-code">
      <qriously :value="$store.state.system.onionAddress" :size="320" foreground="#865efc" />
    </div>

    <hr>

    <div class="buttons centered">
      <a class="button is-primary" @click="close()">Close</a>
    </div>
  </Modal>
</template>

<script>
  import Events from '~/helpers/events';

  export default {

    methods: {
      close() {
        Events.$emit('modal-close');
      }
    }
  }
</script>

<style lang="scss">
  .sats-app-modal {

    .copy {
      width: 500px;
    }

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
