<template>
  <li class="category__item">
    <nuxt-link :to="`/category/${category.slug}`" class="category__link">{{
      category.name
    }}</nuxt-link>
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
.category__item {
  @apply mb-4;
}

.category__link {
  @apply bg-haiti-middle rounded flex justify-center py-8 hover:bg-haiti-high;
}
</style>
