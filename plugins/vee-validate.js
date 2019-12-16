import Vue from 'vue';
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate';
import { required, min, confirmed } from 'vee-validate/dist/rules';

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

Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);
