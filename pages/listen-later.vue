<template>
  <div class="page">
    <page-header title="Listen Later" />
    <section class="section">
      <div class="section__header">
        <h2 class="h2">Downloaded</h2>
        <storage-info />
      </div>

      <episode-download-list />

      <episode-local-list :episodes="downloadedEpisodes" />
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      downloadedEpisodes: 'downloader/downloadedEpisodes',
    }),
  },
};
</script>
