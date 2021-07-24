<template>
  <div>
    <ul class="category__grid" v-if="categories.length">
      <category-search-result-item
        v-for="category in categories"
        :key="category.id"
        :category="category"
      />
    </ul>
    <p v-else>No categories found.</p>
  </div>
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
.category__grid {
  @apply flex flex-col;
}
</style>
