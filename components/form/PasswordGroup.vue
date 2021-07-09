<template>
  <div>
    <form-group
      label="Password"
      v-model="password"
      type="password"
      rules="required|password"
      vid="password"
      @input="changeEmitter"
    >
      <ul class="signup__password-helper">
        <li
          v-for="(check, i) in passwordChecks"
          :key="i"
          :class="[check.isValid ? 'text-success' : 'text-white opacity-50']"
        >
          <span>
            {{ check.text }}
          </span>
        </li>
      </ul>
    </form-group>
    <form-group
      label="Repeat Password"
      v-model="passwordRepeat"
      rules="required|confirmed:password"
      type="password"
      @input="changeEmitter"
      mode="aggressive"
    />
  </div>
</template>

<script>
export default {
  data: () => ({
    password: '',
    passwordRepeat: '',
    passwordChecks: [
      {
        text: '8+ characters',
        regex: /.{8,}/,
        isValid: false,
      },
      {
        text: 'Upper- and lowercase letters',
        regex: /(?=.*?[A-Z])(?=.*?[a-z])/,
        isValid: false,
      },
      {
        text: 'Digits',
        regex: /[0-9]+/,
        isValid: false,
      },
      {
        text: 'Special character',
        regex: /[#?!@$%^&*\-_§()[\]{}]+/,
        isValid: false,
      },
    ],
  }),
  watch: {
    password: {
      immediate: true,
      handler(val) {
        this.passwordChecks.map((check) => {
          const matchesRegex = val.match(check.regex);
          return (check.isValid = matchesRegex);
        });
      },
    },
  },
  methods: {
    changeEmitter() {
      this.$emit('password-change', {
        password: this.password,
        repeatPassword: this.passwordRepeat,
      });
    },
  },
};
</script>

<style scoped>
.signup__password-helper {
  @apply grid grid-cols-2 text-sm mt-2 list-disc list-inside;
}
</style>
