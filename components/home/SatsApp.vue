<template>
  <div class="card sats-app">
    <img src="~/assets/sats-app.png" class="is-pulled-right">

    <h3>Sats App</h3>

    <p>
      Control your Casa Node from your mobile device. Earn 10,000 SatsBack per week for keeping your Node online.
    </p>

    <a class="button is-white is-small" href="https://satsapp.com/">Download Now</a>
  </div>
</template>

<style lang="scss">
  @import "~/assets/css/variables.scss";

  .sats-app {
    font-size: 18px;
    padding-bottom: 2em;

    h3 {
      margin-bottom: 1em;
    }

    .button {
      margin-top: 2em;
      margin-left: -0.2em;
    }

    img {
      margin-left: 4em;
      max-height: 200px;
      width: auto;
    }
  }
</style>
