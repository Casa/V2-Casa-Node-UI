<template>
  <div class="page">
    <h1>
      <img src="~/assets/icons/bitcoin.svg">

      Bitcoin
    </h1>

    <UnitSwitch />

    <NodeOverview />
    <BitcoinTransactions />
  </div>
</template>

<script>
  import NodeOverview from '~/components/bitcoin/cards/NodeOverview';
  import BitcoinTransactions from '~/components/bitcoin/cards/BitcoinTransactions';

  export default {
    layout: 'dashboard',

    components: {
      NodeOverview, BitcoinTransactions,
    },

    async created() {
      this.fetchBitcoinStatus();
      this.interval = setInterval(this.fetchBitcoinStatus, 20000);
    },
    
    beforeDestroy () {
      clearInterval(this.interval)
    },

    methods: {
      async fetchBitcoinStatus() {
        if(!this.$store.state.bitcoin.operational) {
          await this.$store.dispatch('bitcoin/getStatus');
        }

        this.$store.dispatch('bitcoin/getPrice');
        this.$store.dispatch('bitcoin/getAddresses');
        this.$store.dispatch('bitcoin/getPeers');
        this.$store.dispatch('bitcoin/getBalance');
        this.$store.dispatch('bitcoin/getTransactions');
      }
    }
  }
</script>
