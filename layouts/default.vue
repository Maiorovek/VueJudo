<template>
    <div class="site">
        <AppHeader/>
        <slot/>
        <AppFooter/>
        <EditedModal/>
    </div>
</template>

<script setup>
import AppHeader from "~/components/header/AppHeader.vue";
import AppFooter from "~/components/footer/AppFooter.vue";
import EditedModal from "~/components/EditedModal.vue";
import { useStore } from "~/store";

const store = useStore()

const siteInfo = computed(() => useStore().getSiteSetting)

useHead({
   title: siteInfo.value.name.param,
})

onMounted(() => {
   store.fetchArticleCategories()
   store.fetchArticlesList()
   store.fetchEventsList()
   store.fetchFriendsList()
})
</script>
