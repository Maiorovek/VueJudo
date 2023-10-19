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
import { state } from "~/store/state";
import NewsSection from "~/components/sections/news-section.vue";
import EventsSections from "~/components/sections/events-sections.vue";

export default {
   components: {EventsSections, NewsSection},
   setup() {
      const store = useStore()
      const siteInfo = computed(() => store.getSiteSetting)

      definePageMeta({
         layout: "default",
      });
      useHead({
         title: ``,
      })

      const reactiveStore = reactive(store.setting);

      watch(() => reactiveStore, () => {
            useHead({
               title: `${siteInfo.value.name.param}`,
            })
         },
         {deep: true}
      );
   },
   computed: {
      settingPageIndex() {
         return state().getIndexPageSetting
      }
   }
}

</script>
