<template>
  <div>
    <label for="categorySearchInput" class="sr-only">Search</label>
    <form-input
      type="search"
      v-model="searchTerm"
      placeholder="Search Categories..."
      id="categorySearchInput"
      class="mb-8"
    />
    <ul class="category__list">
      <category-item
        v-for="category in filteredCategories"
        :key="category.id"
        :category="category"
      />
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data: () => ({
    searchTerm: '',
  }),
  computed: {
    ...mapGetters({
      categories: 'allCategories',
    }),
    filteredCategories() {
      return this.categories?.filter((category) =>
        category.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    },
  },
};
</script>

<style scoped>
.category__list {
  @apply grid grid-cols-1 gap-4;
  @apply sm:grid-cols-2;
  @apply lg:grid-cols-3;
  @apply xl:grid-cols-4;
}
</style>
