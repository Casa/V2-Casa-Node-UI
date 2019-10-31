<template>
  <div>
    <main>
      <img src="~/assets/logos/casa-node.svg">

      <h2>Welcome home.</h2>

      <InputField v-model="password" :error="error" :error-message="errorMessage" type="password" label="Node Password" />

      <a class="button is-primary" @click="login()">Sign In</a>
    </main>

    <footer>
      <Footer />
    </footer>
  </div>
</template>

<script>
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
      async login() {
        try {
          await this.$auth.loginWith('local', {data: {password: this.password}});
          this.$router.push('/home');
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

<style>
  .input-wrap {
    margin: 1.5em auto 1em;
    width: 500px;
    display: block;
  }

  .button {
    width: 500px;
  }
</style>
