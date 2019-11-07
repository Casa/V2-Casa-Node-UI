<template>
  <div class="card stack lightning-transactions">
    <section class="primary">
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
            1,345,000
          </div>

          <div class="label">
            Sats Available
          </div>
        </div>

        <div class="column">
          <div class="big numeric">
            1,230,000
          </div>

          <div class="label">
            Max Incoming Payment
          </div>
        </div>

        <div class="column narrow">
          <div class="big numeric">
            440,000
          </div>

          <div class="label">
            Max Outgoing Payment
          </div>
        </div>
      </div>
    </section> <!-- /.primary -->

    <section class="secondary">
      <div class="columns">
        <div class="column left">
          <span class="title">Received Satoshis</span>
          <span class="subtitle">Hello there! <span class="separator" /> 1h</span>
        </div>

        <div class="column right">
          <span class="title numeric">+1337</span>
          <span class="subtitle numeric">$5.55</span>
        </div>
      </div>

      <div class="columns">
        <div class="column left">
          <span class="title">Expired Request</span>
          <span class="subtitle">Show me the money <span class="separator" /> 2h</span>
        </div>

        <div class="column right">
          <span class="title numeric">+1337</span>
          <span class="subtitle numeric">$5.55</span>
        </div>
      </div>

      <div class="columns">
        <div class="column left">
          <span class="title">Sent Satoshis</span>
          <span class="subtitle">For the "thing" <span class="separator" /> 3h</span>
        </div>

        <div class="column right">
          <span class="title numeric">-100,000</span>
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

  .lightning-transactions {
    //
  }
</style>
