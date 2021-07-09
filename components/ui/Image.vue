<template>
  <div>
    <img
      v-if="src"
      :src="imageUrl"
      :alt="alt"
      class="ui__image"
      loading="lazy"
    />
    <div v-else class="ui__image-placeholder">
      <ui-icon name="image" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      required: false,
      default: '',
    },
    size: {
      type: String,
      required: false,
      default: '300',
    },
  },
  computed: {
    imageUrl() {
      const { apiUrl } = this.$config;
      const encodedSrc = encodeURIComponent(this.src);
      return `${apiUrl}images/${this.size}/${encodedSrc}`;
    },
  },
};
</script>

<style scoped>
.ui__image {
  @apply w-full h-full object-cover rounded;
}

.ui__image-placeholder {
  @apply bg-haiti-high w-full h-full rounded flex items-center justify-center;
}
</style>
