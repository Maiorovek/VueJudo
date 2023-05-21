<template>
    <section class="news-section">
        <div class="news" v-for="news in filteredListNews.slice(0, 3)">
            <div class="image">
                <img :src="news.preview" alt="">
            </div>
            <div class="news-content">
                <div class="content-top">
                    <div class="category" v-text="categoryName(news.category)"/>
                    <div class="data" v-text="formatedDate(news.date)"/>
                </div>
                <span class="title" v-text="news.name"/>
                <div class="description" v-html="news.content"/>
            </div>
        </div>
    </section>
</template>

<script>
import { useStore } from "~/store";
import formatDate from "~/utils/formatDate";

export default {
   name: "news-section",
   data() {
      return {}
   },
   computed: {
      newsList() {
         return useStore().getArticles
      },
      filteredListNews() {
         return this.newsList.filter(news => {
            return news.status
         })
      },
      categoryList() {
         return useStore().getCategories
      },
   },
   methods: {
      categoryName(index) {
         return this.categoryList.find(item => item.id === index)?.name
      },
      formatedDate(date) {
         return formatDate(date)
      }
   },
}
</script>

<style scoped>

</style>
