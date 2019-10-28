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
      <h2>It's time to sync.</h2>
      <p>While your Node finishes syncing, save some time by funding your wallet with BTC.</p>
    </main>

    <footer>
      <nuxt-link to="/home" class="button">
        Not Now
      </nuxt-link>

      <nuxt-link to="/intro/deposit" class="button is-primary">
        Send Funds
      </nuxt-link>
    </footer>
  </div>
</template>
