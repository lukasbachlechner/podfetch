<template>
  <li class="nav__list-item">
    <nuxt-link :to="item.link" class="nav__item">
      <ui-icon :name="item.icon" size="24" class="nav__icon" />
      <span class="sr-only lg:not-sr-only">
        {{ item.title }}
      </span>
    </nuxt-link>
  </li>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.nav__list-item {
  @apply md:w-full;
}
.nav__item {
  @apply flex w-12 h-12  items-center justify-center rounded select-none;
  @apply sm:w-14 sm:h-14;
  @apply lg:justify-start lg:w-full md:top-0 md:relative;
}

.nav__item.nuxt-link-exact-active {
  @apply bg-haiti-high text-accent;
  @apply lg:bg-transparent lg:font-bold;
}

.nav__list-item:hover {
  @apply text-accent;
}

.nav__icon {
  @apply lg:mr-4;
}

.nav__icon >>> svg {
  @apply h-6;
  @apply lg:h-4;
}
</style>
