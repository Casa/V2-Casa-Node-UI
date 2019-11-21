<template>
  <div class="loading">
    <main>
      <img src="~/assets/logos/casa.svg">

      <LoadingBar :percent="percent" />

      <h3 v-if="!finished" class="shutdown-status">
        Shutting down...
      </h3>

      <h3 v-else class="shutdown-status">
        It is now safe to unplug your node.
      </h3>
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

  export default {
    components: {
      LoadingBar,
    },

    data() {
      return {
        percent: 100,
        finished: false
      }
    },

    mounted() {
      // Animate the loading bar
      setTimeout(() => {
        this.percent = 0;
      }, 100);

      // Display "safe to unplug" message after 25 seconds
      setTimeout(() => {
        this.finished = true;
      }, 25000);
    }
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

   .shutdown-status {
     margin-top: 2em;
     width: 470px;
     font-size: 28px;
     color: #fff;
   }
 }
</style>
