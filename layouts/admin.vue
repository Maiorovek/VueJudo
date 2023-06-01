<template>
    <section class="admin">
        <slot/>
        <EditedModal/>
        <adminFriendModal/>
    </section>
</template>

<script setup>
import EditedModal from "~/components/EditedModal.vue";
import adminFriendModal from "~/components/admin/admin-friend-modal.vue";
import { useStore } from "~/store";

const store = useStore()

onMounted(() => {
   store.fetchArticleCategories()
   store.fetchArticlesList()
   store.fetchEventsList()
   store.fetchFriendsList()
})
</script>
