<template>
  <div class="card stack bitcoin-transactions">
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
    //
  }
</style>
