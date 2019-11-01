<template>
  <div class="modal is-active">
    <div class="modal-background" />
    <div class="modal-content">
      Hello world?
    </div>
  </div>
</template>

<script>
  export default {

  }
</script>

<style lang="scss">
  @import "~/assets/css/variables.scss";

  .modal {
    .modal-background {
      background-image: $blueGradient;
      opacity: 0.8;
    }

    .modal-content {
      background: $black;
      border-radius: 12px;
      padding: 2em;
    }
  }
</style>
