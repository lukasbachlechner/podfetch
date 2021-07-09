<template>
  <div class="slider-component">
    <div class="slidecontainer">
      <input
        ref="input"
        v-model="currentValue"
        type="range"
        :min="min"
        :max="max"
        class="slider"
        @input="onInput"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      required: true,
    },
    min: {
      type: Number,
      required: true,
    },
    max: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      currentValue: this.value,
    };
  },
  methods: {
    onInput() {
      // this.currentValue is a string because HTML is weird
      this.$emit('input', parseInt(this.currentValue));
    },
  },
};
</script>

<style scoped>
.slider {
  @apply bg-white bg-opacity-50 appearance-none outline-none w-full h-1;
}
.slider::-webkit-slider-thumb {
  @apply w-4 h-4 bg-accent rounded-full appearance-none;
}

.slider::-moz-range-progress {
  @apply bg-accent;
}

.slider::-moz-range-thumb {
  @apply w-4 h-4 bg-accent rounded-full appearance-none border-0;
}
</style>
