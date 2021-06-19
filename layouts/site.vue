<template>
  <div class="min-h-screen">
    <site-header />
    <main>
      <Nuxt />
    </main>
    <site-footer />
  </div>
</template>

<script>
export default {};
</script>

<style>
.h2 {
  @apply text-3xl md:text-4xl text-center font-bold;
}

.section {
  @apply mt-24 mb-48;
}
</style>
