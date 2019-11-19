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
  import API from '@/helpers/api';

  let loadingInterval;
  let redirectTimeout;

  export default {
    components: {
      LoadingBar,
    },

    data() {
      return {
        percent: 1, // Always give the user a little something to see
        error: false,
      }
    },

    created() {
      // Immediately check the node migration status
      this.getLoadingPercent();

      // Periodically check for updates
      loadingInterval = setInterval(this.getLoadingPercent, 5000);

      // If we have been on the loading screen for longer than 1 minutes, something is probably wrong
      setTimeout(() => {
        this.error = true;
      }, 5 * 60 * 1000);
    },

    destroyed() {
      clearInterval(loadingInterval);
      redirectTimeout = undefined;
    },


    methods: {

      async getLoadingPercent() {

        // Declare redirect so getLoadingPercent can use it.
        function redirect(router, route) {

          // Make sure we only redirect once
          if (!redirectTimeout) {

            // Wait 10 seconds to let the animation finish
            redirectTimeout = setInterval(() => {
              clearInterval(redirectTimeout);
              router.push(route);
            }, 10000);
          }
        }

        const loading = await API.get(this.$axios, `${this.$env.API_MANAGER}/v1/device/migration/status`);

        // IF 500 or 200 with error
        if(!loading || loading.status.error) {
          this.error = true;
          this.percent = 100;

          redirect(this.$router, '/migration/failed');
        } else if (loading.status.details === 'completed'){
          this.percent = 100;

          redirect(this.$router, '/migration/confirm');

        } else {

          // Increase the percentage arbitrarily to give user feedback
          if(this.percent < 90) {
            this.percent += 10;
          }
        }
      },
    },
  }
</script>

<style lang="scss">
  .headline {
    padding-bottom: 1em;
  }
</style>
