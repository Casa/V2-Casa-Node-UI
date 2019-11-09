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
  import NodeOverview from '~/components/bitcoin/NodeOverview';
  import BitcoinTransactions from '~/components/bitcoin/BitcoinTransactions';

  export default {
    layout: 'dashboard',

    components: {
      NodeOverview, BitcoinTransactions,
    },

    created() {
      this.$store.dispatch('bitcoin/getStatus');
      this.$store.dispatch('bitcoin/getAddresses');
    },
  }
</script>
