<template>
  <li class="episode-download__item">
    <div class="episode-download__header">
      <ui-image
        :src="episode.image"
        :alt="episode.title"
        size="48"
        class="episode-download__image"
      />
      <div>
        <h3 class="ellipsis episode-download__episode-title">
          {{ episode.title }}
        </h3>
        <h4 class="ellipsis episode-download__podcast-title">
          {{ episode.podcastTitle }}
        </h4>
      </div>

      <div
        v-if="episode.canDownload && episode.downloadStarted"
        class="episode-download__progress"
      >
        <ui-progress-bar
          :value="episode.downloadProgress"
          class="episode-download__progress-bar"
        />
        <span class="ml-2"
          >{{ $formatter.megaBytes(episode.progressBytes) }}/{{
            $formatter.megaBytes(episode.audioSize)
          }}
          MB</span
        >
      </div>

      <div class="episode-download__progress" v-if="!episode.canDownload">
        Sorry, this episode can't be downloaded.
      </div>
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
.episode-download__item {
  @apply p-4 rounded bg-haiti-middle mb-4 relative;
}

.episode-download__image {
  @apply w-12 h-12 flex-shrink-0 mr-4;
}

.episode-download__header {
  @apply flex items-center;
}

.episode-download__progress {
  @apply ml-auto flex items-center;
}

.episode-download__progress-bar {
  @apply absolute left-0 bottom-0 w-full;
}

.episode-download__episode-title {
  @apply font-bold;
}

.episode-download__podcast-title {
  @apply text-sm;
}
</style>
