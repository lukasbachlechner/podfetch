<template>
  <div class="page">
    <page-header title="Downloads" />
    <section class="section" v-show="isDownloading">
      <h2 class="h2">Currently Downloading</h2>

      <episode-download-list />
    </section>

    <section class="section">
      <div class="section__header">
        <h2 class="h2">Downloaded</h2>
        <storage-info />
      </div>

      <p v-if="!downloadedEpisodes.length">No downloaded episodes found.</p>
      <episode-local-list v-else :episodes="downloadedEpisodes" />
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  middleware: 'auth',
  computed: {
    ...mapGetters({
      downloadedEpisodes: 'downloader/downloadedEpisodes',
      isDownloading: 'downloader/isDownloading',
    }),
  },
};
</script>
