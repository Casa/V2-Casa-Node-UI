<template>
  <div class="card transactions">
    <section class="primary">
      <div class="flex space-between">
        <h3>Transactions</h3>

        <div class="buttons">
          <a class="button">Get Paid</a>
          <a class="button">Pay Someone</a>
        </div>
      </div>

      <div class="columns">
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
        <div class="column">
          <span class="title">Payment Sent</span>
          <span class="subtitle">abcdef1234567890 * 1h</span>
        </div>

        <div class="column">
          <span class="title">-1337</span>
          <span class="subtitle">$5.55</span>
        </div>
      </div>

      <div class="columns">
        <div class="column">
          <span class="title">Payment Sent</span>
          <span class="subtitle">abcdef1234567890 * 2h</span>
        </div>

        <div class="column">
          <span class="title">-1337</span>
          <span class="subtitle">$5.55</span>
        </div>
      </div>

      <div class="columns">
        <div class="column">
          <span class="title">Payment Received</span>
          <span class="subtitle">abcdef1234567890 * 3h</span>
        </div>

        <div class="column">
          <span class="title">+100,000</span>
          <span class="subtitle">$500.00</span>
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

  .transactions {
    position: relative;
    background-color: transparent;
    border: 3px solid $transparentGray;

    section.primary {
      margin: -2.5em -3em 0;
      padding: 2.5em 3em;
      height: 300px;
      background-color: $transparentGray;
      position: relative;
    }

    section.secondary {
      margin: 2em 0;
      position: relative;
      z-index: 1;
    }

    section.foot {
      margin: 0 -3em -2.5em;
      padding: 0.75em 0 0.25em;
      border-top: 3px solid $transparentGray;
      text-align: center;
    }

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

    .columns {
      position: relative;
      z-index: 1;
    }
  }
</style>
