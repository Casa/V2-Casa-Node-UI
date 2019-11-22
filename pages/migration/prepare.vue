<template>
  <div class="home-index">
    <main>
      <img src="~/assets/icons/node-v1.svg">

      <h2>Prepare Casa Node 1.</h2>
      <p>On Casa Node 1, navigate to <span class="yellow">Settings</span>. Choose <span class="yellow">Migrate LND Wallet to Casa Node 2</span>. If you don't see this option, update the Node 1 and try again. Follow the steps. Once complete, proceed below.</p>
    </main>

    <footer>
      <nuxt-link to="/migration" class="button">
        Go Back
      </nuxt-link>
      <nuxt-link to="/migration/connect" class="button is-primary">
        Ready to Continue
      </nuxt-link>
    </footer>
  </div>
</template>

<style lang="scss">
    @import "~/assets/css/variables.scss";

    .yellow {
        color: $yellow;
    }
</style>
