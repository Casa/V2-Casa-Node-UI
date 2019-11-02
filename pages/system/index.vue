<template>
  <div class="wrapper">
    <div class="page">
      <h1>
        <img src="~/assets/icons/system.svg">

        System
      </h1>

      <div class="card extras">
        <h3>Extras</h3>

        <template v-if="updateAvailable">
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
    </div>

    <template v-if="activeModal">
      <component :is="activeModal" />
    </template>
  </div>
</template>

<script>
  import API from '~/helpers/api';
  import Events from '~/helpers/events';
  import UpdateModal from './UpdateModal';
  import ShutdownModal from './ShutdownModal';
  import FactoryResetModal from './FactoryResetModal';

  export default {
    layout: 'dashboard',

    data() {
      return {
        activeModal: false,
        updateAvailable: false,
      }
    },

    async created() {
      Events.$on('modal-closed', () => {
        this.activeModal = false;
      });

      const versions = await API.get(this.$axios, `${this.$env.API_MANAGER}/v1/telemetry/version`);
      const containers = Object.entries(versions.applications);

      containers.forEach(([container, version]) => {
        console.log(container, version);

        if(version.newVersionsAvailable.length) {
          this.updateAvailable = true;
        }
      });
    },

    methods: {
      openModal(modal) {
        this.activeModal = modal;
        Events.$emit('modal-opened');
      },

      update() {
        this.openModal(UpdateModal);
      },

      shutdown() {
        this.openModal(ShutdownModal);
      },

      factoryReset() {
        this.openModal(FactoryResetModal);
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
  }
</style>
