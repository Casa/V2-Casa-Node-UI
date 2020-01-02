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
            {{ $store.state.bitcoin.balance.total | units }}
          </div>

          <div class="label">
            Bitcoin Balance
          </div>
        </div>

        <div v-if="$store.state.bitcoin.balance.pendingIn > 0" class="column narrow">
          <div class="numeric">
            +{{ $store.state.bitcoin.balance.pendingIn | units }}
          </div>

          <div class="label">
            Pending Inbound
          </div>
        </div>

        <div v-if="$store.state.bitcoin.balance.pendingOut > 0" class="column narrow">
          <div class="numeric">
            -{{ $store.state.bitcoin.balance.pendingOut | units }}
          </div>

          <div class="label">
            Pending Outbound
          </div>
        </div>
      </div>
    </section> <!-- /.primary -->

    <section class="secondary">
      <div v-for="(transaction, index) in $store.state.bitcoin.pending" :key="`pending-${index}`" class="columns">
        <div class="column left">
          <span v-if="transaction.type === 'ON_CHAIN_TRANSACTION_SENT'" class="title">Payment Sent (Pending)</span>
          <span v-else class="title">Payment Received (Pending)</span>

          <span class="subtitle">{{ transaction.destAddresses[0] }} <span class="separator" /> 1h</span>
        </div>

        <div class="column right">
          <span class="title numeric">{{ transaction.amount | units }}</span>
          <span class="subtitle numeric">{{ Math.abs(transaction.amount) | usd }}</span>
        </div>
      </div>

      <div v-for="(transaction, index) in $store.state.bitcoin.transactions" :key="`confirmed-${index}`" class="columns">
        <div class="column left">
          <span v-if="transaction.type === 'ON_CHAIN_TRANSACTION_SENT'" class="title">Payment Sent</span>
          <span v-else class="title">Payment Received</span>

          <span class="subtitle">{{ transaction.destAddresses[0] }} <span class="separator" /> 2h</span>
        </div>

        <div class="column right">
          <span class="title numeric">{{ (transaction.amount) | units }}</span>
          <span class="subtitle numeric">{{ Math.abs(transaction.amount) | usd }}</span>
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
    name: 'BitcoinTransactions',
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
    .column.narrow {
      min-width: 250px;
    }
  }
</style>
