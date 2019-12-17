<template>
  <div class="input-wrap">
    <div class="input-field" :class="{ active: active, focused: focused, error: error }">
      <label :for="randomId">
        {{ label }}
      </label>

      <template v-if="['text', 'password'].indexOf(type) !== -1">
        <input
          :id="randomId"
          v-model="currentValue"
          :type="type"
          :name="name"
          @focus="onFocus"
          @blur="onBlur"
          @input="onInput"
        >
      </template>

      <template v-else-if="type == 'textarea'">
        <textarea
          :id="randomId"
          v-model="currentValue"
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
        // We have to make a local copy of the value because Vue doesn't like it when you mutate the value of a prop
        currentValue: this.value,

        // Generate a random ID that can be used to uniquely associate labels with inputs
        randomId: (Math.random() + 1).toString(36).substring(7),
        active: Boolean(this.value),
        focused: false,
      }
    },

    watch: {
      // Since we are making a local copy of the value, we need to watch for external changes to value and pass them
      // along to currentValue.
      value: function(newValue) {
        this.active = newValue.length > 0;
        this.currentValue = newValue;
      },
    },

    methods: {
      onFocus() {
        this.active = true;
        this.focused = true;
      },

      onBlur() {
        this.active = Boolean(this.currentValue);
        this.focused = false;
      },

      onInput() {
        this.error = false;
        this.errorMessage = '';
        this.$emit('input', this.currentValue);
      },
    },
  }
</script>

<style lang="scss">
  @import "~/assets/css/variables.scss";

  .input-wrap {
    display: inline-block;
  }

  .input-field {
    border: solid 2px $blue;
    background-color: $transparentFaintWhite;
    border-radius: 4px;
    position: relative;

    label {
      position: absolute;
      top: calc(50% - 0.7em);
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
      width: 100%;
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
      color: $red;
      font-size: 18px;
      font-weight: 500;
      padding: 0.5em 0;
    }
  }
</style>
