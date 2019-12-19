<template>
  <div>
    <main class="login">
      <h2>Please enter your Casa Node 1 password.</h2>
      <InputField v-model="password" :error="error" :error-message="errorMessage" type="password" label="Node Password" />
    </main>

    <footer>
      <span class="button" @click="cancelMigration()">Cancel Migration</span>
      <ButtonSpinner class="is-primary" :loading="isLoading" :dark="true" @click.native="login">
        Authorize
      </ButtonSpinner>
    </footer>
  </div>
</template>

<script>
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
      async cancelMigration() {
        await API.post({ axios: this.$axios, url: `${this.$env.API_MANAGER}/v1/device/factory-reset` });
        this.$router.push('/intro');
      },

      async login() {
        this.isLoading = true;
        // TODO put this somewhere like utilities
        async function sleep(ms) {
          return new Promise(resolve => setTimeout(resolve, ms));
        }

        let attempt = 0;
        let bitcoindCall = false;
        let lndCall = false;

        try {

          // Login to the device and unlock lnd
          // Lnd v0.8.0-beta will deadlock if this is called twice
          await this.$auth.loginWith('local', {data: {password: this.password}});

          // Check status of lnd and bitcoind
          do {
            attempt++;
            bitcoindCall = await API.get(this.$axios, `${this.$env.API_LND}/v1/bitcoind/info/sync`);
            lndCall = await API.get(this.$axios, `${this.$env.API_LND}/v1/lnd/info/sync`);

            // Wait if bitcoind or lnd failed
            if (!bitcoindCall || !lndCall) {
              await sleep(5000);
            }

            // Attempt up to 10 times
          } while ((!bitcoindCall || !lndCall) && attempt < 11);
          
          this.isLoading = false;
          // Redirect to success or fail page
          if (bitcoindCall && lndCall) {
            this.$router.push('/migration/success');
          } else {
            this.$router.push('/migration/failed');
          }

          // Catch login errors
        } catch(error) {
          this.isLoading = false;
          this.error = true;

          if(error && error.response && error.response.status === 401) {
            this.errorMessage = 'Sorry, that password is incorrect.';
          } else {
            this.errorMessage = "Your node's internal IP address has changed. Please restart the device to continue.";
          }
        }
      },
    }
  }
</script>

<style lang="scss">
    .login {
        .input-wrap {
            margin: 1.5em auto 1em;
            width: 500px;
            display: block;
        }

        .button {
            width: 500px;
        }
    }
</style>
