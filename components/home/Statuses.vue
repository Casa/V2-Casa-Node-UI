<template>
  <div class="card statuses narrow">
    <nuxt-link to="/bitcoin">
      <h3>Bitcoin</h3>

      <div class="status" :class="bitcoinClass">
        <span class="icon" />

        {{ bitcoinText }}
      </div>
    </nuxt-link>

    <nuxt-link to="/lightning">
      <h3>Lightning</h3>

      <div class="status" :class="lightningClass">
        <span class="icon" />

        {{ lightningText }}
      </div>
    </nuxt-link>
  </div>
</template>

<script>
  export default {
    computed: {
      bitcoinClass() {
        if(this.$store.state.bitcoin.operational) {
          return 'active';
        } else {
          return 'loading';
        }
      },

      bitcoinText() {
        if(this.$store.state.bitcoin.operational) {
          return 'Operational';
        } else {
          return 'Loading...';
        }
      },

      lightningClass() {
        if(this.$store.state.lightning.operational) {
          return 'active';
        } else {
          return 'loading';
        }
      },

      lightningText() {
        if(this.$store.state.lightning.operational) {
          return 'Operational';
        } else {
          return 'Loading...';
        }
      },
    },
  }
</script>

<style lang="scss">
  @import "~/assets/css/variables.scss";

  .statuses {
    a {
      display: block;
      margin-right: 4em;
    }

    a:first-of-type {
      margin-bottom: 3em;
    }

    .status {
      white-space: nowrap;
    }
  }
</style>
