<template>
  <div>
    <podcast-list-skeleton v-show="loading" />
    <swiper
      ref="podcastSwiper"
      :options="swiperOptions"
      @ready="loading = false"
      v-show="!loading"
    >
      <podcast-item
        v-for="(podcast, i) in podcasts"
        :key="i"
        :podcast="podcast"
        class="swiper-slide"
      />
      <div class="swiper-pagination"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  props: {
    podcasts: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    swiperOptions: {
      pagination: {
        el: '.swiper-pagination',
      },
      slidesPerView: 5.5,
      spaceBetween: 16,
    },

    loading: true,
  }),
};
</script>

<style scoped></style>
