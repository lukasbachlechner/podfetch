<template>
  <div class="spinner"></div>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      required: false,
      default: '48',
    },
  },
};
</script>

<style scoped>
.spinner {
  @apply rounded-full border-2 border-current relative flex h-5 w-5;
  border-left-color: transparent;
  animation: spin 0.7s infinite linear;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
