<template>
  <div class="change-password">
    <main>
      <img src="~/assets/logos/casa-node.svg">

      <h2>Let’s change your password.</h2>

      <ValidationObserver v-slot="{ invalid }" slim>
        <form @submit.prevent="changePassword()">
          <InputField v-model="currentPassword" :error="!!currentPasswordErrorMessage" :error-message="currentPasswordErrorMessage" type="password" label="Current Password" />
          
          <ValidationProvider ref="newPassword" v-slot="{ errors }" rules="required|min:12|confirmed:confirmation" class="password-field">
            <InputField v-model="newPassword" label="Node Password" name="New Password" type="password" :error="Boolean(errors.length)" />
            <p class="error-message">{{ errors[0] }}</p>
          </ValidationProvider>
          
          <ValidationProvider vid="confirmation" class="password-confirmation-field">
            <InputField v-model="confirmation" label="Confirm Password" name="Confirm Password" type="password" />
          </ValidationProvider>

          <div class="instructions">
            Please generate your new password with a password manager. You can’t reset your password if you forget it.
          </div>
          <nuxt-link to="/system" class="button">
            Go Back
          </nuxt-link>
          
          <ButtonSpinner class="is-primary" :loading="isLoading" :dark="true" :disabled="!currentPassword || !newPassword" @click.native="changePassword">
            Set New Password
          </ButtonSpinner>
        </form>
      </ValidationObserver>
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
        confirmation: '',
        error: false,
        currentPasswordErrorMessage: '',
        newPasswordErrorMessage: '',
        isLoading: false
      }
    },

    methods: {
      async changePassword() {
        try {
          this.isLoading = true;
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
          this.isLoading = false;
          this.$router.push('/system/change-password/loading');
        } catch(error) {
          this.isLoading = false;
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
