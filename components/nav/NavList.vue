<template>
  <ul class="nav__list">
    <nav-item v-for="(item, i) in navItems" :key="i" :item="item" />
  </ul>
</template>

<script>
export default {
  data: () => ({
    navItems: [
      {
        title: 'Home',
        icon: 'house',
        link: '/',
      },
      {
        title: 'Explore',
        icon: 'compass',
        link: '/explore',
      },
      {
        title: 'Listen Later',
        icon: 'heart',
        link: '/listen-later',
      },
      {
        title: 'Categories',
        icon: 'grid',
        link: '/categories',
      },
      {
        title: 'Search',
        icon: 'search',
        link: '/search',
      },
      {
        title: 'Settings',
        icon: 'gear',
        link: '/settings',
      },
    ],
  }),
};
</script>

<style scoped>
.nav__list {
  @apply flex justify-between items-center p-4 pb-12;
  @apply md:flex-col md:items-start;
}
</style>
