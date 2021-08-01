<template>
  <div>
    <div class="page" v-if="!$fetchState.pending && !$fetchState.error">
      <page-header
        :title="`${episode.title} – ${episode.podcastTitle}`"
        back-only
      />
      <header class="episode__header">
        <ui-image :src="episode.image" alt="" class="episode__image" />
        <div class="episode__title-content">
          <div class="episode__title-info">
            <span>{{ $formatter.date(episode.datePublished * 1000) }}</span>
            &middot;
            <nuxt-link
              :to="`/podcast/${episode.podcastTitleSlug}/${episode.podcastId}`"
              >{{ episode.podcastTitle }}</nuxt-link
            >
          </div>

          <h1 class="episode__title">{{ episode.title }}</h1>
        </div>
      </header>
      <div class="episode__actions">
        <ui-button @click="playEpisode">Play Episode</ui-button>
        <ui-button
          @click="downloadEpisode"
          type="outline"
          class="ml-2"
          icon="download"
          >Download</ui-button
        >
      </div>

      <section class="episode__content">
        <h2 class="h2">Description</h2>
        <div v-html="episode.description"></div>
      </section>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data: () => ({
    episode: {},
  }),
  async fetch() {
    this.$store.commit('loading/TOGGLE_LOADING');
    try {
      this.episode = await this.$api.getEpisodeById(
        this.$route.params.episodeId
      );
    } catch (e) {
      console.log(e.message);
    } finally {
      this.$store.commit('loading/TOGGLE_LOADING');
    }
  },
  methods: {
    playEpisode() {
      this.$store.dispatch('player/addEpisode', this.episode);
    },
    downloadEpisode() {
      this.$store.dispatch('downloader/downloadEpisode', this.episode);
      this.$router.push('/listen-later');
    },
  },
  computed: {
    ...mapGetters({
      downloads: 'downloader/currentDownloads',
    }),
  },
};
</script>

<style scoped>
.episode__header {
  @apply flex flex-col mb-8;
  @apply md:flex-row md:items-end md:mt-16;
}

.episode__title-info {
  @apply mb-2;
}

.episode__title {
  @apply text-3xl font-bold mb-4;
  @apply md:text-4xl;
  @apply lg:text-5xl;
}

.episode__image {
  @apply w-48 max-w-full rounded flex-shrink-0 mb-8;
  @apply md:mr-8 md:mb-0;
}

.episode__actions {
  @apply flex;
}

.episode__content {
  @apply mt-8 max-w-prose;
}

.episode__content >>> *:not(h2) {
  @apply leading-loose text-opacity-50 text-white;
}

.episode__content >>> a {
  @apply underline;
}
</style>
