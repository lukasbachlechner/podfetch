<template>
  <div class="bg-haiti-600 text-white">
    <div class="fixed left-0 top-0 w-64 h-screen">Left</div>
    <main class="bg-haiti-500 mx-64 min-h-screen">
      <h1 class="text-3xl font-bold">Podfetch</h1>
      <Nuxt />
    </main>
    <div class="fixed right-0 top-0 w-64 h-screen">Right</div>
    <div class="layout__player">Player</div>
  </div>
</template>

<style>
.layout__player {
  @apply p-4 bg-haiti-400 fixed bottom-0 left-0 w-screen h-20;
}
</style>
