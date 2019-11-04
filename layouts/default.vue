<template>
  <div class="layout-default">
    <nuxt />
  </div>
</template>

<style lang="scss">
  @import "~/assets/css/global.scss";

  .layout-default {
    // This child selector is necessary since Vue templates always have a single root element
    & > div, & > form {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      position: relative;
    }

    header {
      position: absolute;
      right: 2em;
      top: 2em;

      h5 {
        color: $smokyGray;
      }
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
      max-width: 50vw;
      margin: 0 auto;
    }

    .button {
      min-width: 350px;
    }
  }
</style>
