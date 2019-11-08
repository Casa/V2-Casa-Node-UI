<template>
  <div class="card lightning-balances">
    <h3>Lightning Balances</h3>

    <div class="columns">
      <div class="column">
        <div class="numeric">
          {{ $store.state.lightning.balance.confirmed }}
        </div>

        <div class="label">
          Sats in Lightning
        </div>
      </div>

      <div class="column">
        <div class="numeric">
          {{ $store.state.lightning.balance.pending }}
        </div>

        <div class="label">
          Sats Pending
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  @import "~/assets/css/variables.scss";

  .lightning-balances {
    .numeric {
      font-size: 56px;
      margin-top: 1.4em;
      color: $white;
    }

    .label {
      font-size: 12px;
      font-weight: 900;
      line-height: 1.42;
      letter-spacing: 0.92px;
      text-transform: uppercase;
      color: $white;
    }
  }
</style>
