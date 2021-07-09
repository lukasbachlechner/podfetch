<template>
  <ul class="category__pill-list">
    <category-pill-item
      v-for="category in categories"
      :key="category.id"
      :category="category"
    />
  </ul>
</template>

<script>
export default {
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.category__pill-list {
  @apply flex gap-2 flex-wrap;
}
</style>
