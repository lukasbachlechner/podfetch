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
      // this.$store.commit('player/SET_EPISODE', this.episode);
      this.$store.dispatch('player/addEpisode', this.episode);
    },
  },
};
</script>

<style scoped>
.episode__item {
  @apply p-4 rounded bg-haiti-middle;
}

.episode__image {
  @apply w-12 h-12 flex-shrink-0;
}

.episode__header {
  @apply flex items-center font-bold gap-4 mb-4;
}

.episode__description {
  @apply opacity-50 line-clamp-3;
}

.episode__footer {
  @apply mt-4 flex items-center justify-between;
}

.episode__play-button {
  @apply rounded-full bg-white bg-opacity-10 w-12 h-12 flex items-center justify-center;
}
</style>
