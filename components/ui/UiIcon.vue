<template>
  <svg-icon :name="name" :width="size" :height="size" />
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: false,
      default: '20',
    },
  },
};
</script>

<style scoped></style>
