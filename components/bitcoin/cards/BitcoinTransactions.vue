<template>
  <div class="card stack bitcoin-transactions">
    <section class="primary">
      <div class="graph" />

      <div class="flex space-between">
        <h3>Transactions</h3>

        <div class="buttons">
          <a class="button" @click="deposit()">Get Paid</a>
          <a class="button" @click="withdraw()">Pay Someone</a>
        </div>
      </div>

      <div class="columns totals">
        <div class="column">
          <div class="big numeric">
            {{ $store.state.bitcoin.balance.total }}
          </div>

          <div class="label">
            Bitcoin Balance
          </div>
        </div>

        <div class="column narrow">
          <div class="numeric">
            +{{ $store.state.bitcoin.balance.pendingIn }}
          </div>

          <div class="label">
            Pending Inbound
          </div>
        </div>

        <div class="column narrow">
          <div class="numeric">
            -{{ $store.state.bitcoin.balance.pendingOut }}
          </div>

          <div class="label">
            Pending Outbound
          </div>
        </div>
      </div>
    </section> <!-- /.primary -->

    <section class="secondary">
      <div v-for="(transaction, index) in $store.state.bitcoin.pending" :key="index" class="columns">
        <div class="column left">
          <span v-if="transaction.type === 'ON_CHAIN_TRANSACTION_SENT'" class="title">Payment Sent (Pending)</span>
          <span v-else class="title">Payment Received (Pending)</span>

          <span class="subtitle">{{ transaction.destAddresses[0] }} <span class="separator" /> 1h</span>
        </div>

        <div class="column right">
          <span class="title numeric">{{ transaction.amount }}</span>
          <span class="subtitle numeric">$5.55</span>
        </div>
      </div>

      <div v-for="(transaction, index) in $store.state.bitcoin.transactions" :key="index" class="columns">
        <div class="column left">
          <span v-if="transaction.type === 'ON_CHAIN_TRANSACTION_SENT'" class="title">Payment Sent</span>
          <span v-else class="title">Payment Received</span>

          <span class="subtitle">{{ transaction.destAddresses[0] }} <span class="separator" /> 2h</span>
        </div>

        <div class="column right">
          <span class="title numeric">{{ transaction.amount }}</span>
          <span class="subtitle numeric">$5.55</span>
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
  import DepositModal from '~/components/bitcoin/modals/Deposit';
  import WithdrawModal from '~/components/bitcoin/modals/Withdraw';

  export default {
    methods: {
      deposit() {
        Events.$emit('modal-open', DepositModal);
      },

      withdraw() {
        Events.$emit('modal-open', WithdrawModal);
      },
    }
  }
</script>

<style lang="scss">
  @import "~/assets/css/variables.scss";

  .bitcoin-transactions {
    //
  }
</style>