<template>
  <section class="section container">
    <h2 class="h2">Features</h2>

    <ul class="features__list">
      <pages-landing-feature-item
        v-for="(feature, i) in features"
        :key="i"
        :icon="feature.icon"
        :title="feature.title"
      >
        {{ feature.content }}
      </pages-landing-feature-item>
    </ul>
  </section>
</template>

<script>
export default {
  data: () => ({
    features: [
      {
        title: 'Listen everywhere',
        icon: 'earbuds',
        content:
          'We use modern web technology for a native experience in your browser - no need to download anything.',
      },
      {
        title: 'Made for you',
        icon: 'lightning-fill',
        content:
          'You tell us what you like - we generate your personalized recommendations. As unique as you are.',
      },
      {
        title: 'Offline usage',
        icon: 'wifi-off',
        content:
          'Slow internet, data cap or on a plane? Download your favorite episodes beforehand to listen offline.',
      },
      {
        title: 'Ad-free',
        icon: 'emoji-heart-eyes',
        content:
          "We believe in distraction-free listening. We won't run any ads in or between episodes. Or anywhere on our page.",
      },
    ],
  }),
};
</script>

<style scoped>
.features__list {
  @apply grid lg:grid-cols-4 sm:grid-cols-2 gap-8 mt-8;
}
</style>
