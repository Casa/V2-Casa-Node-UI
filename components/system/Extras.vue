<template>
  <div class="card extras">
    <h3>Extras</h3>

    <template v-if="$store.state.system.updateAvailable">
      <div class="flex">
        <div>
          <h6>Update</h6>

          <p>
            Install the latest version of Casa Node software.
          </p>
        </div>

        <a class="button has-arrow" @click="update()">Update</a>
      </div>

      <hr>
    </template>

    <div class="flex">
      <div>
        <h6>Shut Down</h6>

        <p>
          Completely turn off Casa Node.
        </p>
      </div>

      <!-- Todo: Make arrow button styles -->
      <a class="button has-arrow" @click="shutdown()">Shut Down</a>
    </div>

    <hr>

    <div class="flex">
      <div>
        <h6>Factory Reset</h6>

        <p>
          Wipes all Node data. Resets channels, passwords, and more.
        </p>
      </div>

      <a class="button has-arrow" @click="factoryReset()">Factory Reset</a>
    </div>
  </div>
</template>

<style lang="scss">
  @import "~/assets/css/variables.scss";

  .extras {
    h3 {
      margin-bottom: 1em;
    }

    .button {
      margin-left: auto;
    }
  }
</style>
