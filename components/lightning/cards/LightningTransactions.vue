<template>
  <div class="card stack lightning-transactions">
    <section class="primary">
      <div class="flex space-between">
        <h3>Transactions</h3>

        <div class="buttons">
          <a class="button" @click="createInvoice()">Get Paid</a>
          <a class="button" @click="payInvoice()">Pay Someone</a>
        </div>
      </div>

      <div class="columns totals">
        <div class="column">
          <div class="big numeric">
            {{ $store.state.lightning.maxReceive | localized }}
          </div>

          <div class="label">
            Max Incoming Payment
          </div>
        </div>

        <div class="column narrow">
          <div class="big numeric">
            {{ $store.state.lightning.maxSend | localized }}
          </div>

          <div class="label">
            Max Outgoing Payment
          </div>
        </div>
      </div>
    </section> <!-- /.primary -->

    <section class="secondary">
      <div v-for="(transaction, index) in $store.state.lightning.pendingTransactions" :key="`pending-${index}`" class="columns">
        <div class="column left">
          <span v-if="Math.sign(parseInt(transaction.value)) === -1" class="title">Sending Lightning Payment</span>
          <span v-else class="title">Receiving Lightning Payment</span>
          <span class="subtitle">
            <template v-if="transaction.memo">
              {{ transaction.memo }} <span class="separator" />
            </template>

            1h
          </span>
        </div>

        <div class="column right">
          <span class="title numeric">{{ transaction.value | localized }}</span>
          <span class="subtitle numeric">{{ Math.abs(transaction.value) | usd }}</span>
        </div>
      </div>

      <div v-for="(transaction, index) in $store.state.lightning.confirmedTransactions" :key="`confirmed-${index}`" class="columns">
        <div class="column left">
          <span v-if="Math.sign(parseInt(transaction.value)) === -1" class="title">Sent Lightning Payment</span>
          <span v-else class="title">Received Lightning Payment</span>
          <span class="subtitle">
            <template v-if="transaction.memo">
              {{ transaction.memo }} <span class="separator" />
            </template>

            1h
          </span>
        </div>

        <div class="column right">
          <span class="title numeric">{{ transaction.value | localized }}</span>
          <span class="subtitle numeric">{{ Math.abs(transaction.value) | usd }}</span>
        </div>
      </div>
    </section>

    <section class="foot is-hidden">
      <a class="button">See All 188 Transactions</a>
    </section>
  </div>
</template>

<script>
  import Events from '~/helpers/events';
  import CreateInvoiceModal from '~/components/lightning/modals/CreateInvoice';
  import PayInvoiceModal from '~/components/lightning/modals/PayInvoice';

  export default {
    methods: {
      createInvoice() {
        Events.$emit('modal-open', CreateInvoiceModal);
      },

      payInvoice() {
        Events.$emit('modal-open', PayInvoiceModal);
      },
    }
  }
</script>

<style lang="scss">
  @import "~/assets/css/variables.scss";

  .lightning-transactions {
    //
  }
</style>
