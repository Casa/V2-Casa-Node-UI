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
      this.fetchLNData();
      this.interval = setInterval(this.fetchLNData, 20000);
    },
    
    beforeDestroy () {
      clearInterval(this.interval)
    },
   
    methods: {
      async fetchLNData() {
        if(!this.$store.state.lightning.operational) {
          await this.$store.dispatch('lightning/getStatus');
        }

        this.$store.dispatch('lightning/getChannels');
        this.$store.dispatch('lightning/getTransactions');
        this.$store.dispatch('bitcoin/getPrice');
      }
    },
  }
</script>
