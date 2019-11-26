<template>
  <div class="intro-deposit">
    <header>
      <h5 class="status intro-syncing">
        BTC Node Syncing
        <span class="icon" />
      </h5>

      <h6>{{ $store.state.bitcoin.percent }}%</h6>
    </header>

    <main>
      <h2>Here's your Bitcoin address.</h2>

      <div v-if="address" class="flex centered qr-code">
        <qriously :value="address" :size="320" foreground="#865efc" />
      </div>

      <p v-if="address" class="numeric">
        {{ address }}
      </p>

      <p v-else class="numeric">
        loading...
      </p>
    </main>

    <footer>
      <nuxt-link to="/home" class="button is-primary">
        Continue
      </nuxt-link>
    </footer>
  </div>
</template>

<script>
  import API from '@/helpers/api';

  export default {
    data() {
      return {
        address: false,
      }
    },

    async created() {
      await this.$store.dispatch('bitcoin/getStatus');

      const bitcoinAddress = await API.get(this.$axios, `${this.$env.API_LND}/v1/lnd/address`);
      this.address = bitcoinAddress.address;
    },
  }
</script>

<style lang="scss">
  .intro-deposit {
    .address {
      margin: 2em;
    }

    .numeric {
      font-size: 36px;
    }

    .qr-code {
      margin: 3em 0 2.5em;

      canvas {
        border-radius: 16px;
      }
    }
  }
</style>
