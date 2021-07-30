<template>
  <div>
    <transition-group
      name="notification__transition-group"
      tag="ul"
      class="notification__wrapper"
    >
      <notification-item
        v-for="notification in notifications"
        :key="notification.id"
        :notification="notification"
      />
    </transition-group>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      notifications: 'notifications/notifications',
    }),
  },
};
</script>

<style scoped>
.notification__wrapper {
  @apply fixed left-4 right-4 z-50 bottom-48 flex flex-col;
  @apply md:bottom-20 md:right-8;
}

.notification__transition-group-move {
  transition: transform 0.2s;
}
</style>
