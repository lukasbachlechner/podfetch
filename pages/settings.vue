<template>
  <div>
    <page-header title="Settings" />
    <section class="settings__section">
      <h2 class="h2">Account</h2>
      <div v-if="$auth.loggedIn">
        <p>You are currently logged in as {{ $auth.user.email }}.</p>

        <ui-button @click="handleLogout" type="outline" class="mt-4"
          >Logout</ui-button
        >
      </div>
      <div v-else>
        <p>You are currently logged out.</p>
        <ui-button type="outline" tag="nuxt-link" to="/login" class="mt-4"
          >Login</ui-button
        >
      </div>
    </section>

    <section class="settings__section">
      <h2 class="h2">Storage</h2>
      <storage-info />
      <ui-button
        type="outline"
        icon="trash"
        @click="handleStorageClear"
        class="mt-4"
        >Delete all local episodes</ui-button
      >
    </section>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  methods: {
    async handleStorageClear() {
      await this.$storage.clearStorage();
      await this.$store.dispatch('downloader/getStorageEstimate');
      this.$notify('Storage cleared!');
    },
    async handleLogout() {
      await this.$auth.logout();
      this.$notify('You are logged out.');
      await this.$store.dispatch('player/getLastPlayedEpisode');
    },
  },
};
</script>

<style scoped>
.settings__section {
  @apply mb-16;
}
</style>
