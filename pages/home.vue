<template>
  <div class="wrapper">
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

    <template v-if="activeModal">
      <component :is="activeModal" />
    </template>
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
  import UpdateModal from '~/components/system/UpdateModal';

  export default {
    layout: 'dashboard',

    components: {
      UpdateMessage, BalanceGraph,
      NodeSummary, Statuses,
      LightningBalances, SatsApp,
    },

    data() {
      return {
        activeModal: false,
      }
    },

    created() {
      this.$store.dispatch('bitcoin/getStatus');
      this.$store.dispatch('lightning/getStatus');
      this.$store.dispatch('system/checkForUpdates');
    },

    methods: {
      openModal(modal) {
        this.activeModal = modal;
        Events.$emit('modal-opened');
      },

      update() {
        this.openModal(UpdateModal);
      },
    }
  }
</script>
