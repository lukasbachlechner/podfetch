<template>
  <ul class="category__pill-list">
    <category-pill-item
      v-for="category in categories"
      :key="category.id"
      :category="category"
      :has-link="hasLink"
      v-on="$listeners"
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
    hasLink: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
};
</script>

<style scoped>
.category__pill-list {
  @apply flex flex-wrap;
}
</style>
