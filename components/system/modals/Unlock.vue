<template>
  <Modal class="unlock-modal">
    <form>
      <h3>Unlock Your Node</h3>

      <hr>

      <p class="info">
        This unlocks your Lightning Node, so it can make and route transactions. You will only need to do this once per node restart.
      </p>

      <InputField v-model="password" :error="error" :error-message="errorMessage" label="Node Password" type="password" class="pass" />
      <hr>
      <div class="buttons">
        <a class="button" @click="closeModal()">
          <slot>Go Back</slot>
        </a>
        <ButtonSpinner class="is-primary" :loading="isLoading" :dark="true" @click.native="unlock">
          Confirm
        </ButtonSpinner>
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
        error: false,
        errorMessage: '',
        isLoading: false
      }
    },

    methods: {
      closeModal() {
        Events.$emit('modal-close');
      },
      async unlock() {
        this.isLoading = true;

        try {
          await this.$axios.post(`${this.$env.API_LND}/v1/lnd/wallet/unlock`, { password: this.password });
          this.$toasted.global.success({ message: 'Unlocked Successfully' });
          this.isLoading = false;
          this.$store.dispatch('lightning/getStatus');
          Events.$emit('modal-close');
        } catch (error) {
          console.log('error', error);
          this.isLoading = false;
          this.error = true;

          if(error && error.response && error.response.status === 401) {
            this.errorMessage = 'Sorry, that password is incorrect.';
          } else {
            this.errorMessage = "Lightning is still starting up. Wait for 60 seconds and try again.";
          }
        }
      }
    }
  }
</script>

<style lang="scss">
  .unlock-modal {
    .info {
      margin-bottom: 1em;
    }

    .pass {
      display: block;
    }
  }
</style>
