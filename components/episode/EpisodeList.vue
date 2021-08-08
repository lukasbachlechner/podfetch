<template>
  <div>
    <p v-if="!episodes.length">No episodes marked for Listen Later.</p>
    <ul v-else class="episode__list">
      <episode-item
        v-for="episode in episodes"
        :key="episode.id"
        :episode="episode"
      />
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    episodes: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.episode__list {
  @apply flex flex-col;
}
</style>
