<template>
  <div class="copy-field">
    <div class="flex">
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
        alert('todo: implement clipboard library');
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
      margin-left: 1em;
      padding: 0 2em;
    }
  }
</style>
