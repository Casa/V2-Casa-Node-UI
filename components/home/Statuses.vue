<template>
  <div class="card statuses narrow">
    <nuxt-link to="/bitcoin">
      <h3>Bitcoin</h3>

      <div class="status" :class="bitcoinStatus.class">
        <span class="icon" />

        {{ bitcoinStatus.text }}
      </div>
    </nuxt-link>

    <nuxt-link to="/lightning">
      <h3>Lightning</h3>

      <div class="status" :class="lightningStatus.class">
        <span class="icon" />

        {{ lightningStatus.text }}
      </div>
    </nuxt-link>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    computed: {
      // Create a local copy of the node's status for better readability in templates
      ...mapGetters({
        bitcoinStatus: 'bitcoin/status',
        lightningStatus: 'lightning/status',
      })
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
