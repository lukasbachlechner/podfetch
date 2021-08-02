<template>
  <li class="category__pill-item">
    <component
      :is="hasLink ? 'nuxt-link' : 'span'"
      @click="handleClick"
      class="category__pill-link"
      :to="`/categories/${category.slug}`"
      >{{ category.name }}</component
    >
  </li>
</template>

<script>
export default {
  props: {
    category: {
      type: Object,
      required: true,
    },
    hasLink: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    handleClick() {
      if (!this.hasLink) {
        this.$emit('category-clicked', this.category.id);
      }
    },
  },
};
</script>

<style scoped>
.category__pill-link {
  @apply flex bg-haiti-middle rounded-full px-6 py-2 mr-2 mb-2 cursor-pointer hover-safe:hover:bg-haiti-high;
}
</style>
