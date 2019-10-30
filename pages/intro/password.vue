<template>
  <div class="intro-password">
    <main>
      <h2>Secure your Node with a unique password.</h2>
      <p>12+ characters. We highly recommend using a password manager.</p>

      <InputField label="Node Password" />
    </main>

    <footer>
      <nuxt-link to="/intro/got-it" class="button is-primary">
        Set Password
      </nuxt-link>
    </footer>
  </div>
</template>

<script>
//  import API from '@/helpers/api';

  export default {
    data() {
      return {
        seedPhrase: [],
      }
    },

    mounted() {
      console.log(this.$route);

      // Get seed from the route parameters, since variables are cleared between pages
      if(this.$route.params.seedPhrase !== undefined
          && Array.isArray(this.$route.params.seedPhrase)
          && this.$route.params.seedPhrase.length === 24) {
        this.seedPhrase = this.$route.params.seedPhrase;
      }
    }
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
