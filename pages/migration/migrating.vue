<template>
  <div>
    <main>
      <!-- TODO update image to SVG-->
      <img src="~/assets/icons/migration.png">

      <h2 class="headline">
        Migrating to Casa Node 2...
      </h2>

      <LoadingBar :percent="percent" />
    </main>
  </div>
</template>

<script>
  import LoadingBar from '@/components/LoadingBar';

  export default {
    components: {
      LoadingBar,
    },

    data() {
      return {
        percent: 1, // Always give the user a little something to see
      }
    }
  }
</script>

<style lang="scss">
  .headline {
    padding-bottom: 1em;
  }
</style>
