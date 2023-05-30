<template>
    <div class="main-section">
        <div class="wrapper">
            <h1>Дзюдо Магнитогорск</h1>
            <NewsSection v-if="settingPageIndex.newsList.state"/>
            <EventsSections v-if="settingPageIndex.calendar.state"/>
        </div>
    </div>
</template>

<script>
import { useStore } from "~/store";
import NewsSection from "~/components/sections/news-section.vue";
import EventsSections from "~/components/sections/events-sections.vue";

export default {
   components: {EventsSections, NewsSection},
   data() {
      return {}
   },
   setup() {
      const siteInfo = computed(() => useStore().getSiteSetting)
      definePageMeta({
         layout: "default",
      });
      useHead({
         title: `${siteInfo.value.name.param}`,
      })
   },
   computed: {
      settingPageIndex() {
         return useStore().getIndexPageSetting
      }
   }
}

</script>
