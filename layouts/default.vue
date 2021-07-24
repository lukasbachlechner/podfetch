<template>
  <div class="text-white">
    <nav-wrapper />
    <main class="content">
      <Nuxt keep-alive />
      <loading-screen v-if="isLoading" />
    </main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      isLoading: 'loading/isLoading',
    }),
  },
};
</script>

<style>
.content {
  @apply bg-haiti p-4 pt-6 mt-20;
  @apply md:ml-22 md:p-8 md:pr-0 md:pt-9 md:mt-27;
  @apply lg:ml-64;
}

.auth__section {
  @apply w-full max-w-xl mb-52 mx-auto;
}
</style>
