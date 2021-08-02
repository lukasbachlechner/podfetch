<template>
  <li class="recent-episode__wrapper">
    <ui-image
      :src="episode.image"
      :alt="episode.title"
      size="48"
      class="recent-episode__image"
    />
    <div class="overflow-hidden">
      <h3 class="ellipsis font-bold">
        {{ episode.title }}
      </h3>
      <h4 class="ellipsis muted">
        {{ episode.podcastTitle }}
      </h4>
    </div>

    <nuxt-link
      :to="`/episode/${episode.titleSlug}/${episode.id}`"
      class="recent-episode__link"
    >
      <span class="sr-only">To Episode "{{ episode.title }}"</span>
    </nuxt-link>
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
};
</script>

<style scoped>
.recent-episode__wrapper {
  @apply p-4 rounded bg-haiti-middle relative hover-safe:hover:bg-haiti-high cursor-pointer flex items-center;
}

.recent-episode__image {
  @apply w-12 h-12 flex-shrink-0 mr-4;
}

.recent-episode__link {
  @apply absolute top-0 left-0 w-full h-full;
}
</style>
