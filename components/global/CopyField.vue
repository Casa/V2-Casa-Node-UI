<template>
  <div class="copy-field">
    <div class="flex">
      <input ref="copyInput" :value="value">

      <span class="numeric centered-vertically">{{ value }}</span>
      <a class="button is-small" @click="copy()">Copy</a>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      'value': {
        default: 'Copy me!',
        type: String,
      },
    },

    methods: {
      copy() {
        var copyInput = this.$refs.copyInput;

        copyInput.select();
        copyInput.setSelectionRange(0, this.value.length);

        document.execCommand("copy");

        // Todo - add confirmation toast message
      }
    }
  }
</script>

<style lang="scss">
  @import "~/assets/css/variables.scss";

  .copy-field {
    display: inline-block;
    border-radius: 32.5px;
    border: dashed 2px $purple;
    background-color: $transparentFaintWhite;

    .flex {
      margin: 0.1em;
      margin-left: 1.5em;
    }

    .button {
      margin-right: 0.55em;
      margin-left: 1em;
      padding: 0 2em;
    }

    input {
      position: fixed;
      height: 0;
      width: 0;
      opacity: 0;
      z-index: -1;
    }
  }
</style>
