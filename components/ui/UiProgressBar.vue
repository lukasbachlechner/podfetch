<template>
  <progress :value="value" :max="max" class="progress-bar"></progress>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      required: true,
    },
    max: {
      type: Number,
      required: false,
      default: 1,
    },
  },
};
</script>

<style scoped>
.progress-bar,
.progress-bar::-webkit-progress-bar {
  @apply bg-white bg-opacity-10 rounded appearance-none h-1;
}

.progress-bar::-moz-progress-bar {
  @apply bg-gradient-to-tr from-accent to-accent-middle rounded;
}

.progress-bar::-webkit-progress-value {
  @apply bg-gradient-to-tr from-accent to-accent-middle rounded;
}
</style>
