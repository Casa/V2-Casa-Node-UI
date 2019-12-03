<template>
  <div class="card stack channels">
    <section class="primary">
      <div class="flex space-between">
        <h3>Channels</h3>

        <div class="buttons">
          <a class="button" @click="manage()">Manage Channels</a>
          <a class="button" @click="newChannel">Open Channel</a>
        </div>
      </div>

      <div class="columns totals">
        <div class="column">
          <div class="big numeric">
            {{ $store.state.lightning.channels.length }}
          </div>

          <div class="label">
            Lightning Channels
          </div>
        </div>

        <div class="column">
          <div class="big numeric">
            0
          </div>

          <div class="label">
            Autopilot Channels
          </div>
        </div>

        <div class="column right">
          <div class="big numeric">
            {{ $store.state.lightning.balance.total | localized }}
          </div>

          <div class="label">
            Sats in Lightning
          </div>
        </div>

        <div class="column right">
          <div class="big numeric">
            {{ $store.state.lightning.balance.pending | localized }}
          </div>

          <div class="label">
            Sats Pending
          </div>
        </div>
      </div>
    </section> <!-- /.primary -->

    <section class="secondary">
      <div class="columns" v-for="(channel, index) in $store.state.lightning.channels" :key="index">
        <div class="column left">
          <span class="title">{{ channel.name }}</span>
          <span class="subtitle">{{ channel.purpose }}</span>
        </div>

        <div class="column right">
          <span class="title status active">Online</span>
          <span class="subtitle numeric">
            <strong>Can Send:</strong> {{ channel.localBalance | localized }}<br>
            <strong>Can Receive:</strong> {{ channel.remoteBalance | localized }}
          </span>
        </div>
      </div>
    </section>

    <section class="foot is-hidden">
      <a class="button">See All 9 Channels</a>
    </section>
  </div>
</template>

<script>
  import Events from '~/helpers/events';
  import ManageModal from '~/components/lightning/modals/Manage';
  import NewChannel from '~/components/lightning/modals/NewChannel';

  export default {
    methods: {
      newChannel() {
        Events.$emit('modal-open', NewChannel);
      },

      manage() {
        Events.$emit('modal-open', ManageModal);
      },
    }
  }
</script>

<style lang="scss">
  @import "~/assets/css/variables.scss";

  .channels {
    .column.narrow {
      min-width: 250px;
    }

    .title.status {
      font-weight: bold;
    }

    .subtitle {
      // Todo: Refactor into min-width so when values get long it doesn't overflow
      strong {
        font-family: $standardFonts;
        color: $white;
        font-size: 14px;
        font-weight: bold;
        position: absolute;
        width: 100px;
        right: 140px;
      }
    }

    .tooltip {
      display: none;
      opacity: 0;
      transition: opacity .15s;
      pointer-events: none;
      padding: 4px;
      z-index: 10000;
    }

    .tooltip .tooltip-content {
      background: black;
      color: white;
      border-radius: 16px;
      padding: 5px 10px 4px;

    }

    .tooltip.tooltip-open-transitionend {
      display: block;
    }

    .tooltip.tooltip-after-open {
      opacity: 1;
    }
  }
</style>
