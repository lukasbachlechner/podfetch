<template>
  <div class="download-quota" v-if="storageEstimate">
    <span class="download-quota__text muted"
      >{{ storageEstimate.usageMb }} used of {{ storageEstimate.quotaMb }}</span
    >
    <ui-progress-bar
      :value="storageEstimate.usage"
      :max="storageEstimate.quota"
      class="download-quota__progress"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      downloadedEpisodes: 'downloader/downloadedEpisodes',
      storageEstimate: 'downloader/storageEstimate',
    }),
  },
};
</script>

<style scoped>
.download-quota {
  @apply flex flex-col my-2;
  @apply md:flex-row md:items-center;
}

.download-quota__text {
  @apply text-sm mr-4 mb-1;
}

.download-quota__progress {
  @apply mt-2 md:mt-0;
}
</style>
