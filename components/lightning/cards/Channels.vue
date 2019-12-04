<template>
  <div class="card stack channels">
    <section class="primary">
      <div class="flex space-between">
        <h3>Channels</h3>

        <div class="buttons">
          <a class="button">Manage Channels</a>
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

        <div class="column">
          <div class="big numeric">
            {{ $store.state.lightning.balance.total }}
          </div>

          <div class="label">
            Sats in Lightning
          </div>
        </div>

        <div class="column narrow">
          <div class="big numeric">
            {{ $store.state.lightning.balance.pending }}
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
            <strong>Can Send:</strong> {{ channel.localBalance }}<br>
            <strong>Can Receive:</strong> {{ channel.remoteBalance }}
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
  import NewChannel from '~/components/lightning/modals/NewChannel';

  export default {
    methods: {
      newChannel() {
        Events.$emit('modal-open', NewChannel);
      },
    }
  }
</script>


<style lang="scss">
  @import "~/assets/css/variables.scss";

  .channels {
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
  }
</style>
