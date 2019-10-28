<template>
  <div class="intro-new-seed">
    <header>
      <h4 class="status intro-syncing">
        BTC Node Syncing
        <span class="icon" />
      </h4>

      <h5>24%</h5>
    </header>

    <main>
      <div class="count">
        12
      </div>

      <div class="seed">
        dragon
      </div>
    </main>

    <footer>
      <nuxt-link to="/intro/seed" class="button">
        Go Back
      </nuxt-link>

      <nuxt-link to="/intro/password" class="button is-primary">
        Next
      </nuxt-link>
    </footer>
  </div>
</template>

<style lang="scss">
  @import "~/assets/css/variables.scss";

  .intro-new-seed {
    .count {
      background-color: $darkPurple;
      border-radius: 100%;
      font-size: 36px;
      font-weight: 900;
      width: 2.5em;
      height: 2.5em;
      padding-top: 0.5em;
      margin: 1em auto;
    }

    .seed {
      background-color: $black;
      font-size: 60px;
      font-weight: 500;
      margin: 0.75em auto;
      padding: 0.5em 2em;
      border-radius: 80px;
    }
  }
</style>
