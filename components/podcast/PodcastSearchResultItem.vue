<template>
  <li class="podcast__item">
    <div class="podcast__wrapper">
      <div class="podcast__image-wrapper">
        <ui-image
          class="podcast__image"
          :src="imageUrl"
          :alt="podcast.title"
          size="300"
        />
      </div>

      <nuxt-link
        :to="`/podcast/${podcast.titleSlug}/${podcast.id}`"
        class="podcast__link"
        ><h3 class="podcast__title ellipsis">{{ podcast.title }}</h3></nuxt-link
      >
    </div>
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
      if (this.podcast?.image) {
        const encodedSrc = encodeURIComponent(this.podcast.image);
        return `${apiUrl}images/300/${encodedSrc}`;
      }
      return '';
    },
  },
};
</script>

<style scoped>
.podcast__item {
  @apply relative mb-4;
}

.podcast__wrapper {
  @apply flex p-4 bg-haiti-middle rounded items-center hover-safe:hover:bg-haiti-high;
}

.podcast__image {
  @apply w-full h-full object-cover rounded;
}

.podcast__image-wrapper {
  @apply w-16 h-16 flex-shrink-0 mr-4;
}

.podcast__title {
  @apply ellipsis mt-2;
}

.podcast__link {
  @apply overflow-x-hidden;
}

.podcast__link::before {
  @apply w-full h-full absolute left-0 top-0;

  content: '';
}

.podcast__item:first-of-type {
  @apply md:col-span-2;
}

.podcast__item:first-of-type .podcast__image-wrapper {
  @apply w-20 h-20;
  @apply md:w-24 md:h-24;
  @apply lg:w-32 lg:h-32;
}

.podcast__item:first-of-type .podcast__title {
  @apply text-xl font-bold leading-normal;
  @apply md:text-2xl;
  @apply lg:text-3xl;
}
</style>
