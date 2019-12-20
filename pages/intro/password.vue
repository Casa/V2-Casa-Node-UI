<template>
  <ValidationObserver v-slot="{ invalid }" slim>
    <form class="intro-password" @submit.prevent="submitPassword">
      <main>
        <h2>Secure your Node with a unique password.</h2>
        <p>12+ characters. We highly recommend using a password manager.</p>        
        <ValidationProvider ref="password" v-slot="{ errors }" rules="required|min:12|confirmed:confirmation" class="password-field">
          <InputField v-model="password" label="Node Password" name="Node Password" type="password" :error="Boolean(errors.length)" />
          <p class="error-message">{{ errors[0] }}</p>
          <p v-if="seedError" class="error-message">Error: Seed phrase missing. Try generating it again.</p>
        </ValidationProvider>
        
        <ValidationProvider vid="confirmation" class="password-confirmation-field">
          <InputField v-model="confirmation" label="Confirm Password" name="Confirm Password" type="password" />
        </ValidationProvider>
      </main>

      <footer>
        <ButtonSpinner :loading="isLoading" :dark="false" :disabled="invalid" @click.native="submitPassword">
          Submit
        </ButtonSpinner>
      </footer>
    </form>
  </ValidationObserver>
</template>

<script>

  import API from '@/helpers/api';

  export default {
    data() {
      return {
        seedPhrase: [],
        password: '',
        confirmation: '',
        seedError: false,
        isLoading: false
      }
    },

    created() {
      // Get seed from the route parameters, since variables are cleared between pages
      if(this.$route.params.seedPhrase !== undefined
          && Array.isArray(this.$route.params.seedPhrase)
          && this.$route.params.seedPhrase.length === 24) {
        this.seedPhrase = this.$route.params.seedPhrase;
      } else {
        this.seedError = true;
        this.$router.push({path: '/intro/seed'});
      }
    },

    methods: {
      async submitPassword() {
        const validator = await this.$refs.password.validate();
        
        if(validator.valid) {
          this.register();
        }
      },

      async register() {
        this.isLoading = true;
        try {

          // Override the cached jwt and force the user to submit their password again. This can happen if a user
          // reset's their node and then immediately attempts to re-register.
          const auth = {
            headers: {Authorization:''}
          };

          const data = {
            password: this.password,
            seed: this.seedPhrase,
          };

          const register = await API.post({axios: this.$axios, url: `${this.$env.API_MANAGER}/v1/accounts/register`, data, auth});

          // We can't use $auth.setUserToken beacuse it forces a redirect to the home page and does not respect the watchLoggedIn option
          // Todo: Fix this upstream?
          const token = `JWT ${register.data.jwt}`;

          this.$auth.setToken('local', token);
          this.$auth.strategy._setToken(token);
          this.isLoading = false;
          this.$router.push({path: '/intro/got-it'});
        } catch(error) {
          let errorMessage, seedError;
          
          this.isLoading = false;
          if(error.response !== undefined) {
            errorMessage = error.response.data || 'Wallet Creation Failed';
            seedError = errorMessage.match(/^Unable to initialize wallet, word (.*) isn't a part of default word list/);
          }

          if(seedError) {
            this.$router.push({ name: 'intro-existing-seed', params: { seedPhrase: this.seedPhrase, seedError: seedError }});
          } else {
            // Todo: Output user-friendly error message
            console.error(errorMessage);
          }
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

    .error-message {
      color: #f0649e;
      font-size: 15px;
      margin-top: 0.25em;
      text-align: left;
      width: 500px;
    }
    
    .input-field input {
      background: none;
      border: none;
      padding: 1.8em 1.5em 0.5em 1.5em;
      color: #ffffff;
      width: 100%;
      font-size: 12px;
    }
        
    .input-field.active label {
      font-size: 11px;
      top: 0.25em;
    }
    
    .password-field {
      display: block;
      
      .input-wrap {
        margin-top: 3em;
        width: 500px;
      }
    }
    
    .password-confirmation-field {
      display: block;
      
      .input-wrap {
        margin-top: 1.25em;
        width: 500px;
      }
    }

  }
</style>
