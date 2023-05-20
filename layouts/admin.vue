<template>
    <section class="admin">
        <slot/>
        <EditedModal/>
    </section>
</template>

<script>
import EditedModal from "~/components/EditedModal.vue";
import { useStore } from "~/store";

export default {
   name: "admin",
   components: {
      EditedModal,
   },
   mounted() {
      useStore().fetchArticleCategories()
      useStore().fetchArticlesList()
      useStore().fetchEventsList()
      useStore().fetchFriendsList()
   },
}
</script>
