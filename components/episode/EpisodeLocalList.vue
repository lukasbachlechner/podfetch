<template>
  <ul class="episode__list">
    <episode-local-item
      v-for="episode in episodes"
      :key="episode.id"
      :episode="episode"
    />
  </ul>
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
