<template>
  <div class="intro-existing-seed">
    <main>
      <img src="~/assets/icons/password.svg">

      <h2>Okay, let's import your seed phrase.</h2>
      <p>Important: you can only import seed phrases from LND wallets. Importing from a typical Bitcoin wallet won’t work.</p>

      <div class="seed-phrase">
        <template v-for="count in 24">
          <InputField :key="count" v-model="seedPhrase[count - 1]" :label="count.toString()" class="seed" />
        </template>
      </div>

      <p v-if="errorMessage" class="error">
        {{ errorMessage }}
      </p>
    </main>

    <footer>
      <nuxt-link to="/intro/seed" class="button">
        Cancel and Go Back
      </nuxt-link>

      <a class="button is-primary" @click="submitSeed()">
        Next
      </a>
    </footer>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        seedPhrase: [],
        errorMessage: false,
      }
    },

    mounted() {
      // Get seed from the route parameters, since variables are cleared between pages
      if(this.$route.params.seedPhrase !== undefined
          && Array.isArray(this.$route.params.seedPhrase)
          && this.$route.params.seedPhrase.length === 24) {
        this.seedPhrase = this.$route.params.seedPhrase;
      }

      // Todo: Highlight erroneous fields
      if(this.$route.params.errorMessage !== undefined) {
        this.errorMessage = this.$route.params.errorMessage
      }
    },

    methods: {
      submitSeed() {
        // Todo: Validate that all 24 words were filled in before submitting
        this.$router.push({ name: 'intro-password', params: { seedPhrase: this.seedPhrase }});
      }
    },
  }
</script>

<style lang="scss">
  @import "~/assets/css/variables.scss";

  .intro-existing-seed {
    main {
      margin-bottom: 7em;
    }

    .seed-phrase {
      max-width: 1200px;
      margin: 3em auto 0;
    }

    .seed {
      margin: 0.5em;
    }

    .error {
      margin-top: 1.1em;
      color: $red;
    }
  }
</style>
