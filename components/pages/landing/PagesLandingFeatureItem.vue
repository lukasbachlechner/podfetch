<template>
  <li class="feature__item">
    <div class="feature__icon">
      <ui-icon :name="icon" />
    </div>
    <h3 class="feature__title">{{ title }}</h3>
    <p>
      <slot></slot>
    </p>
  </li>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.feature__item {
  @apply rounded px-4 py-8 bg-haiti-middle;
}

.feature__title {
  @apply font-bold text-2xl mb-8;
}

.feature__icon {
  @apply p-4 bg-gradient-to-tr from-accent to-accent-middle inline-flex rounded mb-4;
}
</style>
