<template>
  <div class="page">
    <page-header title="Listen Later" />
    <section class="section">
      <episode-list :episodes="likedEpisodes" />
    </section>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  data: () => ({
    likedEpisodes: [],
  }),
  async fetch() {
    this.$store.commit('loading/TOGGLE_LOADING');
    try {
      this.likedEpisodes = await this.$api.getLikedEpisodes();
    } catch (e) {
      console.error(e.message);
    } finally {
      this.$store.commit('loading/TOGGLE_LOADING');
    }
  },
};
</script>
