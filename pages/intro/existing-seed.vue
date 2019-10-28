<template>
  <div class="intro-existing-seed">
    <main>
      <img src="~/assets/icons/password.svg">

      <h2>Okay, let's import your seed phrase.</h2>
      <p>Important: you can only import seed phrases from LND wallets. Importing from a typical Bitcoin wallet won’t work.</p>

      <div class="seed-phrase">
        <template v-for="count in 24">
          <InputField :key="count" :label="count" class="seed" />
        </template>
      </div>
    </main>

    <footer>
      <nuxt-link to="/intro/seed" class="button">
        Cancel and Go Back
      </nuxt-link>

      <nuxt-link to="/intro/password" class="button is-primary">
        Next
      </nuxt-link>
    </footer>
  </div>
</template>

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
