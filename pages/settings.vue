<template>
  <div>
    <page-header title="Settings" />
    <section class="settings__section">
      <h2 class="h2">Account</h2>
      <div v-if="$auth.loggedIn">
        <p>You are currently logged in as {{ $auth.user.email }}.</p>

        <ui-button @click="$auth.logout()" type="outline">Logout</ui-button>
      </div>
      <div v-else>
        <p>You are currently logged out.</p>
        <ui-button type="outline" tag="nuxt-link" to="/login">Login</ui-button>
      </div>
    </section>

    <section class="settings__section">
      <h2 class="h2">Storage</h2>
      <storage-info />
      <ui-button type="outline" icon="trash"
        >Delete all local episodes</ui-button
      >
    </section>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.settings__section {
  @apply mb-16;
}
</style>
