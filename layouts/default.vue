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
import AppFooter from "~/components/AppFooter.vue";
import EditedModal from "~/components/EditedModal.vue";
import {useStore} from "~/store";
const siteInfo = computed(() => useStore().getSiteSetting)

useHead({
  title: siteInfo.value.nameSite,
  meta: [{
    name: 'Главная страница сайта',
  }]
})
</script>
