<template>
  <div class="modal is-active">
    <div class="modal-background" />
    <div class="modal-content">
      <slot />
    </div>
  </div>
</template>

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

    .modal-heading {
      margin-bottom: 0;

      .column {
        padding-bottom: 0.5em;
      }
    }

    .modal-description {
      text-align: right;
      align-self: flex-end;
      color: $translucentWhite;
    }
  }
</style>
