<template>
  <div class="card stack connections">
    <section class="primary">
      <div>
        <h3>Connections</h3>
      </div>

      <h5 class="system-settings-header">
        Access your connection codes and unlock Tor for increased anonymity and privacy.
      </h5>
      <div class="flex">
        <img src="~/assets/icons/tor.jpg" class="tor-icon">
        <p>
          Tor gives you more privacy when running your Bitcoin and Lightning Node, but there are some things to know in order to keep running your node smoothly on Tor. <a class="lightBlue" target="_blank" href="https://blog.keys.casa/announcing-tor-support-on-casa-node/">Check out our explainer post to learn more</a>.
        </p>
      </div>
    </section> <!-- /.primary -->

    <section class="secondary">
      <div>
        <h4>
          Allow Outside Connections with Sats App and Tor
        </h4>
      </div>

      <div class="columns space-between">
        <div class="column">
          <h6>
            Address for Tor and Sats App
          </h6>
          <p>
            You can also access your web dashboard from outside your home network using the <a class="lightBlue" target="_blank" href="https://www.torproject.org/">Tor browser</a> and the .onion address.
          </p>
        </div>

        <div class="column">
          <CopyField :value="$store.state.system.onionAddress" class="copy" />
          <a class="qr-pill" @click="openSatsAppModal()">
            View Sats App QR Code
          </a>
        </div>
      </div>

      <hr>

      <div class="flex">
        <img src="~/assets/icons/lightning-purple.svg" class="crypto-icon">
        <h5 class="centered-vertically">
          Share Your Lightning Node
        </h5>
      </div>

      <div class="columns space-between">
        <div class="column">
          <h6>
            Local Dashboard IP Address
          </h6>
          <p>
            Access your Casa Node from your home network.
          </p>
        </div>

        <div class="column">
          <CopyField :value="$store.state.system.localHostAddress" class="copy" />
        </div>
      </div>

      <hr>

      <div class="columns space-between">
        <div class="column">
          <h6>
            Lightning Node IP Address
          </h6>
          <p>
            Disable Tor to connect via IP address.
          </p>
        </div>

        <div class="column">
          <CopyField :value="$store.state.lightning.connectionCode" class="copy" />
          <a class="qr-pill" @click="openConnectionCodeModal()">
            View Lightning QR Code
          </a>
          <span class="lndTor">
            Tor <span v-if="lndTor">enabled</span><span v-else>disabled</span>
            <toggle-button v-model="lndTor" :value="lndTor" :sync="true" color="#3bccfc" :labels="true" />
          </span>
        </div>
      </div>

      <hr>

      <div class="flex">
        <img src="~/assets/icons/bitcoin-orange.svg" class="crypto-icon">
        <h5 class="centered-vertically">
          Share Your Bitcoin Node
        </h5>
      </div>

      <div class="columns space-between">
        <div class="column">
          <h6>
            Bitcoin Node IP Address
          </h6>
          <p>
            The IP Address your bitcoin peers see.
          </p>
        </div>

        <div class="column">
          <CopyField :value="$store.state.bitcoin.ipAddress" class="copy" />
        </div>
      </div>

      <div class="columns space-between">
        <div class="column">
          <h6>
            Bitcoin Tor Connections
          </h6>
          <p>
            Disable Tor to connect via IP address.
          </p>
        </div>

        <div class="column">
          <CopyField :value="$store.state.bitcoin.onionAddress" class="copy" />
          <span class="bitcoindTor">
            Tor <span v-if="bitcoindTor">enabled</span><span v-else>disabled</span>
            <toggle-button v-model="bitcoindTor" :value="bitcoindTor" :sync="true" color="#3bccfc" :labels="true" />
          </span>
        </div>
      </div>
    </section>

    <div class="columns space-between">
      <div class="column">
        <h6>
          SSH Connections
        </h6>
        <p>
          Enable SSH connections on your LAN.
        </p>
      </div>

      <div class="column">
        <span class="sshEnabled">
            SSH <span v-if="sshEnabled">enabled</span><span v-else>disabled</span>
            <toggle-button v-model="sshEnabled" :value="sshEnabled" :sync="true" color="#3bccfc" :labels="true" />
          </span>
      </div>
    </div>

  </div>
</template>

<script>
  import API from '~/helpers/api';
  import Events from '~/helpers/events';
  import SatsAppModal from '~/components/system/modals/SatsApp';
  import ConnectionCodeModal from '~/components/system/modals/ConnectionCode';

  export default {
    data() {
      return {
        lndTor: false,
        bitcoindTor: false,
        sshEnabled: false,
      }
    },
    async created() {
      if(!this.$store.state.bitcoin.operational) {
        await this.$store.dispatch('bitcoin/getStatus');
      }

      this.$store.dispatch('system/getAddresses');
      this.$store.dispatch('bitcoin/getAddresses');
      this.$store.dispatch('lightning/getConnectionCode');

      const { bitcoind, lnd, system} = await API.get(this.$axios, `${this.$env.API_MANAGER}/v1/settings/read`);
      this.lndTor = lnd.lndTor;
      this.bitcoindTor = bitcoind.bitcoindTor;
      this.sshEnabled = system.sshEnabled;
    },

    methods: {
      openSatsAppModal() {
        Events.$emit('modal-open', SatsAppModal);
      },
      openConnectionCodeModal() {
        Events.$emit('modal-open', ConnectionCodeModal);
      }
    },
  }
</script>

<style lang="scss">
  @import "~/assets/css/variables.scss";

  .connections {

    .tor-icon {
      width: 75px;
      margin-right: 1em;
    }

    .crypto-icon {
      width: 35px;
    }

    .system-settings-header {
      margin-bottom: 1em;
    }

    h3 {
      margin-bottom: 1em;
    }

    h4 {
      margin-bottom: 1em;
    }

    h5 {
      margin-left: 0.5em;
    }

    h6 {
      margin-bottom: 1em;
    }

    .copy {
      margin-left: auto;
      width: 500px;
      color: $white;
    }

    .lightBlue {
      color: $lightBlue;
    }

    .qr-pill {
      border: none;
      color: $white;
      text-decoration: none;
      margin-top: 1em;
      width: 232.3px;
      height: 35px;
      border-radius: 20.5px;
      background-color: rgba(255, 255, 255, 0.07);
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 16px;
      font-weight: bold;
    }

    .lndTor {
      float: right;
      margin-top: -1.8em;
      color: #8d8e8e;
    }

    .lndTor .vue-js-switch {
      margin-top: 0em;
      margin-left: 1em;
    }

    .bitcoindTor {
      float: right;
      margin-top: 1.5em;
      color: #8d8e8e;
    }

    .bitcoindTor .vue-js-switch {
      margin-top: 0em;
      margin-left: 1em;
    }

    .sshEnabled {
      float: right;
      margin-top: 1.5em;
      color: #8d8e8e;
    }

    .sshEnabled .vue-js-switch {
      margin-top: 0em;
      margin-left: 1em;
    }
  }
</style>
