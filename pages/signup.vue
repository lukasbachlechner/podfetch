<template>
  <div>
    <page-header title="Sign up" />
    <section class="auth__section" v-if="step === 1">
      <div>
        <p class="muted">
          Enter your details below to start your listening experience.
        </p>

        <div class="mt-8">
          <auth-signup-form @signup-submit="handleSignupSubmit" />
        </div>
      </div>
    </section>

    <section v-if="step === 2">
      <category-picker @categories-chosen="handleCategoriesChosen" />
    </section>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  auth: 'guest',
  data: () => ({
    step: 1,
    form: null,
  }),
  methods: {
    handleSignupSubmit(form) {
      this.form = form;
      this.step = 2;
    },
    async handleCategoriesChosen(categoryPreferences) {
      this.$store.commit('loading/TOGGLE_LOADING');
      this.errors = [];

      const { email, password, passwordConfirmation } = this.form;

      const categoryIds = categoryPreferences.map((category) => category.id);

      try {
        const user = await this.$api.register(
          email,
          password,
          passwordConfirmation,
          categoryIds
        );

        if (user) {
          const { data } = await this.$auth.loginWith('local', {
            data: { email, password },
          });
          this.$auth.setUser(data.user);
          this.$api.setToken();

          this.$notify('Successfully signed up!');
        }
      } catch (e) {
        this.errors = e.response.data.errors;
      } finally {
        this.$store.commit('loading/TOGGLE_LOADING');
      }
    },
  },
};
</script>

<style scoped></style>
