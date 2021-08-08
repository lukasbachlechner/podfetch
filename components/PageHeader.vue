<template>
  <div class="page__header">
    <div>
      <button
        @click="$router.back()"
        class="page__header--back-button"
        v-if="backOnly"
      >
        <ui-icon name="arrow-left" class="page__header--back-icon" />
        Back
      </button>

      <h1 class="title" v-else>{{ title }}</h1>
    </div>

    <div>
      <nuxt-link to="/login" v-if="!$auth.loggedIn">Login</nuxt-link>
      <nuxt-link v-else to="/settings">{{ $auth.user.email }}</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
      default: '',
    },
    backOnly: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  head() {
    return {
      title: this.title,
    };
  },
};
</script>

<style scoped>
.page__header {
  @apply bg-haiti p-4 pt-6 fixed left-0 top-0 right-0 z-40 flex items-center justify-between h-20;
  @apply md:left-22 md:p-8 md:pt-9 md:h-27;
  @apply lg:left-64;
}

.page__header--back-button {
  @apply flex items-center;
}

.page__header--back-icon {
  @apply mr-2;
}
</style>
