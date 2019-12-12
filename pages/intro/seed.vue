<template>
  <div>
    <main>
      <img src="~/assets/icons/password.svg">

      <h2>Let's talk about your seed phrase.</h2>
      <p>Do you want to generate a new seed phrase or import an existing one?</p>
    </main>

    <footer>
      <nuxt-link to="/intro/new-seed" class="button">
        Generate New Seed Phrase
      </nuxt-link>

      <nuxt-link to="/intro/existing-seed" class="button">
        Import Existing Seed Phrase
      </nuxt-link>
    </footer>
  </div>
</template>
