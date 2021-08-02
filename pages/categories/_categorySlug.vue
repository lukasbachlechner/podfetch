<template>
  <div class="page">
    <page-header :title="category.name" />
    <section class="section">
      <podcast-grid :podcasts="podcasts" />
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data: () => ({
    podcasts: [],
  }),
  async fetch() {
    this.$store.commit('loading/TOGGLE_LOADING');
    try {
      this.podcasts = await this.$api.getPodcastsByCategory(this.category);
    } catch (e) {
      console.error(e.message);
    } finally {
      this.$store.commit('loading/TOGGLE_LOADING');
    }
  },
  computed: {
    ...mapGetters(['categoryBySlug']),
    category() {
      return this.categoryBySlug(this.$route.params.categorySlug);
    },
  },
};
</script>

<style scoped></style>
