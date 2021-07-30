<template>
  <div>
    <li class="notification__item">
      <div
        class="notification__content"
        :class="{
          'bg-success': notification.level === 'success',
          'bg-error': notification.level === 'error',
        }"
      >
        <ui-icon
          class="notification__icon"
          :name="
            notification.level === 'success'
              ? 'check-circle'
              : 'exclamation-circle'
          "
        />
        <p>
          {{ notification.content }}
        </p>
        <div class="notification__progress-wrapper">
          <div
            class="notification__progress-bar"
            :style="`--timeout:${this.timeout}s`"
          ></div>
        </div>
      </div>
    </li>
  </div>
</template>

<script>
export default {
  props: {
    notification: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    timeout: 5,
  }),
  mounted() {
    setTimeout(() => {
      this.$store.commit(
        'notifications/REMOVE_NOTIFICATION',
        this.notification.id
      );
    }, this.timeout * 1000);
  },
};
</script>

<style scoped>
.notification__item {
  @apply flex justify-end mb-2;
}

.notification__content {
  @apply inline-flex p-4 rounded relative items-center w-full;
  @apply md:w-auto;
}

.notification__icon {
  @apply mr-2;
}

.notification__progress-wrapper {
  @apply w-full h-1 bg-white bg-opacity-50 absolute left-0 bottom-0 rounded;
}

.notification__progress-bar {
  @apply bg-white h-full rounded;
  animation: fill var(--timeout) linear;
}

@keyframes fill {
  from {
    @apply w-0;
  }
  to {
    @apply w-full;
  }
}
</style>
