<template>
  <div class="home-index">
    <h1>
      <img src="~/assets/icons/casa.svg">

      Home
    </h1>

    <UnitSwitch />

    <div class="card flex space-between update">
      <div>
        <h5>
          <span class="new">New</span>
          Software Update Available
        </h5>

        <p>
          Upgrade Casa Node to the latest version of NodeOS.
        </p>
      </div>

      <div class="buttons">
        <a class="button is-light is-small is-arrow">Learn More</a>
        <a class="button is-primary is-small">Update Now</a>
      </div>
    </div>

    <div class="card balances">
      <div class="graph" />

      <div class="columns space-between">
        <div class="column is-one-quarter">
          <h3>
            Balances
          </h3>
        </div>

        <div class="column is-one-quarter timescale">
          Past 30 Days
        </div>
      </div>

      <div class="totals">
        <div class="columns">
          <div class="column is-half numeric total">
            158,000
          </div>

          <div class="column is-one-quarter subtotal">
            <div class="numeric">
              100,000
            </div>

            <div class="label">
              Bitcoin Balance
            </div>
          </div>

          <div class="column is-one-quarter subtotal">
            <div class="numeric">
              58,000
            </div>

            <div class="label">
              Lightning Balance
            </div>
          </div>
        </div>
      </div> <!-- /.totals -->
    </div> <!-- /.card.balances -->

    <div class="cards">
      <div class="card grow">
        <h3>Casa Node Summary</h3>
      </div>

      <div class="card narrow">
        <h3>Bitcoin</h3>
        <h3>Lightning</h3>
      </div>
    </div>

    <div class="cards">
      <div class="card">
        <h3>Lightning Balances</h3>
      </div>

      <div class="card">
        <h3>Sats App</h3>

        <p>
          Control your Casa Node from your mobile device. Earn 10,000 SatsBack per week for keeping your Node online.
        </p>
      </div>
    </div>
  </div><!-- /.home-index -->
</template>

<script>
  export default {
    layout: 'dashboard',
  }
</script>

<style lang="scss">
  @import "~/assets/css/variables.scss";

  .home-index {
    position: relative;

    .update {
      padding: 1.5em 3em 2em;

      .new {
        text-transform: uppercase;
        font-size: 11px;
        font-weight: 900;
        letter-spacing: 0.92px;
        text-align: center;
        color: $black;
        background-color: $yellow;
        border-radius: 31px;
        padding: 0.4em 1.8em;
        margin-right: 0.5em;
        vertical-align: middle;
      }

      .buttons {
        margin: 0.5em 0 0;
      }
    }

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
  }
</style>
