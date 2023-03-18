<template>
  <section class="news-page">
    <div class="wrapper">
      <h1 class="page-title">Новости</h1>
      <div class="page__filter">
        <label>
          <input class="input" type="text" placeholder="Найти новость..." v-model="searchNews">
          <v-icon v-if="showClearInput" icon="mdi-close" @click="clearSearchInput" />
        </label>
      </div>
      <div class="news__list">
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
    </div>
  </section>
</template>

<script>
import {useStore} from "~/store";
import VSelect from "~/components/v-select.vue";

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
    listNews() {
      return useStore().getArticles
    },
    listCategories() {
      return useStore().getCategories
    },
    filteredListNews() {
      return this.listNews.filter(news => {
        return news.name.toLowerCase().includes(this.searchNews.toLowerCase())
      })
    }
  },
  methods: {
    category(index) {
      return this.listCategories.find(item => item.id === index)
    },
    clearSearchInput() {
      this.searchNews = ''
    },
    selectedCategory(value) {
      console.log(value)
    },
  },
  watch: {
    searchNews() {
      this.showClearInput = this.searchNews.trim().length
    },
  },
}
</script>
