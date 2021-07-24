<template>
  <div class="page">
    <category-pill-list
      :categories="chosenCategories"
      :has-link="false"
      class="mb-4"
      @category-clicked="handleCategoryClicked"
    />
    <label for="categorySearchInput" class="sr-only">Search</label>
    <form-input
      type="search"
      v-model="searchTerm"
      placeholder="Search"
      id="categorySearchInput"
      class="mb-8"
    />
    <ul class="category-picker__list">
      <li
        class="category-picker__item"
        v-for="category in searchedCategories"
        :key="category.id"
      >
        <input
          type="checkbox"
          :id="category.slug"
          :value="category"
          v-model="chosenCategories"
          class="category-picker__input"
        />
        <label :for="category.slug" class="category-picker__label">
          {{ category.name }}
        </label>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data: () => ({
    categories: null,
    chosenCategories: [],
    searchTerm: '',
  }),
  async fetch() {
    try {
      this.categories = await this.$api.getCategories();
    } catch (e) {
      console.log(e);
    }
  },
  computed: {
    searchedCategories() {
      return this.categories.filter((category) =>
        category.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    },
  },
  methods: {
    handleCategoryClicked(categoryId) {
      const categoryIndex = this.chosenCategories.findIndex(
        (category) => category.id === categoryId
      );
      this.chosenCategories.splice(categoryIndex, 1);
    },
  },
};
</script>

<style scoped>
.category-picker__list {
  @apply grid grid-cols-2 gap-4;
  @apply md:grid-cols-4;
}

.category-picker__input {
  @apply hidden;
}

.category-picker__label {
  @apply w-full flex justify-center bg-haiti-middle py-8 rounded cursor-pointer;
}

.category-picker__label:hover {
  @apply bg-haiti-high;
}

.category-picker__input:checked + .category-picker__label {
  @apply bg-accent;
}
</style>
