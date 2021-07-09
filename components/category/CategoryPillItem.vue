<template>
  <li class="category__pill-item">
    <nuxt-link class="category__pill-link" :to="`/category/${category.slug}`">{{
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
.category__pill-link {
  @apply flex bg-haiti-middle rounded-full px-6 py-2;
}
</style>
