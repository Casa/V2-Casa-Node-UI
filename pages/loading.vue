<template>
  <div class="loading">
    <main>
      <img src="~/assets/logos/casa.svg">

      <LoadingBar :percent="percent" />
    </main>

    <footer v-if="error">
      <p>
        Having trouble? Contact <a class="is-blue" href="mailto:help@team.casa">help@team.casa</a> with questions.
      </p>

      <nuxt-link to="/" class="button is-primary">
        Go Home
      </nuxt-link>
    </footer>
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
      // Immediately check the node boot status
      this.getLoadingPercent();

      // Periodically check for updates
      loadingInterval = setInterval(this.getLoadingPercent, 5000);

      // If we have been on the loading screen for longer than 5 minutes, something is probably wrong
      setTimeout(() => {
        this.error = true;
      }, 5 * 60 * 1000);
    },

    destroyed() {
      clearInterval(loadingInterval);
    },


    methods: {
      async getLoadingPercent() {
        const loading = await API.get(this.$axios, `${this.$env.API_MANAGER}/v1/telemetry/boot`);

        // If the API returns a lower boot percent than we already had, something is probably wrong
        if(this.percent > loading.percent) {
          this.error = true;
        }

        this.percent = loading.percent;

        if(loading && parseInt(this.percent) === 100) {
          // Make sure we only redirect once
          if(!redirectTimeout) {
            // Wait 10 seconds to let the animation finish
            redirectTimeout = setInterval(() => {
              clearInterval(redirectTimeout);
              this.$router.push('/');
            }, 10000);
          }
        }
      },

      ignoreLoading() {
        sessionStorage.setItem('loading', 'ignored');
        this.$router.push('/');
      },
    },
  }
</script>

<style lang="scss">
  @import "~/assets/css/variables.scss";

 .loading {
   img {
     margin-bottom: 4em;
   }

   footer {
     text-align: center;

     p {
       color: $white;
       font-weight: 500;
       font-size: 18px;
       margin-bottom: 1em;
     }
   }
 }
</style>
