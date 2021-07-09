<template>
  <div class="player__actions">
    <button class="player__action-button">
      <ui-icon name="heart" />
    </button>
    <button class="player__action-button">
      <ui-icon name="download" />
    </button>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.player__actions {
  @apply ml-8 hidden md:flex gap-4 items-center mr-8;
}
</style>
