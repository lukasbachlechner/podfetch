<template>
  <div class="player__actions">
    <button class="player__action-button">
      <ui-icon name="heart" />
    </button>
    <button class="player__action-button" @click="$emit('download-episode')">
      <ui-icon name="download" />
    </button>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.player__actions {
  @apply ml-8 hidden md:flex items-center mr-8;
}

.player__action-button {
  @apply md:ml-4;
}
</style>
