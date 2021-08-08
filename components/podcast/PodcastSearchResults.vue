<template>
  <div>
    <ul v-if="podcasts.length" class="podcast__grid">
      <podcast-search-result-item
        v-for="podcast in podcasts"
        :key="podcast.id"
        :podcast="podcast"
      />
    </ul>
    <p v-else>No categories found.</p>
  </div>
</template>

<script>
export default {
  props: {
    podcasts: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.podcast__grid {
  @apply flex flex-col;
}
</style>
