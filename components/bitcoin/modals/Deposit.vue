<template>
  <Modal class="bitcoin-deposit-modal">
    <h3>
      Deposit Bitcoin
    </h3>

    <p>Receive Bitcoin on your Casa Node using this address or QR code.</p>

    <hr>

    <CopyField value="bitcoin address" />
    [qr code]

    <hr>

    <div class="buttons centered">
      <a class="button is-primary" @click="close()">Close</a>
    </div>
  </Modal>
</template>

<script>
  import Events from '~/helpers/events';

  export default {
    data() {
      return {
        //
      }
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

  }
</style>
