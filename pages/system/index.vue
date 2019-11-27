<template>
  <div class="page">
    <h1>
      <img src="~/assets/icons/system.svg">

      System
    </h1>

    <Connections />
    <Extras />
  </div>
</template>

<script>
  import Connections from '~/components/system/cards/Connections';
  import Extras from '~/components/system/cards/Extras';

  export default {
    layout: 'dashboard',

    components: {
      Connections,
      Extras,
    },

    async created() {
      this.$store.dispatch('system/checkForUpdates');
    }
  }
</script>
