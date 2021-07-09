<template>
  <div class="nav__wrapper">
    <div class="nav__logo-wrapper">
      <logomark class="nav__logo" />
    </div>
    <player-base />
    <nav-list />
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.nav__logo-wrapper {
  @apply hidden w-full justify-center mt-9;
  @apply md:flex  lg:mt-9 lg:mb-8;
  @apply lg:justify-start lg:px-4 lg:mb-8;
}

.nav__wrapper {
  @apply fixed z-50 left-0 bottom-0 bg-haiti-middle w-full;
  @apply md:w-auto md:top-0 md:p-0;
  @apply lg:w-64;
}
</style>
