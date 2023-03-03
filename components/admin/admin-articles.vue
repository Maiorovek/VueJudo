<template>
  <div class="admin-view__inner">
    <h2 class="admin-title">Статьи</h2>
  </div>
</template>

<script>

export default {
  name: "admin-news",
  setup() {
    useHead({
      titleTemplate: '%s : Статьи',
    })
  },
}
</script>

<style scoped>

</style>
