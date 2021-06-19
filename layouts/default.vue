<template>
  <div class="bg-haiti-middle text-white">
    <div class="fixed left-0 top-0 w-64 h-screen">Left</div>
    <main class="bg-haiti ml-64 min-h-screen">
      <h1 class="text-3xl font-bold">Podfetch</h1>
      <Nuxt />
    </main>
    <div class="layout__player">Player</div>
  </div>
</template>

<style>
.layout__player {
  @apply p-4 bg-haiti-high fixed bottom-0 left-0 w-screen h-20;
}
</style>
