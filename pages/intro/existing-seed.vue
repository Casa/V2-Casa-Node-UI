<template>
  <div>
    <main>
      <img src="~/assets/icons/password.svg">

      <h2>Okay, let's import your seed phrase.</h2>
      <p>Important: you can only import seed phrases from LND wallets. Importing from a typical Bitcoin wallet won’t work.</p>

      <template v-for="count in 24">
        <InputField class="word" :key="count" :label="count" />
      </template>
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
