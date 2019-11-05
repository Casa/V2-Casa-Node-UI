<template>
  <div class="bitcoin-index">
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
  }
</script>

<style lang="scss">
  .bitcoin-index {
    position: relative;
  }
</style>
