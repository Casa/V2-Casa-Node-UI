<template>
  <Modal class="lightning-manage-modal modal">
    <form @submit.prevent="save()">
      <div class="columns modal-heading">
        <div class="column">
          <h3>
            Manage Channels
          </h3>
        </div>
      </div>

      <div class="columns space-between">
        <div class="column">
          <h6>
            Minimum Incoming Channel Size
          </h6>
          <p>
            20,000 sats - 16,000,000 sats are the current channel size limits set by the Lightning Network.
          </p>
        </div>

        <div class="column right">
          <InputField v-model="minChanSize" type="text" label="Sats"/>
        </div>
      </div>

      <hr>

      <div class="buttons">
        <ModalClose />
        <button type="submit" class="button is-primary">Save Settings</button>
      </div>
    </form>
  </Modal>
</template>

<script>
  //import API from '@/helpers/api';

  //  import Events from '~/helpers/events';

  export default {
    data() {
      return {
        minChanSize: '',
      }
    },

    methods: {

      save() {
      },
    }
  }
</script>

<style lang="scss">
  @import "~/assets/css/variables.scss";

  // Override default width
  .modal {
    .modal-content {
      width: 75%;
    }
  }

  .lightning-manage-modal {

    .input-wrap {
      width: 256px;
    }
  }
</style>
