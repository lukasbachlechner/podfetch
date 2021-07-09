<template>
  <section class="fullscreen__container">
    <div class="fullscreen__cols-center">
      <div>
        <h2 class="h2">Create Your Account</h2>
        <p class="muted">
          Enter your details below to start your listening experience.
        </p>
      </div>
      <div class="mt-16">
        <auth-signup-form />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  layout: 'fullscreen',
};
</script>

<style scoped></style>
