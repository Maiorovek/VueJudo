<template>
  <div class="admin-view__inner">
    <h2 class="admin-title">Статьи</h2>
    <el-table :data="filterTableData" style="width: 100%">
      <el-table-column prop="name" label="Название"/>
      <el-table-column prop="category" label="Категория">
        <template #default="scope">
          <span v-text="categoryName(scope.row.category)" />
        </template>
      </el-table-column>
      <el-table-column prop="date" label="Дата"/>
      <el-table-column prop="status" label="Активность">
        <template #default="scope">
          <input type="checkbox" v-model="scope.row.status">
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="Действия" width="250">
        <template #header>
          <el-input v-model="search" size="small" placeholder="Поиск"/>
        </template>
        <template #default="scope">
          <el-button type="primary" plain @click="changeArticle(scope.row.id)">Изменить</el-button>
          <el-button type="danger" plain @click="removeItem(scope.row.id)">Удалить</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button class="admin-add" type="success" @click="addArticle">Добавить статью</el-button>
  </div>
</template>

<script>
import Editor from '~/components/editor/Editor.vue'
import {useStore} from "~/store";

export default {
  name: "admin-news",
  components: {
    Editor
  },
  data() {
    return {
      search: '',
    }
  },
  setup() {
    useHead({
      titleTemplate: '%s : Статьи',
    })
  },
  methods: {
    removeItem(index) {
      useStore().changeModalData(index, 'articles', 'remove', 'Удалить статью?')
    },
    changeArticle(index) {
      useStore().changeDataArticle(index, 'change')
      this.$emit('currentComponent', 'actionsArticles')
    },
    addArticle() {
      useStore().changeDataArticle(null, 'add')
      this.$emit('currentComponent', 'actionsArticles')
    },
    categoryName(index) {
      return this.categoryList.find(item => item.id === index).name
    },
  },
  computed: {
    filterTableData() {
      return this.articlesList.filter((data) => {
          return !this.search || data.name.toLowerCase().includes(this.search.trim().toLowerCase())
        }
      )
    },
    articlesList() {
      return useStore().getArticles
    },
    categoryList() {
      return useStore().getCategories
    },
  },
}
</script>
