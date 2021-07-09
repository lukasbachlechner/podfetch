<template>
  <client-only>
    <validation-observer
      tag="form"
      class="flex flex-col"
      novalidate
      v-slot="{ invalid }"
      @submit.prevent="onSubmit"
    >
      <form-group
        label="E-Mail"
        v-model="form.email"
        type="email"
        rules="required|email"
      />

      <form-group
        label="Password"
        v-model="form.password"
        type="password"
        rules="required"
      />

      <ui-button
        full-width
        class="mt-16"
        :disabled="invalid"
        :loading="isLoading"
        >Login</ui-button
      >
      <p class="mt-4">
        First time here?
        <nuxt-link to="/signup" class="text-accent"
          >Create an account</nuxt-link
        >
      </p>
    </validation-observer>
  </client-only>
</template>

<script>
export default {
  data: () => ({
    isLoading: false,
    form: {
      email: '',
      password: '',
    },
  }),

  methods: {
    onSubmit() {
      this.isLoading = true;

      setTimeout(() => {
        this.isLoading = false;
      }, 3000);
    },
  },
};
</script>

<style scoped></style>
