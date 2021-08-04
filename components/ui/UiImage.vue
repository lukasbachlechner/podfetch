<template>
  <div>
    <img
      v-show="src"
      :src="imageUrl"
      :alt="alt"
      class="ui__image"
      loading="lazy"
      :width="size"
      :height="size"
    />
    <div v-show="!src" class="ui__image-placeholder">
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
  data: () => ({
    loaded: false,
  }),
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
  @apply w-full h-full object-cover rounded bg-haiti-high text-haiti text-opacity-0;
}

.ui__image-placeholder {
  @apply bg-haiti-high w-full h-full rounded flex items-center justify-center aspect-h-1 aspect-w-1;
}

.ui__image::before {
  @apply hidden;
}

.ui__image::after {
  @apply w-full h-full bg-haiti-high rounded flex items-center justify-center border border-haiti-middle;
  content: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgZmlsbD0iI2ZmZiIgY2xhc3M9ImJpIGJpLWltYWdlIiB2aWV3Qm94PSIwIDAgMTYgMTYiPgogIDxwYXRoIGQ9Ik02LjAwMiA1LjVhMS41IDEuNSAwIDEgMS0zIDAgMS41IDEuNSAwIDAgMSAzIDB6Ii8+CiAgPHBhdGggZD0iTTIuMDAyIDFhMiAyIDAgMCAwLTIgMnYxMGEyIDIgMCAwIDAgMiAyaDEyYTIgMiAwIDAgMCAyLTJWM2EyIDIgMCAwIDAtMi0yaC0xMnptMTIgMWExIDEgMCAwIDEgMSAxdjYuNWwtMy43NzctMS45NDdhLjUuNSAwIDAgMC0uNTc3LjA5M2wtMy43MSAzLjcxLTIuNjYtMS43NzJhLjUuNSAwIDAgMC0uNjMuMDYyTDEuMDAyIDEyVjNhMSAxIDAgMCAxIDEtMWgxMnoiLz4KPC9zdmc+Cg==');
}
</style>
