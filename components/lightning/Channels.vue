<template>
  <div class="card stack channels">
    <section class="primary">
      <div class="flex space-between">
        <h3>Channels</h3>

        <div class="buttons">
          <a class="button">Manage Channels</a>
          <a class="button">Open Channel</a>
        </div>
      </div>

      <div class="columns totals">
        <div class="column">
          <div class="big numeric">
            4
          </div>

          <div class="label">
            Lightning Channels
          </div>
        </div>

        <div class="column">
          <div class="big numeric">
            13
          </div>

          <div class="label">
            Autopilot Channels
          </div>
        </div>

        <div class="column">
          <div class="big numeric">
            14,600
          </div>

          <div class="label">
            Sats in Lightning
          </div>
        </div>

        <div class="column">
          <div class="big numeric">
            400
          </div>

          <div class="label">
            Sats Pending
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

  .channels {
    //
  }
</style>
