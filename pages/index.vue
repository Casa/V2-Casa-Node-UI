<template>
  <div>
    <main>
      <LoadingBar :percent="loading" />
    </main>

    <footer>
      <nuxt-link to="/intro" class="button">
        See Intro
      </nuxt-link>
    </footer>
  </div>
</template>

<script>
  import LoadingBar from '@/components/LoadingBar';
//  import API from '@/helpers/api';

  export default {
    components: {
      LoadingBar,
    },

    data() {
      return {
        loading: 50,
      }
    },

    async created() {
      /*
       * This is a simple API call to test environment variable loading on clearnet and tor
       * Will be removed once the real loading page is finished
       */

       console.log('env', this.$env);

/*    console.log('generated API URL - ' + apiUrl);

      const loading = await API.get(this.$axios, `${apiUrl}:3000/v1/telemetry/boot`);

      // If there is a network failure, an exception will be thrown and loading will return false
      if(loading) {
        console.log("Received API data - ", loading);
        this.loading = parseInt(loading.percent);
      }
*/
    },
  }
</script>
