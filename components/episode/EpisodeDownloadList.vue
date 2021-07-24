<template>
  <ul class="episode__list">
    <episode-download-item
      v-for="episode in currentDownloadEpisodes"
      :key="episode.id"
      :episode="episode"
    />
  </ul>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      currentDownloadEpisodes: 'downloader/currentDownloads',
    }),
  },
};
</script>

<style scoped>
.episode__list {
  @apply flex flex-col;
}
</style>
