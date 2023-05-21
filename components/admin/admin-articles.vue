<template>
    <div class="admin-view__inner">
        <h2 class="admin-title" v-text="'Статьи'"/>
        <el-table :data="filterTableData" style="width: 100%">
            <el-table-column prop="name" label="Название"/>
            <el-table-column prop="category" label="Категория">
                <template #default="scope">
                    <span v-text="categoryName(scope.row.category)"/>
                </template>
            </el-table-column>
            <el-table-column prop="date" label="Дата"/>
            <el-table-column prop="status" label="Опубликовано">
                <template #default="scope">
                    <span v-text="scope.row.status ? 'Да' : 'Нет'"/>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="Действия" width="250">
                <template #header>
                    <el-input v-model="search" size="small" placeholder="Поиск"/>
                </template>
                <template #default="scope">
                    <v-button class="blue" :text="'Изменить'" @click="changeArticle(scope.row)"/>
                    <v-button class="red" :text="'Удалить'" @click="removeItem(scope.row)"/>
                </template>
            </el-table-column>
        </el-table>
        <v-button class="admin-add green" :text="'Добавить статью'" @click="addArticle"/>
    </div>
</template>

<script>
import vButton from '~/components/ui/v-button.vue'
import { useStore } from "~/store";

export default {
   name: "admin-news",
   components: {
      vButton
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
      removeItem(data) {
          console.log(data)
         // useStore().changeModalData(data, 'articles', 'remove', 'Удалить статью?', 'articles-list')
      },
      changeArticle(data) {
         useStore().saveChangeArticle(data, 'change')
         this.$emit('currentComponent', 'actionsArticles')
      },
      addArticle() {
         useStore().saveChangeArticle(null, 'add')
         this.$emit('currentComponent', 'actionsArticles')
      },
      categoryName(index) {
         return this.categoryList.find(item => item.id === index)?.name
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
