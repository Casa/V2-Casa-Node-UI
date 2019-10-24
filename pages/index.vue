<template>
  <div>
    <header>
      Header Section
    </header>

    <main>
      <LoadingBar :percent="loading" />
    </main>

    <footer>
      Footer Buttons
    </footer>
  </div>
</template>

<script>
  import LoadingBar from '@/components/LoadingBar';
  import API from '@/helpers/api';

  export default {
    components: {
      LoadingBar,
    },

    data() {
      return {
        loading: 0,
      }
    },

    async created() {
      let apiUrl = process.env.DEVICE_HOST;

      if(window.location.href.includes('.onion')) {
        apiUrl = process.env.CASA_NODE_HIDDEN_SERVICE;
      }

      alert('generated API URL - ' + apiUrl);

      const loading = await API.get(this.$axios, `${apiUrl}:3000/v1/telemetry/boot`);

      // If there is a network failure, an exception will be thrown and loading will return false
      if(loading) {
        console.log("yay it loaded", loading);
        this.loading = 100;
      }
    },
  }
</script>
