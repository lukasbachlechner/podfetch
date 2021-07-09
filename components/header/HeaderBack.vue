<template>
  <div class="header-back__wrapper">
    <button @click="$router.back()" class="header-back__button">
      <ui-icon name="arrow-left" />
      Back
    </button>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.header-back__button {
  @apply flex gap-4 items-center mb-4;
}
</style>
