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
        <ButtonSpinner class="is-primary" :loading="isLoading" :dark="false" @click.native="sync">
          Yes, Sync from Scratch
        </ButtonSpinner>
      </div>
    </form>
  </Modal>
</template>

<script>
  import API from '@/helpers/api';
  import Events from '~/helpers/events';
  import ManageModal from '~/components/bitcoin/modals/Manage';

  export default {
    data() {
      return {
        isLoading: false
      }
    },
    methods: {
      async sync() {
        this.isLoading = true;
        await API.post({ axios: this.$axios, url: `${this.$env.API_MANAGER}/v1/device/chain-reset` });
        this.isLoading = false;
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
