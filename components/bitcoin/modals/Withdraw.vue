<template>
  <Modal class="update-modal">
    <form @submit.prevent="update()">
      <h3>Withdraw Bitcoin</h3>

      <hr>

      <InputField v-model="password" label="Node Password" type="password" />

      <div class="buttons">
        <ModalClose />
        <a class="button is-primary">Update</a>
      </div>
    </form>
  </Modal>
</template>

<script>
  import Events from '~/helpers/events';

  export default {
    data() {
      return {
        password: '',
      }
    },

    methods: {
      async update() {
        const data = {
          password: this.password,
        };

        await this.$axios.post(`${this.$env.API_MANAGER}/v1/device/update`, data);

        Events.$emit('modal-closed');
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
