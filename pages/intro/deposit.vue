<template>
  <div class="intro-deposit">
    <header>
      <h5 class="status intro-syncing">
        BTC Node Syncing
        <span class="icon" />
      </h5>

      <h6>24%</h6>
    </header>

    <main>
      <h2>Here's your Bitcoin address.</h2>

      <img src="~/assets/qr-code.svg" class="address">

      <p class="numeric">
        3BVAW9-not-a-real-address-3280JX
      </p>
    </main>

    <footer>
      <nuxt-link to="/home" class="button is-primary">
        Continue
      </nuxt-link>
    </footer>
  </div>
</template>

<style lang="scss">
  .intro-deposit {
    .address {
      margin: 2em;
    }

    .numeric {
      font-size: 36px;
    }
  }
</style>
