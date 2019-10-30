<template>
  <div class="intro-password">
    <main>
      <h2>Secure your Node with a unique password.</h2>
      <p>12+ characters. We highly recommend using a password manager.</p>

      <!-- Todo: Only initialize error handling on submit -->
      <!-- Todo: Display error message generated by VeeValidate -->
      <ValidationProvider ref="password" v-slot="{ errors }" rules="required|min:12">
        <InputField v-model="password" label="Node Password" name="Node Password" type="password" :error="Boolean(errors.length)" />
      </ValidationProvider>
    </main>

    <footer>
      <a class="button is-primary" @click="submit()">
        Submit
      </a>
    </footer>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        seedPhrase: [],
        password: '',
      }
    },

    mounted() {
      // Get seed from the route parameters, since variables are cleared between pages
      if(this.$route.params.seedPhrase !== undefined
          && Array.isArray(this.$route.params.seedPhrase)
          && this.$route.params.seedPhrase.length === 24) {
        this.seedPhrase = this.$route.params.seedPhrase;
      }
    },

    methods: {
      async submit() {
        const validator = await this.$refs.password.validate();

        if(validator.valid) {
          this.initWallet();
        }
      },

      async initWallet() {
        try {
          const data = {
            password: this.password,
            seed: this.seedPhrase,
          };

          await this.$axios.post(`${this.$env.API_LND}/v1/lnd/wallet/init`, data);
          this.register();
        } catch(error) {
          console.error(error, error.response);

/*
          let errorMessage = error.response.data || 'Wallet Creation Failed';
          let seedError = errorMessage.match(/^Unable to initialize wallet, word (.*) isn't a part of default word list/);

          if(seedError) {
            this.$router.push({ name: 'intro-existing-seed', params: { seedPhrase: this.seedPhrase, errorMessage: seedError }});
          } else {
            // Todo: Output user-friendly error message
            console.error(errorMessage);
          }
*/
        }
      },

      async register() {
        try {
          const data = {
            password: this.password,
          };

          await this.$axios.post(`${this.$env.API_MANAGER}/v1/accounts/register`, data);
          this.$router.push({path: '/intro/got-it'});
        } catch(error) {
          // Todo: Output user-friendly error message
          console.error(error, error.response);
        }
      }
    },
  }
</script>

<style lang="scss">
  .intro-password {
    main p {
      margin-top: -0.5em;
    }

    .input-wrap {
      margin-top: 3em;
      width: 500px;
    }
  }
</style>