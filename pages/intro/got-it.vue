<template>
  <div>
    <header>
      <h5 class="status intro-syncing">
        BTC Node Syncing
        <span class="icon" />
      </h5>

      <h6>{{ $store.state.bitcoin.percent }}%</h6>
    </header>

    <main>
      <img src="~/assets/icons/checkmark-green.svg">

      <h2>Got it.</h2>
      <p>Make sure you store your password in a safe place.<br>There is no "Forgot Password" button.</p>
    </main>

    <footer>
      <nuxt-link to="/intro/sync-time" class="button is-primary">
        Continue Setup
      </nuxt-link>
    </footer>
  </div>
</template>

<script>
  export default {
    async created() {
      await this.$store.dispatch('bitcoin/getStatus');
    },
  }
</script>
