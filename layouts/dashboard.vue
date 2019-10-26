<template>
  <div class="layout-dashboard">
    <aside>
      <nuxt-link to="/home">
        Home
      </nuxt-link>

      <nuxt-link to="/bitcoin">
        Bitcoin
      </nuxt-link>

      <nuxt-link to="/lightning">
        Lightning
      </nuxt-link>

      <nuxt-link to="/btcpay">
        BTCPay Server
      </nuxt-link>

      <nuxt-link to="/system">
        System
      </nuxt-link>
    </aside>

    <main>
      <nuxt />
    </main>
  </div>
</template>

<style lang="scss">
  @import "~/assets/css/global.scss";

  .layout-dashboard {
    display: flex;
    min-height: 100vh;

    aside {
      width: 250px;
      border-right: 2px solid $transparentWhite;
      padding: 3em;

      a {
        color: $gray;
        display: block;
        font-weight: bold;
        margin-bottom: 2em;
        outline: none;
      }

      .nuxt-link-active {
        color: $purple;
      }
    }

    main {
      padding: 3em 4em;
    }
  }
</style>
