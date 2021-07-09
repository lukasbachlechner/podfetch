<template>
  <div class="p-4 min-h-screen relative">
    <header class="mt-8 fullscreen__container">
      <div class="fullscreen__cols-center">
        <nuxt-link to="/" class="inline-flex">
          <logomark />
        </nuxt-link>
      </div>
    </header>
    <main>
      <Nuxt />
    </main>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
* >>> .h2 {
  @apply font-black w-3/4 leading-none mt-12 mb-4;
  font-size: 2rem;
}

* >>> .muted {
  @apply opacity-50;
}

* >>> .fullscreen__container {
  @apply max-w-4xl mx-auto md:grid md:grid-cols-4;
}

* >>> .fullscreen__cols-center {
  @apply col-start-2 col-end-4;
}
</style>
