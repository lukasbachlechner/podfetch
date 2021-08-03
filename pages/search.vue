<template>
  <div class="page">
    <page-header title="Search" />

    <label for="searchInput" class="sr-only">Search</label>
    <form-input
      type="search"
      v-model="q"
      placeholder="Search podcasts or categories..."
      id="searchInput"
      class="mb-8"
      :autofocus="'autofocus'"
      @input="searchDebounced"
    />

    <div class="search__loading" v-show="isSearching">
      <loading-spinner />
    </div>

    <div v-show="!isSearching">
      <div class="search__results" v-show="q && q.length">
        <section class="search__podcast-results">
          <h2 class="h2">Podcasts</h2>
          <podcast-search-results :podcasts="podcasts" />
        </section>

        <section class="search__category-results">
          <h2 class="h2">Categories</h2>
          <category-search-results :categories="categories" />
        </section>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      q: this.$route.query.q,
      podcasts: [],
      categories: [],
      debounce: null,
      isSearching: false,
    };
  },
  async fetch() {
    this.q?.length && (await this.search());
  },
  methods: {
    async search() {
      this.isSearching = true;
      try {
        const { podcasts, categories } = await this.$api.search(this.q);
        this.podcasts = podcasts;
        this.categories = categories;
      } catch (e) {
        console.error(e.message);
      } finally {
        this.isSearching = false;
      }
    },
    searchDebounced() {
      clearTimeout(this.debounce);

      this.debounce = setTimeout(async () => {
        await this.search();
      }, 200);
    },
  },
  watch: {
    q(newVal) {
      newVal &&
        this.$router
          .replace({ query: { ...this.$route.query, q: newVal } })
          .catch(() => {});
    },
    '$route.query.q'(newVal) {
      this.q = newVal;
    },
  },
};
</script>

<style scoped>
.search__results {
  @apply md:grid md:grid-cols-3 gap-8;
}

.search__loading {
  @apply flex justify-center text-accent;
}

.search__podcast-results {
  @apply md:col-span-2 mb-8;
}
</style>
