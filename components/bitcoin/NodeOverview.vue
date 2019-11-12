<template>
  <div class="card node-overview">
    <div class="flex space-between">
      <h3>Node Overview</h3>
      <a class="button">Manage Bitcoin Node</a>
    </div>

    <div class="columns space-between">
      <div class="column narrow">
        <h1 class="status active">
          Online
        </h1>

        <h6 class="numeric">
          {{ $store.state.bitcoin.ipAddress || 'Loading...' }}
        </h6>

        <div class="label">
          Connection Status
        </div>
      </div>

      <div class="column narrow">
        <h1 class="numeric status syncing">
          98%
        </h1>

        <h6>
          <span class="numeric">584,768</span>
          <span class="spacer">of</span>
          <span class="numeric">596,703</span>
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
