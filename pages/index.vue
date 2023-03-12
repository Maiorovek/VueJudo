<template>
  <div class="main-section">
    <div class="wrapper">
      <h1>Welcome to the homepage</h1>
      <img src="" alt="">
      <NewsSection />
    </div>
  </div>
</template>

<script>
import {useStore} from "~/store";
import NewsSection from "~/components/sections/news-section.vue";

export default {
  components: {NewsSection},
  data() {
    return {}
  },
  setup() {
    const siteInfo = computed(() => useStore().getSiteSetting)
    useHead({
      title: `${siteInfo.value.name.param}`,
    })
  },

}

</script>
