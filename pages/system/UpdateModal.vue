<template>
  <Modal class="update-modal">
    <h3>Update Your Node</h3>

    <hr>

    <InputField label="Node Password" />

    <div class="buttons">
      <ModalClose />
      <a class="button is-primary" @click="update()">Update</a>
    </div>
  </Modal>
</template>

<script>
  export default {
    methods: {
      update() {

      }
    }
  }
</script>

<style lang="scss">
  .update-modal {
    .input-wrap {
      width: 100%;
      display: block;
    }
  }
</style>
