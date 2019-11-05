<template>
  <div class="lightning-index">
    <h1>
      <img src="~/assets/icons/lightning.svg">

      Lightning
    </h1>

    <UnitSwitch />

    <div class="card">
      <h3>Channels</h3>

      <a class="button">Manage Channels</a>
      <a class="button">Open Channel</a>
    </div>
  </div>
</template>

<script>
  export default {
    layout: 'dashboard',
  }
</script>

<style lang="scss">
  @import "~/assets/css/variables.scss";

  .lightning-index {
    position: relative;
  }
</style>
