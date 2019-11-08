<template>
  <div class="card balances">
    <div class="graph" />

    <div class="columns space-between">
      <div class="column is-one-quarter">
        <h3>
          Balances
        </h3>
      </div>

      <div class="column is-one-quarter timescale is-hidden">
        Past 30 Days
      </div>
    </div>

    <div class="totals">
      <div class="columns">
        <div class="column is-half numeric total">
          {{ $store.state.bitcoin.balance.confirmed + $store.state.lightning.balance.confirmed }}
        </div>

        <div class="column is-one-quarter subtotal">
          <div class="numeric">
            {{ $store.state.bitcoin.balance.confirmed }}
          </div>

          <div class="label">
            Bitcoin Balance
          </div>
        </div>

        <div class="column is-one-quarter subtotal">
          <div class="numeric">
            {{ $store.state.lightning.balance.confirmed }}
          </div>

          <div class="label">
            Lightning Balance
          </div>
        </div>
      </div>
    </div> <!-- /.totals -->
  </div> <!-- /.card.balances -->
</template>

<style lang="scss">
  @import "~/assets/css/variables.scss";

  .balances {
    position: relative;
    height: 300px;

    .graph {
      position: absolute;
      top: auto;
      left: 0;
      right: 0;
      bottom: 0;
      height: 10em;
      background-image: $purpleGradientVertical;
      z-index: 0;
    }

    .timescale {
      text-align: right;
    }

    .totals {
      position: absolute;
      bottom: 3em;
      left: 3em;
      right: 4em;
    }

    .total {
      font-size: 56px;
    }

    .subtotal {
      text-align: right;
      align-self: flex-end;

      .label {
        font-size: 12px;
        font-weight: 900;
        letter-spacing: 1px;
        text-transform: uppercase;
        color: $white;
      }

      .numeric {
        font-size: 20px;
      }
    }

    .columns {
      position: relative;
      z-index: 1;
    }

    .column {
      color: $white;
    }
  }
</style>
