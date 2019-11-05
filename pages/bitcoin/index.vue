<template>
  <div class="bitcoin-index">
    <h1>
      <img src="~/assets/icons/bitcoin.svg">

      Bitcoin
    </h1>

    <UnitSwitch />

    <div class="card">
      <div class="flex space-between">
        <h3>Node Overview</h3>
        <a class="button">Manage Bitcoin Node</a>
      </div>

      <div class="flex space-between">

      </div>
    </div>

    <div class="card transactions">
      <div class="graph" />

      <div class="flex space-between">
        <h3>Transactions</h3>

        <div class="buttons">
          <a class="button">Get Paid</a>
          <a class="button">Pay Someone</a>
        </div>
      </div>
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

  .bitcoin-index {
    position: relative;

    .transactions {
      position: relative;
      height: 300px;

      .graph {
        position: absolute;
        top: auto;
        left: 0;
        right: 0;
        bottom: 0;
        height: 7em;
        background-image: $purpleGradientVertical;
        z-index: 0;
      }
    }
  }
</style>
