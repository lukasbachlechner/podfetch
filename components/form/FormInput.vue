<template>
  <input
    :type="type"
    :value="value"
    :id="id"
    class="form__input"
    :class="{ 'form__input--invalid': isInvalid }"
    @input="$emit('input', $event.target.value)"
  />
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: false,
      default: 'text',
    },
    value: {
      type: String,
      required: false,
      default: '',
    },
    id: {
      type: String,
      required: false,
      default: '',
    },
    isInvalid: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>

<style scoped>
.form__input {
  @apply w-full bg-white bg-opacity-10 border border-transparent focus:border-white rounded relative;

  height: 3.25rem;
}
</style>
