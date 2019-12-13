<template>
  <div class="card flex space-between invalid-digest">
    <div>
      <h5>
        <span class="warning">Warning</span>
        Software Package Invalid
      </h5>

      <p>
        We tried to download a new software package, but it was not verified by Casa. Please contact help@team.casa for more information.
      </p>
    </div>
  </div>
</template>

<style lang="scss">
  @import "~/assets/css/variables.scss";

  .invalid-digest {
    padding: 1.5em 3em;

    .warning {
      text-transform: uppercase;
      font-size: 11px;
      font-weight: 900;
      letter-spacing: 0.92px;
      text-align: center;
      color: $black;
      background-color: $red;
      border-radius: 31px;
      padding: 0.4em 1.8em;
      margin-right: 0.5em;
      vertical-align: middle;
    }

    .buttons {
      margin: 0 -0.5em 0;
    }
  }
</style>
