<template>
  <div>
    <page-header title="Home" />

    <section class="section" v-if="$auth.loggedIn && recentEpisodes.length">
      <h2 class="h2">Recents</h2>
      <episode-recent-list :episodes="recentEpisodes" />
    </section>

    <section class="section" v-if="$auth.loggedIn && subscribedPodcasts.length">
      <h2 class="h2">Subscribed</h2>
      <podcast-list :podcasts="subscribedPodcasts" />
    </section>

    <section class="section" v-if="$auth.loggedIn">
      <h2 class="h2">For You</h2>
      <podcast-list :podcasts="personalizedPodcasts" />
    </section>

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
    recentEpisodes: [],
    personalizedPodcasts: [],
    subscribedPodcasts: [],
  }),
  async fetch() {
    this.$store.commit('loading/TOGGLE_LOADING');
    try {
      this.trendingPodcasts = await this.$api.getTrending({ max: 8 });
      if (this.$auth.loggedIn) {
        const [personalizedPodcasts, recentEpisodes, subscribedPodcasts] =
          await Promise.all([
            this.$api.getPersonalized({
              max: 8,
            }),
            this.$api.getRecentEpisodes(),
            this.$api.getSubscribedPodcasts(),
          ]);

        this.personalizedPodcasts = personalizedPodcasts;
        this.recentEpisodes = recentEpisodes;
        this.subscribedPodcasts = subscribedPodcasts;
      }
    } catch (e) {
      console.error(e.message);
    } finally {
      this.$store.commit('loading/TOGGLE_LOADING');
    }
  },
};
</script>

<style scoped></style>
