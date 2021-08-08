<template>
  <div>
    <page-header title="Home" />

    <section class="section section--cta" v-if="!$auth.loggedIn">
      <h2 class="h2">You're missing out!</h2>
      <p>
        Create your account now to explore all functions of Podfetch, including
        offline storage, subscriptions, and much more!
      </p>
      <div class="flex items-center mt-8">
        <ui-button tag="nuxt-link" to="/signup">Sign Up</ui-button>
        <ui-button tag="nuxt-link" type="outline" to="/login" class="ml-4"
          >Login</ui-button
        >
      </div>
    </section>

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
      if (this.$auth.loggedIn) {
        const [
          trendingPodcasts,
          personalizedPodcasts,
          recentEpisodes,
          subscribedPodcasts,
        ] = await Promise.all([
          this.$api.getTrending({ max: 8, cat: 'news, true crime, daily' }),
          this.$api.getPersonalized({
            max: 8,
          }),
          this.$api.getRecentEpisodes(),
          this.$api.getSubscribedPodcasts(),
        ]);

        this.trendingPodcasts = trendingPodcasts;
        this.personalizedPodcasts = personalizedPodcasts;
        this.recentEpisodes = recentEpisodes;
        this.subscribedPodcasts = subscribedPodcasts;
      } else {
        this.trendingPodcasts = await this.$api.getTrending({
          max: 8,
          cat: 'news, true crime, daily',
        });
      }
    } catch (e) {
      console.error(e.message);
    } finally {
      this.$store.commit('loading/TOGGLE_LOADING');
    }
  },
};
</script>

<style scoped>
.section--cta {
  @apply bg-haiti-middle p-8 rounded;
  @apply md:mr-8;
}
</style>
