<template>
  <div class="player__controls">
    <button class="player__skip-button" @click="$emit('skip-backward')">
      <ui-icon name="backward-15-seconds" />
    </button>
    <button
      class="player__play-button"
      @click="$emit('toggle-playback', $event)"
    >
      <ui-icon name="pause" size="32" v-show="isPlaying" />
      <ui-icon name="play-fill" size="32" class="ml-1" v-show="!isPlaying" />
      <span class="sr-only">Pause</span>
    </button>
    <button class="player__skip-button" @click="$emit('skip-forward')">
      <ui-icon name="forward-15-seconds" />
    </button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters({ isPlaying: 'player/isPlaying' }),
  },
};
</script>

<style scoped>
.player__controls {
  @apply flex items-center ml-auto relative z-10;
  @apply md:mx-4;
}

.player__play-button {
  @apply rounded-full bg-white bg-opacity-10 w-12 h-12 flex-shrink-0 flex-grow flex items-center justify-center mx-2;
}

.player__skip-button {
  @apply hidden md:block hover-safe:hover:opacity-100;
}
</style>
