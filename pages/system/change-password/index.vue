<template>
  <div class="change-password">
    <main>
      <img src="~/assets/logos/casa-node.svg">

      <h2>Let’s change your password.</h2>

      <form @submit.prevent="changePassword()">
        <InputField v-model="currentPassword" :error="!!currentPasswordErrorMessage" :error-message="currentPasswordErrorMessage" type="password" label="Current Password" />
        <InputField v-model="newPassword" :error="!!newPasswordErrorMessage" :error-message="newPasswordErrorMessage" type="password" label="New Password" />

        <div class="instructions">
          Please generate your new password with a password manager. You can’t reset your password if you forget it.
        </div>
        <nuxt-link to="/system" class="button">
          Go Back
        </nuxt-link>

        <input type="submit" value="Set New Password" class="button is-primary" :disabled="!currentPassword || !newPassword">
      </form>
    </main>

    <footer>
      <Footer />
    </footer>
  </div>
</template>

<script>

  import API from '~/helpers/api';

  // TODO: Use a real localization library instead
  const lang = {
    wrongPassword: 'Wrong password entered. Please try again',
    unknownError: 'Unable to change password. Please send your logs to support',
    alreadyStarted: 'Another change password process has already been started',
  };

  export default {
    data() {
      return {
        currentPassword: '',
        newPassword: '',
        error: false,
        currentPasswordErrorMessage: '',
        newPasswordErrorMessage: '',
      }
    },

    methods: {
      async changePassword() {
        try {

          const auth = {
            headers: {Authorization:''}
          };

          const data = {
            password: this.currentPassword,
            newPassword: this.newPassword,
          };

          this.error = false;
          this.currentPasswordErrorMessage = '';
          this.newPasswordErrorMessage = '';
          await API.post({axios: this.$axios, url: `${this.$env.API_MANAGER}/v1/accounts/changePassword`, data, auth});

          this.$router.push('/system/change-password/loading');
        } catch(error) {
          this.error = true;

          if(error.response.status === 400) {
            this.newPasswordErrorMessage = error.response.data;
          } else if(error.response.status === 403) {
            this.currentPasswordErrorMessage = lang.wrongPassword;
          } else if(error.response.status === 409) {
            this.currentPasswordErrorMessage = lang.alreadyStarted;
          } else {
            this.newPasswordErrorMessage = lang.unknownError;
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
