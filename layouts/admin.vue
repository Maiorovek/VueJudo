<template>
    <section class="admin">
        <slot/>
        <EditedModal/>
        <adminFriendModal/>
    </section>
</template>

<script>
import EditedModal from "~/components/EditedModal.vue";
import adminFriendModal from "~/components/admin/admin-friend-modal.vue";
import { useStore } from "~/store";

export default {
   name: "admin",
   components: {
      EditedModal, adminFriendModal
   },
   mounted() {
      useStore().fetchArticleCategories()
      useStore().fetchArticlesList()
      useStore().fetchEventsList()
      useStore().fetchFriendsList()
   },
}
</script>
