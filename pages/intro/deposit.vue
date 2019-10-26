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
      <h2>Here's your Bitcoin address.</h2>

      <img src="~/assets/qr-code.svg">

      <p>3BVAW924YBVCIX9397G23FIUBF3280JX</p>
    </main>

    <footer>
      <nuxt-link to="/home" class="button is-primary">
        Continue
      </nuxt-link>
    </footer>
  </div>
</template>
