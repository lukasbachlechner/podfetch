<template>
  <li class="episode__item">
    <div class="episode__header">
      <ui-image
        :src="episode.image"
        :alt="episode.title"
        size="48"
        class="episode__image"
      />
      <h3 class="ellipsis">
        {{ episode.title }}
      </h3>

      <button class="episode__delete-button" @click="deleteEpisode">
        <ui-icon name="trash" />
        <span class="sr-only">Delete this episode</span>
      </button>
    </div>
    <p class="episode__description" v-html="episode.excerpt"></p>
    <div class="episode__footer">
      <div class="episode__meta">
        <span>{{ $formatter.shortDate(episode.datePublished * 1000) }}</span>
        <span>&middot;</span>
        <span>{{ $formatter.minutes(episode.audioDuration) }}</span>
      </div>

      <button class="episode__play-button" @click="playEpisode">
        <span class="sr-only">Play {{ episode.title }}</span>
        <ui-icon name="play-fill" size="24" class="ml-1" />
      </button>
    </div>
    <nuxt-link
      :to="`/episode/${episode.titleSlug}/${episode.id}`"
      class="episode__link"
    >
      <span class="sr-only">To Episode</span></nuxt-link
    >
  </li>
</template>

<script>
export default {
  props: {
    episode: {
      type: Object,
      required: true,
    },
  },
  methods: {
    playEpisode() {
      this.$store.dispatch('player/addEpisode', this.episode);
    },
    deleteEpisode() {
      this.$store.dispatch('downloader/deleteEpisode', this.episode.id);
    },
  },
};
</script>

<style scoped>
.episode__item {
  @apply p-4 rounded bg-haiti-middle mb-4 relative hover-safe:hover:bg-haiti-high;
}

.episode__image {
  @apply w-12 h-12 flex-shrink-0 mr-4;
}

.episode__header {
  @apply flex items-center font-bold mb-4;
}

.episode__description {
  @apply opacity-50 line-clamp-3;
}

.episode__footer {
  @apply mt-4 flex items-center justify-between;
}

.episode__play-button {
  @apply rounded-full bg-white bg-opacity-10 w-12 h-12 flex items-center justify-center relative z-10;
}

.episode__link {
  @apply absolute top-0 left-0 w-full h-full;
}

.episode__delete-button {
  @apply p-2  ml-auto relative z-10;
}
</style>
