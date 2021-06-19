<template>
  <footer class="bg-haiti-middle">
    <div class="container flex justify-between items-center p-16">
      <logo class="h-12" />

      <nuxt-link to="/legal">Legal</nuxt-link>

      <p>&copy; {{ new Date().getFullYear() }} Podfetch</p>
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style scoped></style>
