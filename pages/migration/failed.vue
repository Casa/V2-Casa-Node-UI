<template>
  <div>
    <main>
      <img class="warning" src="~/assets/icons/warning-red.svg">

      <h2>Sorry, the migration wasn't successful.</h2>
      <p>Something went wrong and we couldn't complete the migration. Casa Node 1 is still operational and retains all funds and settings.</p>
    </main>

    <footer>
      <input type="submit" value="Cancel Migration" class="button" @click="cancelMigration()">
      <nuxt-link to="/migration" class="button is-primary">
        Restart Migration
      </nuxt-link>
    </footer>
  </div>
</template>

<script>
  export default {

    methods: {

      async cancelMigration() {
        const data = {};
        await this.$axios.post(`${this.$env.API_MANAGER}/v1/device/user-reset`, data);

        this.$router.push('/intro');
      },
    }
  }
</script>


<style lang="scss">
    @import "~/assets/css/variables.scss";

    .warning {
        width: 80px;
        height: 80px;
    }
</style>
