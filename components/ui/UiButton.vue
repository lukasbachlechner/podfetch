<template>
  <component
    :is="tag"
    :to="to"
    class="button"
    :class="{
      'button--default': type === '',
      'button--link': type === 'link',
      'button--ghost': type === 'ghost',
    }"
    @click="$emit('click', $event)"
  >
    <span>
      <slot></slot>
    </span>
  </component>
</template>

<script>
export default {
  props: {
    tag: {
      type: String,
      required: false,
      default: 'button',
    },
    to: {
      type: String,
      required: false,
      default: '',
    },
    type: {
      type: String,
      required: false,
      default: '',
    },
  },
};
</script>

<style scoped>
.button {
  @apply inline-flex px-8 rounded items-center justify-center;
  height: 3.25rem;
}

.button--default {
  @apply bg-gradient-to-tr from-accent to-accent-middle;
}

.button--link {
  @apply bg-transparent hover:underline;
}
</style>
