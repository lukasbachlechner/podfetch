<template>
  <client-only>
    <validation-observer
      tag="form"
      class="flex flex-col"
      novalidate
      v-slot="{ invalid }"
      @submit.prevent="$emit('signup-submit', form)"
    >
      <form-group
        label="E-Mail"
        v-model="form.email"
        type="email"
        rules="required|email"
        :hasErrors="email.taken"
        @blur="checkEmail"
      >
        <template #icon>
          <div
            class="absolute text-success right-4 top-0 h-full flex items-center"
          >
            <ui-icon
              name="check-circle"
              v-show="email.checked && !email.taken"
            />
            <loading-spinner v-show="email.checkLoading" />
          </div>
        </template>
        <template #errors v-if="email.taken">
          <form-error
            >E-Mail is already taken. Please choose another one.</form-error
          >
        </template>
      </form-group>

      <form-password-group @password-change="handlePasswordChange" />

      <ui-button
        full-width
        class="mt-8"
        :disabled="invalid || email.taken"
        :loading="isLoading"
        >Sign Up</ui-button
      >

      <p class="mt-4">
        Already have an account?
        <nuxt-link to="/login" class="text-accent">Login instead</nuxt-link>
      </p>
    </validation-observer>
  </client-only>
</template>

<script>
export default {
  data: () => ({
    isLoading: false,
    email: {
      taken: false,
      checked: false,
      checkLoading: false,
    },
    form: {
      email: '',
      password: '',
      passwordConfirmation: '',
    },
  }),

  methods: {
    async checkEmail(isInvalid) {
      if (isInvalid) {
        return false;
      }

      this.email.checked = false;
      this.email.taken = false;
      this.email.checkLoading = true;

      try {
        const { isTaken } = await this.$api.checkEmail(this.form.email);

        this.email.checked = true;
        this.email.taken = isTaken;
        this.email.checkLoading = false;
      } catch (e) {
        this.errors = e.response.data.errors;
      } finally {
        this.isLoading = false;
      }

      setTimeout(() => {}, 1000);
    },
    handlePasswordChange({ password, repeatPassword }) {
      this.form.password = password;
      this.form.passwordConfirmation = repeatPassword;
    },
  },
};
</script>

<style scoped></style>
