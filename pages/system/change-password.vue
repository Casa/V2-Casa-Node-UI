<template>
  <div class="change-password">
    <main>
      <img src="~/assets/logos/casa-node.svg">

      <h2>Let’s change your password.</h2>

      <form @submit.prevent="login()">
        <InputField v-model="currentPassword" :error="error" :error-message="errorMessage" type="password" label="Current Password" />
        <InputField v-model="newPassword" :error="error" :error-message="errorMessage" type="password" label="New Password" />

        <div class="instructions">Please generate your new password with a password manager. You can’t reset your password if you forget it.</div>
        <nuxt-link to="/system" class="button">
          Go Back
        </nuxt-link>
        <input type="submit" value="Set New Password" class="button is-primary">

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
        currentPassword: '',
        newPassword: '',
        error: false,
        errorMessage: '',
      }
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
            console.error('Unexpected error while logging in', error);
            this.errorMessage = "Your node's internal IP address has changed. Please restart the device to continue.";
          }
        }
      },
    }
  }
</script>

<style lang="scss">
  .change-password {
    .instructions {
      width: 520px;
      opacity: 0.6;
      font-size: 17px;
      font-weight: 500;
      text-align: center;
      margin-top: 1.5em;
      margin-bottom: 2em;
    }

    .input-wrap {
      margin: 1.5em auto 1em;
      width: 500px;
      display: block;
    }

    .button {
      min-width: 240px;
      width: 240px;
    }
  }
</style>
