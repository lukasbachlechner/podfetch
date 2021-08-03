<template>
  <div class="player__actions">
    <episode-actions use-current-episode />
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.player__actions {
  @apply ml-8 hidden items-center mr-8;
  @apply md:flex;
}
</style>
