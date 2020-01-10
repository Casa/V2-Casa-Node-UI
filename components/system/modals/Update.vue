<template>
  <Modal class="update-modal">
    <form @submit.prevent="update()">
      <h3>Update Your Node</h3>

      <hr>

      Are you sure you want to update your node?

      <div class="buttons">
        <ModalClose />
        <ButtonSpinner class="is-primary" :loading="isLoading" @click="update">
          Update
        </ButtonSpinner>
      </div>
    </form>
  </Modal>
</template>

<script>
  import API from '@/helpers/api';
  import {sleep} from '@/helpers/utils';

  export default {
    data() {
      return {
        isLoading: false,
      }
    },
    methods: {
      async update() {
        this.isLoading = true;
        await API.post({ axios: this.$axios, url: `${this.$env.API_MANAGER}/v1/device/update` });

        // Sleep to give the manager time to restart
        await sleep(5000);
        this.isLoading = false;
        this.$toasted.global.success({ message: 'Device updated.' });
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
