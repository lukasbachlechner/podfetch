<template>
  <ul class="recent-episode__list">
    <episode-recent-item
      v-for="episode in episodes"
      :key="episode.id"
      :episode="episode"
    />
  </ul>
</template>

<script>
export default {
  props: {
    episodes: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.recent-episode__list {
  @apply grid grid-cols-1 gap-4;
  @apply sm:grid-cols-2;
  @apply md:grid-cols-3 md:mr-8;
}
</style>
