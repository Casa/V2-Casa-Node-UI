<template>
  <div>
    <h1>System</h1>

    <div class="extras">
      <h3>Extras</h3>

      <div class="flex">
        <div>
          <h6>Shut Down</h6>

          <p>
            Completely turn off Casa Node.
          </p>
        </div>

        <!-- Todo: Make arrow button styles -->
        <a class="button has-arrow">Shut Down</a>
      </div>

      <hr>

      <div class="flex">
        <div>
          <h6>Update</h6>

          <p>
            Install the latest version of Casa Node software.
          </p>
        </div>

        <a class="button has-arrow">Update</a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    layout: 'dashboard',
  }
</script>

<style lang="scss">
  @import "~/assets/css/variables.scss";

  .extras {
    width: 100%;
    background-color: $transparentGray;
    border-radius: 12px;
    padding: 2em;
    margin-top: 2em;

    h3 {
      margin-bottom: 1em;
    }

    p {
      color: $gunsmokeGray;
    }

    .button {
      margin-left: auto;
    }
  }
</style>
