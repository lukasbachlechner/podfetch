<template>
  <ul class="nav__list">
    <nav-item v-for="(item, i) in guardedNavItems" :key="i" :item="item" />
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
        public: true,
      },
      {
        title: 'Listen Later',
        icon: 'heart',
        link: '/listen-later',
      },
      {
        title: 'Downloads',
        icon: 'download',
        link: '/downloads',
      },
      {
        title: 'Categories',
        icon: 'grid',
        link: '/categories',
        public: true,
      },
      {
        title: 'Search',
        icon: 'search',
        link: '/search',
        public: true,
      },
      {
        title: 'Settings',
        icon: 'gear',
        link: '/settings',
      },
    ],
  }),
  computed: {
    guardedNavItems() {
      return this.navItems.filter((item) => {
        if (item.public || (!item.public && this.$auth.loggedIn)) {
          return item;
        }
        return false;
      });
    },
  },
};
</script>

<style scoped>
.nav__list {
  @apply flex justify-between items-center p-4 pb-12;
  @apply md:flex-col md:items-start;
}
</style>
