<template>
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
</template>

<style lang="scss">
  @import "~/assets/css/variables.scss";

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
</style>
