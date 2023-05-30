<template>
    <div class="admin-view__inner">
        <div class="admin-title__wrapper">
            <h2 class="admin-title" v-text="pageName"/>
            <el-button @click="returnToBack">Назад</el-button>
        </div>
        <v-text-field
          сlass="admin-input input"
          label="Название сайта"
          v-model="articleName"
        />
        <v-checkbox v-model="articleStatus">
            <template v-slot:label>
                <div>
                    Опубликовано
                </div>
            </template>
        </v-checkbox>
        <div class="admin-flex">
            <span>Категория: </span>
            <el-select v-model="articleCategory" class="m-2" placeholder="Выберите категорию">
                <el-option
                  v-for="item in listCategory"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
            </el-select>
        </div>
        <v-file-input
          label="Превью"
          ref="image"
          prepend-icon=""
          @change="imageEdit"
        />
        <img :src="articlePreview" alt="Превью" class="admin-preview">
        <Editor :content="articleContent" @valueEditor="valueEditor"/>
        <div class="admin-buttons__wrapper">
            <el-button
              v-if="this.dataPage.action === 'add'"
              class="admin-add"
              type="success"
              @click="addItem()"
              v-text="'Добавить статью'"
            />
            <el-button
              v-else
              class="admin-add"
              type="success"
              @click="changeItem()"
              v-text="'Изменить статью'"
            />
            <el-button
              class="admin-add"
              type="danger"
              @click="cancel()"
              v-text="'Отменить'"
            />
        </div>
    </div>
</template>

<script>
import Editor from "~/components/editor/Editor.vue";
import { useStore } from "~/store";
import decoderImage from "~/utils/decoder-image";
import transliter from "~/utils/translit";

export default {
   name: "add-articles",
   components: {
      Editor
   },
   setup() {
      useHead({
         titleTemplate: '%s : Добавление статьи',
      })
   },
   data() {
      return {
         stateEditor: false,
         articleId: null,
         articleStatus: false,
         articleName: '',
         articleCategory: '',
         articleContent: '',
         articlePreview: '',
      }
   },
   computed: {
      dataPage() {
         return useStore().getDataArticle
      },
      listCategory() {
         return useStore().getCategories
      },
      pageName() {
         return this.dataPage.action === 'add' ? 'Добавление статьи' : 'Редактирование статьи'
      },
      createObject() {
         return {
            id: this.articleId,
            date: this.dataPage.data.date,
            name: this.articleName,
            page: transliter(this.articleName),
            category: this.articleCategory,
            content: this.articleContent,
            status: this.articleStatus,
            preview: this.articlePreview,
            indexDB: this.dataPage.data.indexDB
         }
      },
   },
   mounted() {
      console.log(this.dataPage.data.hasOwnProperty('id'))
      if (this.dataPage.data.hasOwnProperty('id')) {
         this.articleId = this.dataPage.data.id
         this.articleStatus = this.dataPage.data.status
         this.articleContent = this.dataPage.data.content
         this.articleName = this.dataPage.data.name
         this.articleCategory = this.listCategory.find(item => item.id === this.dataPage.data.category)?.id
         this.articlePreview = this.dataPage.data.preview
      }
   },
   methods: {
      async imageEdit() {
         this.articlePreview = await decoderImage(this.$refs.image)
      },
      returnToBack() {
         this.$emit('currentComponent', 'adminArticles')
      },
      cancel() {
         this.returnToBack()
         this.stateEditor = !this.stateEditor
      },
      changeItem() {
         const data = {...this.createObject}
         useStore().saveChange(data, this.articleId, 'articles', this.dataPage.data.indexDB, 'articles-list')
         this.returnToBack()
      },
      addItem() {
         let data = {...this.createObject}
         if (data.hasOwnProperty('indexDB')) {
            delete data.indexDB
         }
         useStore().addItem(data, 'articles', 'articles-list')
         this.returnToBack()
      },
      valueEditor(value) {
         this.articleContent = value
      },
   }
}
</script>
