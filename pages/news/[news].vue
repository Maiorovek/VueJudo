<template>
  <section class="news-page">
    <div class="wrapper">
      <div v-if="news === undefined">загрузка</div>
      <div v-html="news.content"></div>
    </div>
  </section>
</template>

<script>
import {useStore} from "~/store";
export default {
  data() {
    return {
      news: {},
    }
  },
  computed: {

  },
  mounted() {
    this.news = useStore().getArticle(this.$route.params.news)
  },
}
</script>
