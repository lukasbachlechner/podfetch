<template>
  <li class="category__item">
    <nuxt-link :to="`/categories/${category.slug}`" class="category__link">
      {{ category.name }}
    </nuxt-link>
  </li>
</template>

<script>
export default {
  props: {
    category: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.category__link {
  @apply bg-haiti-middle flex items-center justify-center py-4 rounded hover-safe:hover:bg-haiti-high;
  @apply md:py-8;
}
</style>
