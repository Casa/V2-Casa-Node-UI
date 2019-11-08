<template>
  <div class="card grow node-summary">
    <h3>Casa Node Summary</h3>

    <div class="columns">
      <div class="column">
        <div class="numeric">
          {{ $store.state.bitcoin.peers.total }}
        </div>

        <div class="label bitcoin">
          Bitcoin Peers
        </div>
      </div>

      <div class="column">
        <div class="numeric">
          {{ $store.state.lightning.channels.length }}
        </div>

        <div class="label lightning">
          Lightning Channels
        </div>
      </div>

      <div class="column">
        <div class="numeric">
          {{ $store.state.lightning.maxSend }}
        </div>

        <div class="label">
          Max Lightning Send
        </div>
      </div>

      <div class="column">
        <div class="numeric">
          {{ $store.state.lightning.maxReceive }}
        </div>

        <div class="label">
          Max Lightning Receive
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  @import "~/assets/css/variables.scss";

  .node-summary {
    .numeric {
      font-size: 56px;
      margin-top: 0.7em;
      color: $white;
    }

    .label {
      font-size: 12px;
      font-weight: 900;
      line-height: 1.42;
      letter-spacing: 0.92px;
      text-transform: uppercase;
      color: $white;

      &.bitcoin {
        color: $orange;
      }

      &.lightning {
        color: $purple;
      }
    }
  }
</style>
