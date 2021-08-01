<template>
  <ul class="recent-episode__list">
    <episode-recent-item
      v-for="episode in recentEpisodes"
      :key="episode.id"
      :episode="episode"
    />
  </ul>
</template>

<script>
export default {
  data: () => ({
    recentEpisodes: [],
  }),
  async fetch() {
    try {
      this.recentEpisodes = await this.$api.getRecentEpisodes();
    } catch (e) {
      console.error(e.message);
    }
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
