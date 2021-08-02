<template>
  <li>
    <nuxt-link
      :to="`/podcast/${podcast.titleSlug}/${podcast.id}`"
      class="podcast__item"
    >
      <div>
        <ui-image
          class="podcast__image"
          :src="imageUrl"
          :alt="podcast.title"
          loading="lazy"
          width="300"
          height="300"
        />
      </div>

      <h3 class="podcast__title">{{ podcast.title }}</h3>
    </nuxt-link>
  </li>
</template>

<script>
export default {
  props: {
    podcast: {
      type: Object,
      required: true,
    },
  },
  computed: {
    imageUrl() {
      const { apiUrl } = this.$config;
      const encodedSrc = encodeURIComponent(this.podcast.image);
      return `${apiUrl}images/300/${encodedSrc}`;
    },
  },
};
</script>

<style scoped>
.podcast__image {
  @apply w-full h-full object-cover rounded;
}

.podcast__title {
  @apply ellipsis mt-2;
}
</style>
