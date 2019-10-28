<template>
  <div class="intro-password">
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

<style lang="scss">
  .intro-password {
    main p {
      margin-top: -0.5em;
    }

    .input-wrap {
      margin-top: 3em;
      width: 500px;
    }
  }
</style>
