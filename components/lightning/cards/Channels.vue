<template>
  <div class="card stack channels">
    <section class="primary">
      <div class="flex space-between">
        <h3>Channels</h3>

        <div class="buttons">
          <a class="button" @click="manage">Manage Channels</a>
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
            {{ autopilotCount }}
          </div>

          <div class="label">
            Autopilot Channels
          </div>
        </div>

        <div class="column right">
          <div class="big numeric">
            {{ $store.state.lightning.balance.total | units }}
          </div>

          <div class="label">
            <span v-if="displayUnit === 'sats'">Sats </span>
            <span v-else>Btc </span>
            in Lightning
          </div>
        </div>

        <div class="column right">
          <div class="big numeric">
            {{ $store.state.lightning.balance.pending | units }}
          </div>

          <div class="label">
            <span v-if="displayUnit === 'sats'">Sats </span>
            <span v-else>Btc </span>
            Pending
          </div>
        </div>
      </div>
    </section> <!-- /.primary -->

    <section class="secondary">
      <div v-for="(channel, index) in $store.state.lightning.channels" :key="`channel-${index}`" class="columns channel-item" @click="editChannel(channel)">
        <div class="column left">
          <span class="title">{{ channel.name }}</span>
          <span class="subtitle">{{ channel.purpose }}</span>
        </div>

        <div class="column right">
          <span v-if="channel.status === 'online'" class="title status active">Online</span>
          <span v-else-if="channel.status === 'offline'" class="title status inactive">Offline</span>
          <span v-else-if="channel.status === 'opening'" class="title status syncing">Opening</span>
          <span v-else-if="channel.status === 'closing'" class="title status syncing">Closing</span>
          <span class="subtitle numeric">
            <strong>Can Send:</strong> {{ channel.localBalance | units }}<br>
            <strong>Can Receive:</strong> {{ channel.remoteBalance | units }}
          </span>
        </div>
      </div>
    </section>

    <section class="foot is-hidden">
      <a class="button">See All Channels</a>
    </section>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import Events from '~/helpers/events';
  import ManageModal from '~/components/lightning/modals/Manage';
  import NewChannel from '~/components/lightning/modals/NewChannel';
  import EditChannel from '~/components/lightning/modals/EditChannel';

  export default {

    data() {
      return {
        autopilotCount: 0,
      }
    },
    computed: {
      ...mapGetters({ displayUnit: 'system/getUnits' })
    },
    updated() {
      let count = 0;

      for (const channel of this.$store.state.lightning.channels) {
        if (!channel.managed && channel.initiator) {
          count++;
        }
      }

      this.autopilotCount = count;
    },
    methods: {
      newChannel() {
        Events.$emit('modal-open', NewChannel);
      },

      manage() {
        Events.$emit('modal-open', ManageModal);
      },

      editChannel(channel) {
        this.$store.dispatch('lightning/selectChannel', channel);
        Events.$emit('modal-open', EditChannel);
      }
    }
  }
</script>

<style lang="scss">
  @import "~/assets/css/variables.scss";
  .card.stack.channels {
    padding-left: 0;
    padding-right: 0;

    .primary {
      margin-left: 0;
      margin-right: 0;
    }

    .secondary {
      margin-top: 0;

      .channel-item {
        margin-top: 0;
        padding-left: 3em;
        padding-right: 3em;
        &:hover {
          background: rgba(255, 255, 255, 0.06);
        }

        .left {
          .title {
            position: relative;
            top: 8px;
          }
          .subtitle {
            position: relative;
            top: 8px;
          }
        }
      }
    }
  }

  .channels {
    .column.narrow {
      min-width: 250px;
    }

    .title.status {
      font-weight: bold;
    }

    .big.numeric {
      // Reduce size to accommodate sats view
      font-size: 48px !important;
      letter-spacing: -2px;
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

    .channel-item {
      cursor: pointer;
    }
  }
</style>
