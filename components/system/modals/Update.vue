<template>
  <Modal class="update-modal">
    <form @submit.prevent="update()">
      <h3>Update Your Node</h3>

      <hr>

      Are you sure you want to update your node?

      <div class="buttons">
        <ModalClose />
        <a class="button is-primary" @click="update">Update</a>
      </div>
    </form>
  </Modal>
</template>

<script>
  import Events from '~/helpers/events';
  import API from '@/helpers/api';
  import {sleep} from '@/helpers/utils';

  export default {
    methods: {
      async update() {
        await API.post({ axios: this.$axios, url: `${this.$env.API_MANAGER}/v1/device/update` });

        // TODO: Add loading state for button.
        // Sleep to give the manager time to restart
        await sleep(5000);
        Events.$emit('modal-close');
        this.$router.push('/loading');
      }
    }
  }
</script>

<style lang="scss">
  .update-modal {
    .input-wrap {
      width: 100%;
      display: block;
    }
  }
</style>
