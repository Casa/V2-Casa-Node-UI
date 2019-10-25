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
      bottom: 3vh;
    }

    h2 {
      margin: 1.5em 0 0.5em;
      line-height: 1.44;
    }

    p {
      color: $translucentWhite;
      font-size: 24px;
      font-weight: 500;
      line-height: 1.42;
      max-width: 80%;
      margin: 0 auto;
    }

    .button {
      min-width: 350px;
    }
  }
</style>
