<template>
  <div class="card node-overview">
    <div class="flex space-between">
      <h3>Node Overview</h3>
      <a class="button">Manage Bitcoin Node</a>
    </div>

    <div class="columns space-between">
      <div class="column narrow">
        <h1 class="status" :class="bitcoinStatus.class">
          {{ bitcoinStatus.text }}
        </h1>

        <h6 class="numeric">
          {{ $store.state.bitcoin.ipAddress || 'Loading...' }}
        </h6>

        <div class="label">
          Connection Status
        </div>
      </div>

      <div class="column narrow">
        <h1 class="numeric status" :class="bitcoinStatus.class">
          {{ $store.state.bitcoin.percent }}%
        </h1>

        <h6>
          <span class="numeric">{{ $store.state.bitcoin.currentBlock | localized }}</span>
          <span class="spacer">of</span>
          <span class="numeric">{{ $store.state.bitcoin.blockHeight | localized }}</span>
        </h6>

        <div class="label">
          Block Sync Status
        </div>
      </div>

      <div class="column narrow">
        <h1>
          <span class="numeric">8</span>
          Outbound
        </h1>

        <h6>
          <span class="numeric">10</span>
          Inbound
        </h6>

        <div class="label">
          Connected Peers
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    computed: {
      // Create a local copy of the node's status for better readability in templates
      ...mapGetters({
        bitcoinStatus: 'bitcoin/status',
      })
    },
  }
</script>

<style lang="scss">
  @import "~/assets/css/variables.scss";

  .node-overview {
    h1 {
      font-weight: bold;

      &.numeric {
        font-weight: normal;
      }
    }

    h6 {
      color: $gray;
      font-weight: normal;
      white-space: nowrap;
    }

    .spacer {
      margin: 0 0.4em;
    }

    .button {
      margin-top: -0.25em;
      margin-right: -0.25em;
    }

    .columns {
      margin-top: 2em;
    }

    .column {
      min-width: 250px;
    }

    .label {
      margin-top: 2em;
    }
  }
</style>
