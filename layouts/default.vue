<template>
  <div class="layout-default">
    <nuxt />
  </div>
</template>

<style lang="scss">
  @import "~/assets/css/global.scss";

  .layout-default {
    // This child selector is necessary since Vue templates always have a single root element
    & > div {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
    }

    header {
      position: absolute;
      right: 0;
      top: 0;
    }

    main {
      text-align: center;
    }

    footer {
      position: absolute;
      bottom: 0;
    }
  }
</style>
