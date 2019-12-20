import Vue from 'vue';
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate';
import { required, min, confirmed, alpha, min_value, max_value } from 'vee-validate/dist/rules';

// Default validation functions
extend("required", { 
  ...required,
  message: 'This field is required'
});

extend("min", { 
  ...min,
  message: 'Requires at least 12 characters'
});

extend("confirmed", { 
  ...confirmed,
  message: `Password confirmation doesn't match`
});

extend("alpha", {
  ...alpha,
  message: 'Only alphabetic characters are allowed'
});

extend("min_value", {
  ...min_value,
  message: 'Value is below the minimum..'
});

extend("max_value", {
  ...max_value,
  message: 'Value exceeds the maximum.'
});

// Custom validation functions
extend('max_bytes', {
  getMessage: (field, params) => {
    return `${field} must be less than ${params[0]} bytes. This can happen if your nickname uses emojis or other special characters`;
  },

  validate: (input, params) => {
    const blob = new Blob([input]);
    const max = parseInt(params[0]);

    if(blob.size > max) {
      return false;
    }

    return true;
  },
});

// Custom validation for node color alias
extend('hex_code', {
  message: 'Not a valid hex code.',
  validate: value => {
    const regex = new RegExp("^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$");
    return regex.test(value);
  }
});

Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);
