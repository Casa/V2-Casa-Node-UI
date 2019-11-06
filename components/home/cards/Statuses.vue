<template>
  <div class="card statuses narrow">
    <nuxt-link to="/bitcoin">
      <h3>Bitcoin</h3>

      <div class="status active">
        <span class="icon" />

        Active
      </div>
    </nuxt-link>

    <nuxt-link to="/lightning">
      <h3>Lightning</h3>

      <div class="status inactive">
        <span class="icon" />

        Locked
      </div>
    </nuxt-link>
  </div>
</template>

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
  }
</style>
