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
        <h6>Download Logs</h6>

        <p>
          Note: Error logs can currently only be decrypted by Casa engineers - please send logs to <span class="lightBlue">help@team.casa</span> when requested.
        </p>
      </div>

      <!-- Todo: Make arrow button styles -->
      <a class="button has-arrow" :href="downloadUrl" @click.prevent="downloadLogs()">Download Now</a>
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
      <a class="button has-arrow" @click="shutdown()">Shut Down</a>
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
      <a href="https://chrome.google.com/webstore/detail/sats-extension-by-casa/lnaedehiikghclgaikolambpbpeknpef" class="button has-arrow">Download Now</a>
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
      <a class="button has-arrow" @click="changePassword()">Change Password</a>
    </div>

    <hr>

    <div class="flex">
      <div>
        <h6>Factory Reset</h6>

        <p>
          Returns to factory condition. Wipes passwords, channels, and wallets, but leaving block data.
        </p>
      </div>

      <a class="button has-arrow" @click="factoryReset()">Factory Reset</a>
    </div>
  </div>
</template>

<script>
  import API from '@/helpers/api';
  import Events from '~/helpers/events';
  import UpdateModal from '~/components/system/modals/Update';
  import ShutdownModal from '~/components/system/modals/Shutdown';
  import FactoryResetModal from '~/components/system/modals/FactoryReset';

  export default {
    data() {
      return {
        downloadUrl: this.$env.API_MANAGER + '/v1/logs/download',
      }
    },
    methods: {
      changePassword() {
        this.$router.push('/system/change-password');
      },

      update() {
        Events.$emit('modal-open', UpdateModal);
      },

      shutdown() {
        Events.$emit('modal-open', ShutdownModal);
      },

      factoryReset() {
        Events.$emit('modal-open', FactoryResetModal);
      },

      // Download the casa node logs
      async downloadLogs() {

        const response = await API.get(this.$axios, `${this.$env.API_MANAGER}/v1/logs/download`, {responseType: 'arraybuffer'});

        const url = window.URL.createObjectURL(new Blob([response]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'casa-node-logs.tar.bz2'); //or any other extension
        document.body.appendChild(link);
        link.click();
      },
    }
  }
</script>

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
