import Vue from 'vue';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';

import { confirmed, email, required } from 'vee-validate/dist/rules';

extend('email', {
  ...email,
  message: 'Please provide a valid e-mail.',
});
extend('required', {
  ...required,
  message: (field) => `${field} is required.`,
});

extend('confirmed', {
  ...confirmed,
  message: "Passwords don't match.",
});

extend('password', {
  validate: (value) => {
    const regex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-§()]).{8,}$/;
    return value.match(regex);
  },
  message: "Your password doesn't meet the requirements.",
});

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
