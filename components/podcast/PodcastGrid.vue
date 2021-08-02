<template>
  <ul class="podcast__grid">
    <podcast-grid-item
      v-for="podcast in podcasts"
      :key="podcast.id"
      :podcast="podcast"
    />
  </ul>
</template>

<script>
export default {
  props: {
    podcasts: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.podcast__grid {
  @apply grid gap-4 grid-cols-2;
  @apply md:grid-cols-4 md:gap-8;
  @apply lg:grid-cols-6;
}
</style>
