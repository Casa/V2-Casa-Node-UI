<template>
  <Modal class="bitcoin-manage-modal modal">
    <div class="columns modal-heading">
      <div class="column">
        <h3>
          Manage Bitcoin Node
        </h3>
      </div>
    </div>
    <span class="pill is-red spacer">The Danger Zone</span>
    <div class="columns space-between">
      <div class="column">
        <div class="flex">
          <h6>
            Resync Bitcoin from Scratch
          </h6>
        </div>

        <p>
          Wipes all Bitcoin data and syncs from scratch. This will take several days to complete.
        </p>
      </div>

      <div class="column right">
        <button class="button danger" @click="confirmSync()">Sync from Scratch</button>
      </div>
    </div>

    <hr>

    <div class="buttons">
      <ModalClose />
    </div>
  </Modal>
</template>

<script>
  import Events from '~/helpers/events';
  import ConfirmSyncModal from '~/components/bitcoin/modals/ConfirmSync';

  export default {

    methods: {

      confirmSync() {
        Events.$emit('modal-close');
        Events.$emit('modal-open', ConfirmSyncModal);
      }
    }
  }
</script>

<style lang="scss">
  @import "~/assets/css/variables.scss";

  .bitcoin-manage-modal {

    .spacer {
      margin-bottom: 1.5em;
    }

    .danger {
      color: $red
    }

    h3 {
      margin-bottom: 1em;
    }
    .icon {
      width: 16px;
      height: 16px;
    }

    .input-wrap {
      width: 256px;
    }

    .color-output {
      position: absolute;
      top: 1px;
      bottom: 1px;
      width: 3em;
      background-color: #8865DF;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }

    // TODO right align this field
    .skinny {
      width: 256px;
    }

    .custom-color {

      input {
        padding-left: 4em !important;
      }

      .color-output {
        position: absolute;
        top: 0px;
        bottom: 0px;
        width: 3em;
        background-color: #8865DF;
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
      }
    }

    .tooltip {
      margin-left: 0.5em;
    }
  }
</style>
