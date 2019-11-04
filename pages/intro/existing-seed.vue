<template>
  <form class="intro-existing-seed" @submit.prevent="submitSeed()">
    <main>
      <img src="~/assets/icons/password.svg">

      <h2>Okay, let's import your seed phrase.</h2>
      <p>Important: you can only import seed phrases from LND wallets. Importing from a typical Bitcoin wallet won’t work.</p>

      <div class="seed-phrase">
        <template v-for="count in 24">
          <InputField :key="count" v-model="seedPhrase[count - 1]" :label="count.toString()" :error="seedError[count - 1]" class="seed" />
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

      <input type="submit" class="button is-primary" value="Next">
    </footer>
  </form>
</template>

<script>
  export default {
    data() {
      return {
        seedPhrase: [],
        seedError: [],
        errorMessage: false,
      }
    },

    created() {
      // Get seed from the route parameters, since variables are cleared between pages
      if(this.$route.params.seedPhrase !== undefined
          && Array.isArray(this.$route.params.seedPhrase)
          && this.$route.params.seedPhrase.length === 24) {
        this.seedPhrase = this.$route.params.seedPhrase;
      }

      if(this.$route.params.seedError !== undefined) {
        this.handleSeedError(this.$route.params.seedError);
      }
    },

    methods: {
      submitSeed() {
        let error = false;
        this.seedError = [];

        // Loop through seed phrase to make sure no fields are empty
        for(let i = 0; i < 24; i++) {
          if(!this.seedPhrase[i]) {
            this.seedError[i] = true;
            error = true;
          }
        }

        if(error) {
          this.isError = true;
          this.errorMessage = "You need all 24 seed words to continue.";
        } else {
          this.$router.push({ name: 'intro-password', params: { seedPhrase: this.seedPhrase }});
        }
      },

      handleSeedError(seedError) {
        this.errorMessage = seedError[0];
        this.seedError = [];

        // Loop through seed words to determine which ones are invalid
        for(let i = 0; i < 24; i++) {
          if(this.seedPhrase[i] == seedError[1]) {
            this.seedError[i] = true;
          }
        }
      },
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
