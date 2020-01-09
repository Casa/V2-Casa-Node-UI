<template>
  <div class="card lightning-balances">
    <h3>Lightning Balances</h3>

    <div class="columns">
      <div class="column">
        <div class="numeric">
          {{ $store.state.lightning.balance.confirmed | units }}
        </div>

        <div class="label">
          <span v-if="displayUnit === 'sats'">Sats </span>
          <span v-else>Btc </span>
          in Lightning
        </div>
      </div>

      <div class="column right">
        <div class="numeric">
          {{ $store.state.lightning.balance.pending | units }}
        </div>

        <div class="label">
          <span v-if="displayUnit === 'sats'">Sats </span>
          <span v-else>Btc </span>
          Pending
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    name: 'LightningBalances',
    computed: {
      ...mapGetters({ displayUnit: 'system/getUnits' })
    }
  }
</script>

<style lang="scss">
  @import "~/assets/css/variables.scss";

  .lightning-balances {
    .numeric {
      font-size: 56px;
      margin-top: 1.4em;
      color: $white;
    }

    .label {
      font-size: 12px;
      font-weight: 900;
      line-height: 1.42;
      letter-spacing: 0.92px;
      text-transform: uppercase;
      color: $white;
    }
  }
</style>
