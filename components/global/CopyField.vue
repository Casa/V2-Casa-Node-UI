<template>
  <div class="copy-field">
    <div class="flex">
      <span class="numeric centered-vertically copy-content">{{ value }}</span>
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
        const dummy = document.createElement("textarea");
        document.body.appendChild(dummy);
        dummy.value = this.value + '';
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
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
      margin-left: auto;
      padding: 0 2em;
    }

    .copy-content {
      overflow: hidden;
      text-overflow: ellipsis;
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
