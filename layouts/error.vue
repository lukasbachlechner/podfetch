<template>
  <div>
    <div v-if="error.statusCode === 404">
      <page-header title="Whoops!" />
      <p class="mb-16">Sorry, we couldn't find what you were looking for.</p>
      <nuxt-link to="/">Back to home</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped></style>
