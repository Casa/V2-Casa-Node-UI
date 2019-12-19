<template>
  <div class="tor-warning-page">
    <main>
      <img src="~/assets/icons/prefer-tor.svg">
      <h2>For maximum privacy and security, please use Tor.</h2>
      <p class="paragraph">
        Please download Tor browser, then continue setup from there using Casa Node 2's unique Tor onion address.
      </p>
      <CopyField :value="$store.state.system.onionAddress" class="copy" />
    </main>

    <footer>
      <a class="button" href="https://www.torproject.org/download/" target="_blank" rel="noopener">Download Tor Browser</a>
      <nuxt-link to="/" class="button">
        Skip Tor, Continue
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

    .copy {
      margin-top: 4em;
    }

    .hidden {
      display: none
    }
  }
</style>
