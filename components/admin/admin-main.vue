<template>
    <div class="admin-view__inner">
        <h2 class="admin-title" v-text="'Главная'"/>
        <div class="admin-item" v-for="item in siteSetting">
            <adminEdit :editItem="item"/>
        </div>
    </div>
</template>

<script setup>
import { useStore } from "~/store"
import adminEdit from "~/components/admin/admin-setting-edit.vue"

useHead({
   titleTemplate: '%s : Главная',
})

const store = useStore()
const siteSetting = computed(() => {
   return Object.entries(store.getSiteSetting)
})

</script>
