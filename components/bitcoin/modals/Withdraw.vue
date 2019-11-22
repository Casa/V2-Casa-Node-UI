<template>
  <Modal class="bitcoin-withdraw-modal">
    <form @submit.prevent="withdraw()">
      <h3>Withdraw Bitcoin</h3>

      <hr>

      <p>Coming soon™</p>

      <hr>

      <div class="buttons">
        <ModalClose />
        <a class="button is-primary">Update</a>
      </div>
    </form>
  </Modal>
</template>

<script>
//  import Events from '~/helpers/events';

  export default {
    data() {
      return {
        //
      }
    },

    methods: {
      withdraw() {
        //
      }
    }
  }
</script>

<style lang="scss">
  .bitcoin-withdraw-modal {

  }
</style>
