<template>
  <div class="player__actions">
    <button class="player__action-button">
      <ui-icon name="heart" />
    </button>
    <button
      class="player__action-button"
      @click="downloadEpisode"
      v-if="!isCurrentEpisodeDownloaded"
    >
      <ui-icon name="download" />
    </button>
    <div class="player__action-button" v-else>
      <ui-icon name="check" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      currentEpisode: 'player/currentEpisode',
      isEpisodeDownloaded: 'downloader/isEpisodeDownloaded',
    }),
    isCurrentEpisodeDownloaded() {
      return this.isEpisodeDownloaded(this.currentEpisode.id);
    },
  },
  methods: {
    downloadEpisode() {
      this.$store.dispatch('downloader/downloadEpisode', this.currentEpisode);
      this.$router.push('/listen-later');
    },
  },
};
</script>

<style scoped>
.player__actions {
  @apply ml-8 hidden md:flex items-center mr-8;
}

.player__action-button {
  @apply md:ml-4;
}
</style>
