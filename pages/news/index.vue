<template>
    <section class="news-page">
        <div class="wrapper">
            <h1 class="page-title">Новости</h1>
            <div class="page__filter">
                <label>
                    <input class="input" type="text" placeholder="Найти новость..." v-model="searchNews">
                    <v-icon v-if="showClearInput" icon="mdi-close" @click="clearSearchInput"/>
                </label>
            </div>
            <div v-if="stateDownloadArticles && !listNews.length">
                Идет загрузка
            </div>
            <div v-else-if="!stateDownloadArticles && listNews.length > 0" class="news-content">
                <div class="news__list" v-if="filteredListNews.length > 0">
                    <nuxt-link
                      v-for="news in filteredListNews"
                      :to="`/news/${news.id}`"
                      class="news-item"
                    >
                        <div class="news-preview">
                            <img :src="news.preview" alt="Preview">
                        </div>
                        <div class="news-info">
                            <div class="info__category" v-text="category(news.category)?.name"/>
                            <div class="info__name" v-text="news.name"/>
                            <div class="info__description" v-html="news.content"></div>
                            <div class="info__date" v-text="news.date"/>
                        </div>
                    </nuxt-link>
                </div>
                <div
                  v-else
                  class="news__nothing"
                >
                    По Вашему запросу ничего не найдено
                </div>
            </div>
            <div v-else-if="!stateDownloadArticles && !listNews.length">
                К сожалению пока нет новостей
            </div>
        </div>
    </section>
</template>

<script>
import { useStore } from "~/store";
import VSelect from "~/components/ui/v-select.vue";
import debounce from "~/utils/debounce";

export default {
   name: 'news',
   components: {VSelect},
   data() {
      return {
         searchNews: '',
         showClearInput: false,
         selectsCategories: [],
      }
   },
   setup() {
      definePageMeta({
         layout: "default",
      });
      useHead({
         title: `Новости`,
      })
   },
   computed: {
      stateDownloadArticles() {
         return useStore().getStateDownloadArticles
      },
      listNews() {
         return useStore().getArticles
      },
      listCategories() {
         return useStore().getCategories
      },
      filteredListNews() {
         return this.listNews.filter(news => {
            return news.name.toLowerCase().includes(this.searchNews.toLowerCase()) && news.status
         })
      },
   },
   methods: {
      category(index) {
         return this.listCategories.find(item => item.id === index)
      },
      clearSearchInput() {
         this.searchNews = ''
      },
   },
   watch: {
      searchNews() {
         this.showClearInput = this.searchNews.trim().length
      },
   },
}
</script>
