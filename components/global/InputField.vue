<template>
  <div class="input-wrap">
    <div class="input-field" :class="{ active: active, focused: focused, error: error }">
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
          @input="onInput"
        >
      </template>

      <template v-else-if="type == 'textarea'">
        <textarea
          :id="randomId"
          v-model="value"
          :name="name"
          @focus="onFocus"
          @blur="onBlur"
          @input="onInput"
        />
      </template>
    </div>

    <p v-if="error && errorMessage" class="error-message">
      {{ errorMessage }}
    </p>
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
        type: [String, Number],
      },

      'error': {
        default: false,
        type: Boolean,
      },

      'errorMessage': {
        default: '',
        type: String,
      },
    },

    data() {
      return {
        // Generate a random ID that can be used to uniquely associate labels with inputs
        randomId: (Math.random() + 1).toString(36).substring(7),
        active: Boolean(this.value),
        focused: false,
      }
    },

    methods: {
      onFocus() {
        this.active = true;
        this.focused = true;
      },

      onBlur() {
        this.active = Boolean(this.value);
        this.focused = false;
      },

      onInput() {
        this.error = false;
        this.errorMessage = false;
      }
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
      padding: 2em 1.25em 0.75em 1.25em;
      color: $white;
    }
  }

  .input-field.focused {
    border-color: $purple;
  }

  .input-field.active {
    label {
      font-size: 12px;
      top: 0.75em;
    }
  }

  .input-field.error {
    border-color: $red;
  }

  .input-wrap {
    text-align: left;

    .error-message {
      font-weight: 500;
      color: $red;
      padding: 0.5em 0;
    }
  }
</style>
