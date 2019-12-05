<template>
  <div class="page">
    <h1>
      <img src="~/assets/icons/casa.svg">

      Home
    </h1>

    <UnitSwitch />

    <UpdateMessage v-if="$store.state.system.updateAvailable" />
    <BalanceGraph />

    <div class="cards">
      <NodeSummary />
      <Statuses />
    </div>

    <div class="cards">
      <LightningBalances />
      <SatsApp />
    </div>
  </div>
</template>

<script>
  import Events from '~/helpers/events';
  import UpdateMessage from '~/components/home/UpdateMessage';
  import BalanceGraph from '~/components/home/BalanceGraph';
  import NodeSummary from '~/components/home/NodeSummary';
  import Statuses from '~/components/home/Statuses';
  import LightningBalances from '~/components/home/LightningBalances';
  import SatsApp from '~/components/home/SatsApp';
  import UpdateModal from '~/components/system/modals/Update';

  export default {
    layout: 'dashboard',

    components: {
      UpdateMessage, BalanceGraph,
      NodeSummary, Statuses,
      LightningBalances, SatsApp,
    },

    async created() {
      if(!this.$store.state.bitcoin.operational) {
        await this.$store.dispatch('bitcoin/getStatus');
      }

      if(!this.$store.state.lightning.operational) {
        await this.$store.dispatch('lightning/getStatus');
      }

      this.$store.dispatch('bitcoin/getPeers');
      this.$store.dispatch('bitcoin/getBalance');
      this.$store.dispatch('lightning/getBalance');
      this.$store.dispatch('lightning/getChannels');
      this.$store.dispatch('system/checkForUpdates');
    },

    methods: {
      update() {
        Events.$emit('modal-open', UpdateModal);
      },
    }
  }
</script>
