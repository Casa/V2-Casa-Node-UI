<template>
  <div class="input-field" :class="{ active: active }">
    <label :for="randomId">
      {{ label }}
    </label>

    <template v-if="type == 'text'">
      <input
        :id="randomId"
        v-model="value"
        type="text"
        :name="name"
        @focus="onFocus"
        @blur="onBlur"
      >
    </template>

    <template v-else-if="type == 'textarea'">
      <textarea
        :id="randomId"
        v-model="value"
        :name="name"
        @focus="onFocus"
        @blur="onBlur"
      />
    </template>
  </div>
</template>

<script>
  export default {
    props: {
      'label': {
        default: 'Label',
        type: String,
      },

      'type': {
        default: 'text',
        type: String,
      },

      'name': {
        default: '',
        type: String,
      },

      'value': {
        default: '',
        type: [String, Number]
      },
    },

    data() {
      return {
        // Generate a random ID that can be used to uniquely associate labels with inputs
        randomId: (Math.random() + 1).toString(36).substring(7),
        active: Boolean(this.value),
      }
    },

    methods: {
      onFocus() {
        this.active = true;
      },

      onBlur() {
        this.active = Boolean(this.value);
      },
    }
  }
</script>

<style lang="scss">
  @import "~/assets/css/variables.scss";

  .input-field {
    border: solid 2px $blue;
    background-color: $transparentFaintWhite;
    border-radius: 4px;
    position: relative;

    label {
      position: absolute;
      top: 1.1em;
      left: 18px;
      font-weight: 500;
      color: $lightPurple;
      transition: all 0.5s;
      cursor: text;
    }

    input {
      background: none;
      border: none;
      padding: 1.75em 1.25em 1em 1.25em;
    }
  }

  .input-field.active {
    label {
      font-size: 12px;
      top: 0.4em;
    }
  }
</style>
