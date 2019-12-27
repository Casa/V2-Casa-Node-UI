<template>
  <Modal class="shutdown-modal">
    <form>
      <h3>Shut Down Your Node</h3>

      <hr>

      <p class="info">
        It's important to shut down before unplugging your node. Sudden power loss could cause your node to resync, which often takes several hours.
      </p>

      <p class="info">
        Please enter your password to confirm the shutdown.
      </p>

      <InputField v-model="password" :error="error" :error-message="errorMessage" label="Node Password" type="password" class="pass" />
      <hr>
      <div class="buttons">
        <ModalClose />
        <ButtonSpinner class="is-primary" :loading="isLoading" :dark="true" @click.native="shutdown">
          Confirm
        </ButtonSpinner>
      </div>
    </form>
  </Modal>
</template>

<script>
  import Events from '~/helpers/events';
  import API from '@/helpers/api';

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
      async shutdown() {
        this.isLoading = true;
        // Override the cached jwt and force the user to submit their password again
        const auth = {
          headers: {Authorization:''}
        };

        const data = {
          password: this.password,
        };

        try {
          await API.post({ url: `${this.$env.API_MANAGER}/v1/device/shutdown`, data, auth });
          this.$toasted.global.success({ message: 'Shutting down device...' });
          this.isLoading = false;
          Events.$emit('modal-close');
          this.$router.push('/shutdown');
        } catch (error) {
          this.isLoading = false;
          this.error = true;

          if(error && error.response && error.response.status === 401) {
            this.errorMessage = 'Sorry, that password is incorrect.';
          } else {
            console.error('Unexpected error while logging in', error);
            this.errorMessage = "Your node's internal IP address has changed. Please restart the device to continue.";
          }
        } finally {
          //this.enabled = true;
        }
      }
    }
  }
</script>

<style lang="scss">
  .shutdown-modal {
    .info {
      margin-bottom: 1em;
    }

    .pass {
      display: block;
    }
  }
</style>
