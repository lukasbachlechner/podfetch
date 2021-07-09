<template>
  <div>
    <h1 class="title">Home</h1>
    <section class="section">
      <h2 class="h2">Trending</h2>
      <podcast-list :podcasts="trendingPodcasts" />
    </section>
  </div>
</template>

<script>
export default {
  data: () => ({
    trendingPodcasts: [],
  }),
  async fetch() {
    try {
      this.trendingPodcasts = await this.$api.getTrending({
        max: 8,
      });
    } catch (e) {
      console.log(e.message);
    }
  },
};
</script>

<style scoped></style>
