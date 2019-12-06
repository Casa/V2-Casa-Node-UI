<template>
  <div class="tor-warning-page">
    <main>
      <img src="~/assets/icons/prefer-tor.svg">
      <h2>For maximum privacy and security, please use Tor.</h2>
      <p class="paragraph">
        Copy the Tor address to Casa Node 2 below. Or, you can continue ahead using this browser.
      </p>
    </main>

    <footer>
      <span class="button" @click="copy()">Copy Tor Address</span>
      <nuxt-link to="/" class="button">
        Continue in This Browser
      </nuxt-link>
    </footer>
  </div>
</template>

<script>
  import {copyToClipboard} from '@/helpers/utils';

  export default {
    created() {
      this.$store.dispatch('system/getAddresses');
    },

    methods: {
      copy() {
        copyToClipboard(this.$store.state.system.onionAddress);
      },
    }
  }
</script>

<style lang="scss">
  .tor-warning-page {
    .hidden {
      display: none
    }
  }
</style>
