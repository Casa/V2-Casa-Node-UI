<template>
  <Modal class="connection-code-modal">
    <div class="columns modal-heading">
      <div class="column">
        <h3>
          Lightning Connection Code
        </h3>
      </div>

      <div class="column is-two-thirds modal-description">
        Give this code to others so they can connect with your node.
      </div>
    </div>
    <hr>

    <div class="flex centered">
      <CopyField :value="$store.state.lightning.connectionCode" class="copy" />
    </div>

    <div class="flex centered qr-code">
      <qriously :value="$store.state.lightning.connectionCode" :size="320" foreground="#865efc" />
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
  .connection-code-modal {

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
