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
  @apply bg-haiti min-h-screen p-4 pt-6;
  @apply md:ml-20 md:p-8 md:pr-0 md:pt-9;
  @apply lg:ml-64;
}
</style>
