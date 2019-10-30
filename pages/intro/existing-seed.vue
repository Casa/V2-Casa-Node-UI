<template>
  <div class="intro-existing-seed">
    <main>
      <img src="~/assets/icons/password.svg">

      <h2>Okay, let's import your seed phrase.</h2>
      <p>Important: you can only import seed phrases from LND wallets. Importing from a typical Bitcoin wallet won’t work.</p>

      <div class="seed-phrase">
        <template v-for="count in 24">
          <InputField :key="count" :label="count.toString()" v-model="seedPhrase[count - 1]" class="seed" />
        </template>
      </div>
    </main>

    <footer>
      <nuxt-link to="/intro/seed" class="button">
        Cancel and Go Back
      </nuxt-link>

      <a @click="submitSeed()" class="button is-primary">
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
      }
    },

    methods: {
      submitSeed() {
        this.$router.push({ name: 'intro-password', params: { seedPhrase: this.seedPhrase }});
      }
    },
  }
</script>

<style lang="scss">
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
  }
</style>
