<template>
  <div class="wrapper">
    <div class="page">
      <h1>
        <img src="~/assets/icons/system.svg">

        System
      </h1>

      <Extras />
    </div>

    <template v-if="activeModal">
      <component :is="activeModal" />
    </template>
  </div>
</template>

<script>
  import Events from '~/helpers/events';
  import UpdateModal from '~/components/system/UpdateModal';
  import ShutdownModal from '~/components/system/ShutdownModal';
  import FactoryResetModal from '~/components/system/FactoryResetModal';
  import Extras from '~/components/system/Extras';

  export default {
    layout: 'dashboard',

    components: {
      Extras,
    },

    data() {
      return {
        activeModal: false,
      }
    },

    async created() {
      Events.$on('modal-closed', () => {
        this.activeModal = false;
      });

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

      shutdown() {
        this.openModal(ShutdownModal);
      },

      factoryReset() {
        this.openModal(FactoryResetModal);
      },
    }
  }
</script>
