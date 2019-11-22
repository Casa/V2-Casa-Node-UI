<template>
  <div class="page">
    <h1>
      <img src="~/assets/icons/system.svg">

      System
    </h1>

    <Extras />
  </div>
</template>

<script>
  import Extras from '~/components/system/cards/Extras';

  export default {
    layout: 'dashboard',

    components: {
      Extras,
    },

    async created() {
      this.$store.dispatch('system/checkForUpdates');
    }
  }
</script>
