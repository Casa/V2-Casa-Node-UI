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

        <a class="button has-arrow" @click="$parent.update()">Update</a>
      </div>

      <hr>
    </template>

    <div class="flex">
      <div>
        <h6>Download Logs</h6>

        <p>
          Note: Error logs can currently only be decrypted by Casa engineers - please send logs to <span class="lightBlue">help@team.casa</span> when requested.
        </p>
      </div>

      <!-- Todo: Make arrow button styles -->
      <a class="button has-arrow" @click="$parent.shutdown()">Download Now</a>
    </div>

    <hr>

    <div class="flex">
      <div>
        <h6>Shut Down</h6>

        <p>
          Completely turn off Casa Node.
        </p>
      </div>

      <!-- Todo: Make arrow button styles -->
      <a class="button has-arrow" @click="$parent.shutdown()">Shut Down</a>
    </div>

    <hr>

    <div class="flex">
      <div>
        <img src="~/assets/icons/sats-extension.svg">

        <p>
          Access Casa Node from anywhere in the world. Send and accept payments.
        </p>
      </div>

      <!-- Todo: Make arrow button styles -->
      <a class="button has-arrow" @click="$parent.shutdown()">Download Now</a>
    </div>

    <hr>

    <div class="flex">
      <div>
        <h6>Node Password</h6>

        <p>
          Change your node's password.
        </p>
      </div>

      <!-- Todo: Make arrow button styles -->
      <a class="button has-arrow" @click="$parent.shutdown()">Change Password</a>
    </div>

    <hr>

    <div class="flex">
      <div>
        <h6>Factory Reset</h6>

        <p>
          Returns to factory condition. Wipes passwords, channels, and wallets, but leaving block data.
        </p>
      </div>

      <a class="button has-arrow" @click="$parent.factoryReset()">Factory Reset</a>
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

    .lightBlue {
      color: $lightBlue;
    }
  }
</style>
