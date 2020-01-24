<template>
  <div class="login">
    <main>
      <img src="~/assets/logos/casa-node.svg">

      <h2>Welcome home.</h2>

      <form @submit.prevent="login()">
        <InputField v-model="password" :error="error" :error-message="errorMessage" type="password" label="Node Password" />
        <ButtonSpinner type="submit" :loading="isLoading" class="button is-primary">
          Sign In
        </ButtonSpinner>
      </form>
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
        isLoading: false,
      }
    },

    methods: {
      async login() {
        try {
          this.isLoading = true;
          await this.$auth.loginWith('local', {data: {password: this.password}});
          this.$router.push('/home');
        } catch(error) {
          this.error = true;

          if(error && error.response && error.response.status === 401) {
            this.errorMessage = 'Sorry, that password is incorrect.';
          } else {
            console.error('Unexpected error while logging in', error);
            this.errorMessage = "Your node's internal IP address has changed. Please restart the device to continue.";
          }
        } finally {
          this.isLoading = false;
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
