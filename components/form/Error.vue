<template>
  <span class="form__error-message">
    <slot></slot>
  </span>
</template>

<script>
export default {};
</script>

<style scoped>
.form__error-message {
  @apply text-error mt-1;
}
</style>
