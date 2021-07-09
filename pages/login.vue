<template>
  <section class="fullscreen__container">
    <div class="fullscreen__cols-center">
      <div>
        <h2 class="h2">Welcome Back!</h2>
        <p class="muted">Please log in.</p>
      </div>
      <div class="mt-16">
        <auth-login-form />
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
