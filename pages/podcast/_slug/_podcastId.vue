<template>
  <div>
    <div class="page" v-if="!$fetchState.pending && !$fetchState.error">
      <page-header :title="podcast.title" back-only />
      <header class="podcast__header">
        <ui-image
          :src="podcast.image"
          :alt="podcast.title"
          class="podcast__image"
        />
        <div class="podcast__title-content">
          <h1 class="podcast__title">{{ podcast.title }}</h1>
          <p>by {{ podcast.author }}</p>
        </div>
      </header>
      <div v-if="$auth.loggedIn">
        <ui-button @click="handleSubscribe" v-if="!isSubscribed"
          >Subscribe</ui-button
        >
        <ui-button @click="handleUnsubscribe" v-else type="outline"
          >Unsubscribe</ui-button
        >
      </div>

      <div class="podcast__content">
        <section class="col-span-2">
          <h2 class="h2">Episodes</h2>
          <episode-list :episodes="episodesWithPodcastTitle" />
          <div class="podcast__load-more">
            <ui-button
              @click="loadMoreEpisodes"
              :loading="newEpisodesLoading"
              type="ghost"
              v-show="hasMoreEpisodes"
              >Load more</ui-button
            >
          </div>
        </section>
        <aside>
          <section class="podcast__section">
            <h2 class="h2">About</h2>
            <p
              v-html="podcast.description"
              class="podcast__description"
              :class="{ 'line-clamp-3': descriptionTruncated }"
            ></p>
            <label
              for="descriptionTruncated"
              class="podcast__description-show-more"
              >Show <span v-show="descriptionTruncated">more</span
              ><span v-show="!descriptionTruncated">less</span></label
            >
            <input
              type="checkbox"
              v-model="descriptionTruncated"
              id="descriptionTruncated"
              class="sr-only"
            />
          </section>
          <section class="podcast__section">
            <h2 class="h2">Categories</h2>
            <category-pill-list :categories="podcast.categories" />
          </section>
        </aside>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    podcast: {},
    descriptionTruncated: true,
    page: 1,
    newEpisodesLoading: false,
    hasMoreEpisodes: true,
  }),
  async fetch() {
    this.$store.commit('loading/TOGGLE_LOADING');
    try {
      this.podcast = await this.$api.getPodcastById(
        this.$route.params.podcastId
      );
    } catch (e) {
      console.log(e.message);
    } finally {
      this.$store.commit('loading/TOGGLE_LOADING');
    }
  },
  computed: {
    episodesWithPodcastTitle() {
      return this.podcast.episodes?.map((episode) => {
        episode.podcastTitle = episode.podcastTitle ?? this.podcast.title;
        return episode;
      });
    },
    isSubscribed() {
      return (
        this.$auth.user.subscribedPodcasts.findIndex(
          (subscription) =>
            subscription.podcast_id === this.$route.params.podcastId
        ) !== -1
      );
    },
  },
  methods: {
    async loadMoreEpisodes() {
      this.page++;
      this.newEpisodesLoading = true;
      try {
        const { episodes, hasMore } = await this.$api.getEpisodesByPodcastId(
          this.$route.params.podcastId,
          this.page
        );
        this.podcast.episodes.push(...episodes);
        this.hasMoreEpisodes = hasMore;
      } catch (e) {
        console.log(e.message);
      } finally {
        this.newEpisodesLoading = false;
      }
    },
    async handleSubscribe() {
      try {
        const subscription = await this.$api.subscribeToPodcast(
          this.$route.params.podcastId
        );
        const newSubscriptions = [
          ...this.$auth.user.subscribedPodcasts,
          subscription,
        ];
        this.$auth.setUser({
          ...this.$auth.user,
          subscribedPodcasts: newSubscriptions,
        });
        this.$notify(`Subscribed to "${this.podcast.title}".`);
      } catch (e) {
        console.error(e.message);
      }
    },
    async handleUnsubscribe() {
      try {
        await this.$api.unsubscribeFromPodcast(this.$route.params.podcastId);
        const newSubscriptions = [...this.$auth.user.subscribedPodcasts];
        const subscriptionIndex = newSubscriptions.findIndex(
          (subscription) =>
            subscription.podcast_id === this.$route.params.podcastId
        );
        newSubscriptions.splice(subscriptionIndex, 1);
        this.$auth.setUser({
          ...this.$auth.user,
          subscribedPodcasts: newSubscriptions,
        });
        this.$notify(`Unsubscribed from "${this.podcast.title}".`);
      } catch (e) {
        console.error(e.message);
      }
    },
  },
};
</script>

<style scoped>
.podcast__header {
  @apply flex flex-col mb-8;
  @apply md:flex-row md:items-end md:mt-16;
}

.podcast__title {
  @apply text-3xl font-bold mb-4;
  @apply md:text-4xl;
  @apply lg:text-5xl;
}

.podcast__image {
  @apply w-48 h-48 max-w-full rounded flex-shrink-0 mb-8;
  @apply md:mr-8 md:mb-0;
}

.podcast__description {
  @apply opacity-50;
}

.podcast__description-show-more {
  @apply mt-2 cursor-pointer hover-safe:hover:underline inline-block;
}

.podcast__section {
  @apply mb-8;
  @apply md:mb-16;
}

.podcast__content {
  @apply flex flex-col-reverse mt-16 gap-8;
  @apply md:grid md:grid-cols-3 md:mt-24;
}

.podcast__load-more {
  @apply mt-8 flex justify-center;
}
</style>
