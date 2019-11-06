<template>
  <div class="layout-dashboard" :class="{ blurred: blurred }">
    <aside>
      <nuxt-link to="/home">
        <img src="~/assets/icons/casa.svg">

        Home
      </nuxt-link>

      <nuxt-link to="/bitcoin">
        <img src="~/assets/icons/bitcoin.svg">

        Bitcoin
      </nuxt-link>

      <nuxt-link to="/lightning">
        <img src="~/assets/icons/lightning.svg">

        Lightning
      </nuxt-link>

      <!--
      <nuxt-link to="/btcpay">
        BTCPay Server
      </nuxt-link>
      -->

      <nuxt-link to="/system">
        <img src="~/assets/icons/system.svg">

        System
      </nuxt-link>
    </aside>

    <main>
      <nuxt />
    </main>
  </div>
</template>

<script>
  import Events from '~/helpers/events';

  export default {
    data() {
      return {
        blurred: false,
      }
    },

    created() {
      Events.$on('modal-opened', () => {
        this.blurred = true;
      });

      Events.$on('modal-closed', () => {
        this.blurred = false;
      });
    },

    destroyed() {
      Events.$off('modal-opened');
      Events.$off('modal-closed');
    }
  }
</script>

<style lang="scss">
  @import "~/assets/css/global.scss";

  .layout-dashboard {
    display: flex;
    min-height: 100vh;

    &.blurred {
      aside, .page {
        filter: blur(8px);
      }
    }

    aside {
      width: 250px;
      border-right: 2px solid $transparentWhite;
      padding: 3em;

      a {
        color: $gray;
        display: block;
        font-weight: bold;
        margin-bottom: 2.5em;
        outline: none;
      }

      img {
        vertical-align: middle;
        margin-right: 1em;
      }

      .nuxt-link-active {
        color: $purple;
      }
    }

    main {
      padding: 3em 6em 4em 4em;
      flex-grow: 1;

      .page {
        position: relative;
      }
    }
  }
</style>
