<template>
  <div class="player__track">
    <span class="player__track-time">{{ $formatter.time(currentTime) }}</span>
    <input
      type="range"
      class="player__track-input"
      @input="handleInput"
      @change="handleChange"
      ref="track"
      value="0"
      :max="max"
      :style="trackCssVariables"
    />
    <span class="player__track-time">{{ $formatter.time(totalDuration) }}</span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  props: {
    max: {
      type: Number,
      required: true,
    },
  },
  data: () => ({
    fillPercentage: 0,
  }),
  computed: {
    ...mapGetters({
      totalDuration: 'player/totalDuration',
      currentTime: 'player/currentTime',
    }),
    trackCssVariables() {
      return {
        '--fill-percentage': `${this.fillPercentage}%`,
      };
    },
  },
  methods: {
    handleInput(event) {
      this.setTrackFill();
      this.$emit('track-input', event.target.value);
    },
    handleChange(event) {
      this.$emit('track-change', event.target.value);
    },
    setTrackFill() {
      const { track } = this.$refs;
      this.fillPercentage = (track.valueAsNumber / track.max) * 100;
    },
    setValue(value) {
      const { track } = this.$refs;
      track.value = value;
      this.setTrackFill();
    },
  },
};
</script>

<style scoped>
.player__track {
  @apply items-center flex-grow hidden;
  @apply md:ml-8 md:flex;
}

.player__track-input {
  @apply bg-white bg-opacity-10 appearance-none outline-none w-full h-1 relative cursor-pointer;
  @apply md:mx-4;
}

.player__track-input::before {
  @apply absolute bg-accent h-full block left-0 top-0;
  content: '';
  width: var(--fill-percentage);
}

.player__track-input::-moz-range-track {
  @apply w-full h-1;
}

.player__track-input::-moz-range-progress {
  @apply bg-accent;
}

.player__track-input::-moz-focus-outer {
  @apply border-0;
}

.player__track-input::-moz-range-thumb {
  @apply w-4 h-4 bg-accent rounded-full appearance-none border-0;
}

.player__track-input::-webkit-slider-thumb {
  @apply w-4 h-4 bg-accent rounded-full appearance-none;
}

.player__track-input:active::-moz-range-thumb {
  @apply transform scale-110 bg-accent-middle;
}

.player__track-input:active::-webkit-slider-thumb {
  @apply transform scale-110 bg-accent-middle;
}

.player__track-time {
  @apply text-sm opacity-50 leading-none mb-1 block;
  font-variant-numeric: tabular-nums;
  width: 5ch;
}
</style>
