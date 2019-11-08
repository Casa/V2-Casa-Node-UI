<template>
  <div class="card statuses narrow">
    <nuxt-link to="/bitcoin">
      <h3>Bitcoin</h3>

      <div class="status" :class="bitcoin.class">
        <span class="icon" />

        {{ bitcoin.text }}
      </div>
    </nuxt-link>

    <nuxt-link to="/lightning">
      <h3>Lightning</h3>

      <div class="status" :class="lightning.class">
        <span class="icon" />

        {{ lightning.text }}
      </div>
    </nuxt-link>
  </div>
</template>

<script>
  export default {
    computed: {
      bitcoin() {
        const data = {
          class: 'loading',
          text: 'Loading...',
        };

        if(this.$store.state.bitcoin.operational) {
          data.class = 'active';
          data.text = 'Operational';
        }

        return data;
      },

      lightning() {
        const data = {
          class: 'loading',
          text: 'Loading...',
        };

        if(this.$store.state.lightning.operational) {
          if(this.$store.state.lightning.unlocked) {
            data.class = 'active';
            data.text = 'Active';
          } else {
            data.class = 'inactive';
            data.text = 'Locked';
          }
        }

        return data;
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
