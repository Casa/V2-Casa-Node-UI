<template>
  <div class="card extras">
    <h3 class="section-headline">Connections</h3>

    <h5 class="headline">
      Access your connection codes and unlock Tor for increased annonymity and privacy.
    </h5>
    <div class="flex">
      <img src="~/assets/icons/tor.jpg" class="tor-icon">
      <p>
        Tor gives you more privacy when running your Bitcoin and Lightning Node, but there are some things to know in order to keep running your node smoothly on Tor. <span class="lightBlue">Check out our explainer post to learn more</span>.
      </p>
    </div>

    <hr>

    <div>
      <h4>
        Allow Outside Connections with Sats App and Tor
      </h4>
    </div>

    <div class="columns space-between">
      <div class="column">
        <h6>Address for Tor and Sats App</h6>

        <p>
          You can also access your web dashboard from outside your home network using the <span class="lightBlue">Tor browser</span> and the .onion address.
        </p>
      </div>

      <div class="column">
        <div>
          <CopyField :value="$store.state.system.onionAddress" class="copy"/>
        </div>
        <div class="qr-pill" @click="openSatsAppModal()">
          <span class="qr-button">
            View Sats App QR Code
          </span>
        </div>
      </div>
    </div>

    <hr>

    <div class="flex">
      <div>
        <h6>Local Dashboard IP Address</h6>

        <p>
          Access your Casa Node from your home network.
        </p>
      </div>

      <CopyField :value="$store.state.system.localHostAddress" class="copy"/>
    </div>

    <hr>

    <div class="flex">
      <div>
        <h6>Lightning Node IP Address</h6>

        <p>
          Disable Tor to connect via IP address.
        </p>
      </div>

      <div class="column">
        <div>
          <CopyField :value="$store.state.lightning.connectionCode" class="copy"/>
        </div>
        <div class="qr-pill" @click="openConnectionCodeModal()">
            <span class="qr-button">
              View Lightning QR Code
            </span>
        </div>
      </div>
    </div>

    <hr>

    <div class="flex">
      <div>
        <h6>Bitcoin Node IP Address</h6>

        <p>
          Blah blah blah.
        </p>
      </div>

      <CopyField :value="$store.state.bitcoin.ipAddress" class="copy"/>

    </div>

    <div class="flex">

      <div>
        <h6>Bitcoin Tor Connections</h6>

        <p>
          Disable Tor to connect via IP address.
        </p>
      </div>

      <CopyField :value="$store.state.bitcoin.onionAddress" class="copy"/>
    </div>

    <hr>


  </div>
</template>

<script>

  import Events from '~/helpers/events';
  import SatsAppModal from '~/components/system/modals/SatsApp';
  import ConnectionCodeModal from '~/components/system/modals/ConnectionCode';

  export default {
    data() {
      return {
        onionAddress: 'loading...',
        deviceHost: 'loading...',
      }
    },
    methods: {
      openSatsAppModal() {
        Events.$emit('modal-open', SatsAppModal);
      },
      openConnectionCodeModal() {
        Events.$emit('modal-open', ConnectionCodeModal);
      }
    },

    created() {
      this.$store.dispatch('system/getAddresses');

      // TODO how to short circuit this?
      this.$store.dispatch('bitcoin/getStatus');
      this.$store.dispatch('bitcoin/getAddresses');
      this.$store.dispatch('lightning/getConnectionCode');
    },
  }
</script>

<style lang="scss">
  @import "~/assets/css/variables.scss";

  .extras {

    .tor-icon {
      width: 75px;
      margin-right: 1em;
    }

    h3 {
      margin-bottom: 1em;
    }

    h4 {
      margin-bottom: 1em;
    }

    h5 {
      margin-bottom: 1em;
    }

    h6 {
      margin-bottom: 1em;
    }

    .copy {
      margin-left: auto;
    }

    .lightBlue {
      color: $lightBlue;
    }

    .qr-pill {
      border: none;
      color: $white;
      text-align: center;
      text-decoration: none;
      margin: 4px 2px;
      font-size: 11px;
      width: 232.3px;
      height: 35px;
      border-radius: 20.5px;
      background-color: rgba(255, 255, 255, 0.07);
    }

    .qr-button {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 16px;
      font-weight: bold;
      color: $white;
    }
  }
</style>
