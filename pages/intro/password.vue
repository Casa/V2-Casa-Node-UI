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
      <h2>Secure your Node with a unique password.</h2>
      <p>12+ characters. We highly recommend using a password manager.</p>

      <InputField label="Node Password" />
    </main>

    <footer>
      <nuxt-link to="/intro/got-it" class="button is-primary">
        Set Password
      </nuxt-link>
    </footer>
  </div>
</template>
