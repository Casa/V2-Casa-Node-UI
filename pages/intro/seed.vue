<template>
  <div>
    <header>
      <h4 class="status intro-syncing">
        BTC Node Syncing
        <span class="icon" />
      </h4>

      <h5>24%</h5>
    </header>

    <main>
      <img src="~/assets/icons/password.svg">

      <h2>Let's talk about your seed phrase.</h2>
      <p>Do you want to generate a new seed phrase or import an existing one?</p>
    </main>

    <footer>
      <nuxt-link to="/intro/new-seed" class="button is-light">
        Generate New Seed Phrase
      </nuxt-link>

      <nuxt-link to="/intro/existing-seed" class="button is-light">
        Import Existing Seed Phrase
      </nuxt-link>
    </footer>
  </div>
</template>
