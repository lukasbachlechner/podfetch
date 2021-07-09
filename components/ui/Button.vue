<template>
  <component
    :is="tag"
    :to="to"
    class="button"
    :class="{
      'button--default': type === '',
      'button--link': type === 'link',
      'button--ghost': type === 'ghost',
      'button--full-width': fullWidth,
      'button--disabled': disabled,
    }"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <span v-show="!loading">
      <slot></slot>
    </span>
    <span v-show="loading">
      <loading-spinner />
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
    fullWidth: {
      type: Boolean,
      required: false,
      default: false,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    loading: {
      type: Boolean,
      required: false,
      default: false,
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

.button--full-width {
  @apply flex w-full;
}

.button--link {
  @apply bg-transparent hover:underline;
}

.button--disabled {
  @apply opacity-25 cursor-not-allowed;
}
</style>
