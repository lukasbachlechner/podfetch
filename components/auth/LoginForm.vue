<template>
  <client-only>
    <validation-observer
      tag="form"
      class="flex flex-col"
      novalidate
      v-slot="{ invalid }"
      @submit.prevent="onSubmit"
    >
      <ul>
        <li v-for="(error, i) in errors" :key="i" class="mb-4">
          <form-error>{{ error.message }}</form-error>
        </li>
      </ul>
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
        class="mt-8"
        :disabled="invalid"
        :loading="isLoading"
        >Login</ui-button
      >
      <p class="mt-4">
        First time here?
        <nuxt-link to="/signup" class="text-accent">Sign up instead</nuxt-link>
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
    errors: [],
  }),

  methods: {
    async onSubmit() {
      this.isLoading = true;
      this.errors = [];

      try {
        const { data } = await this.$auth.loginWith('local', {
          data: { ...this.form },
        });
        await this.$auth.setUser(data.user);
        this.$api.setToken();

        await this.$store.dispatch('player/getLastPlayedEpisode');
        this.$store.commit('usermeta/INIT_USER_DATA');
      } catch (e) {
        this.errors = e.response.data.errors;
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped></style>
