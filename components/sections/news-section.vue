<template>
    <section class="news-section">
        <nuxt-link
          v-for="news in filteredListNews.slice(0, 5)"
          :to="`/news/${news.id}`"
          class="news"
        >
            <div class="image">
                <img :src="news.preview" alt="">
            </div>
            <div class="news-content">
               <div class="category" v-text="categoryName(news.category)"/>
               <div class="title" v-text="news.name"/>
               <div class="description" v-html="news.content"/>
               <div class="data" v-text="formatedDate(news.date)"/>
            </div>
        </nuxt-link>
    </section>
</template>

<script setup>
import { useStore } from "~/store";
import formatDate from "~/utils/formatDate";

const store = useStore()

const newsList = computed(() => store.getArticles)
const categoryList = computed(() => store.getCategories)
const filteredListNews = computed(() => {
   return newsList.value.filter(news => {
      return news.status
   })
})

const categoryName = index => categoryList.value.find(item => item.id === index)?.name
const formatedDate = date => formatDate(date)
</script>
