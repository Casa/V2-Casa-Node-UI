<template>
  <Modal>
    <hr>
    <form>
      <h3>Shutdown Your Node</h3>

      <hr>

      <p class="info">
        It's important to shut down before unplugging your node. Sudden power loss could cause your node to resync, which often takes several hours.
      </p>

      <p class="info">
        Please enter your password to confirm the shutdown.
      </p>

      <InputField v-model="password" :error="error" :error-message="errorMessage" label="Node Password" type="password" class="pass"/>

      <div class="buttons">
        <ModalClose />
        <a class="button is-primary" @click="shutdown()">Confirm</a>
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
      }
    },

    methods: {
      async shutdown() {

        // Override the cached jwt and force the user to submit their password again
        const auth = {
          headers: {Authorization:''}
        };

        const data = {
          password: this.password,
        };

        try {
          await this.$axios.post(`${this.$env.API_MANAGER}/v1/device/shutdown`, data, auth);

          Events.$emit('modal-closed');
          this.$router.push('/shutdown');
        } catch (error) {
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
  @import "~/assets/css/variables.scss";

  .info {
    margin-bottom: 1em;
  }

  .pass {
    display: block;
  }
</style>
