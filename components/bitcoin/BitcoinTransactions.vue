<template>
  <div class="card bitcoin-transactions">
    <section class="primary">
      <div class="graph" />

      <div class="flex space-between">
        <h3>Transactions</h3>

        <div class="buttons">
          <a class="button">Get Paid</a>
          <a class="button">Pay Someone</a>
        </div>
      </div>

      <div class="columns totals">
        <div class="column">
          <div class="big numeric">
            101,337
          </div>

          <div class="label">
            Bitcoin Balance
          </div>
        </div>

        <div class="column narrow">
          <div class="numeric">
            +1337
          </div>

          <div class="label">
            Pending Inbound
          </div>
        </div>

        <div class="column narrow">
          <div class="numeric">
            -336
          </div>

          <div class="label">
            Pending Outbound
          </div>
        </div>
      </div>
    </section> <!-- /.primary -->

    <section class="secondary">
      <div class="columns">
        <div class="column left">
          <span class="title">Payment Sent</span>
          <span class="subtitle">abcdef1234567890 * 1h</span>
        </div>

        <div class="column right">
          <span class="title numeric">-1337</span>
          <span class="subtitle numeric">$5.55</span>
        </div>
      </div>

      <div class="columns">
        <div class="column left">
          <span class="title">Payment Sent</span>
          <span class="subtitle">abcdef1234567890 * 2h</span>
        </div>

        <div class="column right">
          <span class="title numeric">-1337</span>
          <span class="subtitle numeric">$5.55</span>
        </div>
      </div>

      <div class="columns">
        <div class="column left">
          <span class="title">Payment Received</span>
          <span class="subtitle">abcdef1234567890 * 3h</span>
        </div>

        <div class="column right">
          <span class="title numeric">+100,000</span>
          <span class="subtitle numeric">$500.00</span>
        </div>
      </div>
    </section>

    <section class="foot">
      <a class="button">See All 188 Transactions</a>
    </section>
  </div>
</template>

<style lang="scss">
  @import "~/assets/css/variables.scss";

  .bitcoin-transactions {
    position: relative;
    background-color: transparent;
    border: 3px solid $transparentGray;

    section.primary {
      margin: -2.5em -3em 0;
      padding: 2.5em 3em;
      height: 300px;
      background-color: $transparentGray;
      position: relative;

      .graph {
        position: absolute;
        top: auto;
        left: 0;
        right: 0;
        bottom: 3px;
        height: 8em;
        background-image: $purpleGradientVertical;
        z-index: 0;
      }

      .totals {
        position: absolute;
        bottom: 2em;
        left: 3em;
        right: 4em;
        z-index: 1;
        align-items: flex-end;
        color: $white;

        .narrow {
          min-width: 200px;
          text-align: right;
        }
      }

      .buttons {
        margin-top: -0.75em;
        margin-right: -1em;
      }
    }

    section.secondary {
      margin: 2em 0;
      position: relative;
      z-index: 1;

      .title {
        display: block;
        color: $white;
        font-size: 18px;
      }

      .subtitle {
        display: block;
        color: $gray;
        font-size: 16px;
      }

      .columns {
        margin-top: 1.5em;
        margin-bottom: 2.5em;
      }

      .column.right {
        text-align: right;
      }
    }

    section.foot {
      margin: 0 -3em -2.5em;
      padding: 0.75em 0 0.25em;
      border-top: 3px solid $transparentGray;
      text-align: center;
    }
  }
</style>
