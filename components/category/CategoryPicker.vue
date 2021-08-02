<template>
  <div class="page">
    <header class="category-picker__header">
      <p class="muted">
        Please select 5 or more categories that match your interest best. We’ll
        generate personalized recommendations based on your choices.
      </p>
      <category-pill-list
        :categories="chosenCategories"
        :has-link="false"
        class="my-4"
        @category-clicked="handleCategoryClicked"
      />

      <ui-button
        :disabled="remaining > 0"
        v-show="remaining < 5"
        @click="$emit('categories-chosen', chosenCategories)"
      >
        <span v-show="remaining > 0">Select {{ remaining }} more</span>
        <span v-show="remaining <= 0">Continue</span>
      </ui-button>
    </header>

    <label for="categorySearchInput" class="sr-only">Search</label>
    <form-input
      type="search"
      v-model="searchTerm"
      placeholder="Search"
      id="categorySearchInput"
      class="mb-8"
    />

    <ul class="category-picker__list" v-if="searchedCategories">
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

          <ui-icon
            name="check-circle"
            class="category-picker__label-icon--checked"
          />
          <ui-icon name="circle" class="category-picker__label-icon" />
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
      return this.categories?.filter((category) =>
        category.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    },
    remaining() {
      return 5 - this.chosenCategories.length;
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
.category-picker__header {
  @apply mb-4;
}

.category-picker__list {
  @apply grid grid-cols-2 gap-4;
  @apply md:grid-cols-4;
}

.category-picker__input {
  @apply hidden;
}

.category-picker__label {
  @apply w-full flex justify-between items-center bg-haiti-middle p-4 rounded cursor-pointer;
}

.category-picker__label:hover {
  @apply bg-haiti-high;
}

.category-picker__input:checked + .category-picker__label {
  @apply bg-accent;
}

.category-picker__label-icon--checked {
  @apply hidden;
}

.category-picker__input:checked
  + .category-picker__label
  .category-picker__label-icon--checked {
  @apply block;
}

.category-picker__input:checked
  + .category-picker__label
  .category-picker__label-icon {
  @apply hidden;
}
</style>
