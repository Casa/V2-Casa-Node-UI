<template>
  <Modal class="chain-reset-modal">
    <form>
      <h3>Are you sure?</h3>

      <hr>

      <p>
        Continuing will wipe all Bitcoin chain data and begin synchronizing from scratch.
        It can take weeks to complete.
      </p>

      <hr>

      <div class="buttons">
        <a class="button" @click="goback()">Go Back</a>
        <a class="button is-primary" @click="sync()">Yes, Sync from Scratch</a>
      </div>
    </form>
  </Modal>
</template>

<script>
  import API from '@/helpers/api';
  import Events from '~/helpers/events';
  import ManageModal from '~/components/bitcoin/modals/Manage';

  export default {

    methods: {
      async sync() {
        await API.post({ axios: this.$axios, url: `${this.$env.API_MANAGER}/v1/device/chain-reset` });

        Events.$emit('modal-closed');
        this.$router.push('/bitcoin');
      },

      goback() {
        Events.$emit('modal-closed');
        Events.$emit('modal-open', ManageModal);
      }
    }
  }
</script>
