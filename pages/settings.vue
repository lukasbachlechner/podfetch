<template>
  <div>
    <page-header title="Settings" />
    <section class="section">
      <h2 class="h2">Account</h2>
      <p>You are currently logged in as {{ $auth.user.email }}.</p>
      <button @click="$auth.logout()">Logout</button>
    </section>
  </div>
</template>

<script>
export default {};
</script>

<style scoped></style>
