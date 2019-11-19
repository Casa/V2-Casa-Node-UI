<template>
  <div>
    <main class="login">
      <h2>Please enter your Casa Node 1 password.</h2>
      <InputField v-model="password" :error="error" :error-message="errorMessage" type="password" label="Node Password" />
    </main>

    <footer>
      <span class="button" @click="cancelMigration()">Cancel Migration</span>
      <input type="submit" value="Authorize" class="button is-primary" @click="login()">
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
      }
    },

    created() {
      this.$auth.strategies.local.options.endpoints.login = {
        url: `${this.$env.API_MANAGER}/v1/accounts/login`,
        method: 'post',
        propertyName: 'jwt'
      };
    },

    methods: {

      async cancelMigration() {
        const data = {};
        await this.$axios.post(`${this.$env.API_MANAGER}/v1/device/user-reset`, data);

        this.$router.push('/intro');
      },

      async login() {

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

          // Redirect to success or fail page
          if (bitcoindCall && lndCall) {
            this.$router.push('/migration/success');
          } else {
            this.$router.push('/migration/failed');
          }

          // Catch login errors
        } catch(error) {

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
