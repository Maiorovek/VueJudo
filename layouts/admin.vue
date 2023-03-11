<template>
  <section class="admin">
    <slot />
    <EditedModal />
  </section>
</template>

<script>
import EditedModal from "~/components/EditedModal.vue";
export default {
  name: "admin",
  components: {
    EditedModal,
  },
}
</script>

<style scoped>

</style>
