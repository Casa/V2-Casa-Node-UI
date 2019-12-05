<template>
  <div class="page">
    <h1>
      <img src="~/assets/icons/lightning.svg">

      Lightning
    </h1>

    <UnitSwitch />

    <Channels />
    <LightningTransactions />
  </div>
</template>

<script>
  import Channels from '~/components/lightning/cards/Channels';
  import LightningTransactions from '~/components/lightning/cards/LightningTransactions';

  export default {
    layout: 'dashboard',

    components: {
      Channels, LightningTransactions,
    },

    async created() {
      if(!this.$store.state.lightning.operational) {
        await this.$store.dispatch('lightning/getStatus');
      }

      this.$store.dispatch('lightning/getBalance');
      this.$store.dispatch('lightning/getChannels');
    },
  }
</script>
