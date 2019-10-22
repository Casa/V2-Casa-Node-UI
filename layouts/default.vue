<template>
  <div class="layout-default">
    <nuxt />
  </div>
</template>

<style lang="scss">
  @import "~/assets/css/global.scss";

  .layout-default {
    & > div {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      min-height: 100vh;
    }

    header {
      align-self: flex-end;
      flex-grow: 1;
    }

    main {
      flex-grow: 1;
    }

    footer {
      flex-grow: 0;
    }
  }
</style>
