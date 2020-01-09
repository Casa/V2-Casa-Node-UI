<template>
  <div class="card flex space-between update">
    <div>
      <h5>
        <span class="new">New</span>
        Software Update Available
      </h5>

      <p>
        Upgrade Casa Node to the latest version of NodeOS.
      </p>
    </div>

    <div class="buttons">
      <a class="button is-light is-small is-arrow" target="_blank" href="https://github.com/Casa/V2-Casa-Node-UI/blob/master/CHANGELOG.md">Learn More</a>
      <a class="button is-primary is-small" @click="$parent.update()">Update Now</a>
    </div>
  </div>
</template>

<style lang="scss">
  @import "~/assets/css/variables.scss";

  .update {
    padding: 1.5em 3em;

    .new {
      text-transform: uppercase;
      font-size: 11px;
      font-weight: 900;
      letter-spacing: 0.92px;
      text-align: center;
      color: $black;
      background-color: $yellow;
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
