<template>
  <div class="page">
    <page-header title="Listen Later" />
    <section class="section">
      <div class="section__header">
        <h2 class="h2">Downloaded</h2>
        <div class="download-quota" v-if="usage && quota">
          <span class="download-quota__text muted"
            >{{ usage }} MB used of {{ quota }} MB</span
          >
          <ui-progress-bar
            :value="usage"
            :max="quota"
            class="download-quota__progress"
          />
        </div>
      </div>

      <episode-download-list />
    </section>
  </div>
</template>

<script>
export default {
  data: () => ({
    usage: null,
    quota: null,
  }),
  async created() {
    if (
      process.client &&
      'storage' in navigator &&
      'estimate' in navigator.storage
    ) {
      const { usage, quota } = await navigator.storage.estimate();
      this.usage = this.$formatter.megaBytes(usage, 0);
      this.quota = this.$formatter.megaBytes(quota, 0);
    }
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
