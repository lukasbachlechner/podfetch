<template>
  <ul class="podcast-skeleton__list">
    <li v-for="i in 6" :key="i" class="podcast-skeleton__item">
      <skeleton-item />
    </li>
  </ul>
</template>

<script>
export default {};
</script>

<style scoped>
.podcast-skeleton__list {
  @apply grid grid-cols-11 gap-4;
}

.podcast-skeleton__item {
  @apply col-span-2 aspect-w-1 aspect-h-1;
}

.podcast-skeleton__item:last-of-type {
  @apply col-span-1;
}
</style>
