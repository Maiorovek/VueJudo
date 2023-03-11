<template>
  <div class="admin-view__inner">
    {{dataPage}}
    <div class="admin-title__wrapper">
      <h2 class="admin-title" v-text="dataPage.action === 'add' ? 'Добавление статьи' : 'Редактирование статьи'"/>
      <el-button @click="returnToBack">Назад</el-button>
    </div>
    <div>
      <v-text-field
        сlass="admin-input input"
        label="Название сайта"
        v-model="articleName"
      />
      <v-checkbox
        v-model="articleStatus"
        label="Опубликовано"
      />
      <el-select v-model="articleCategory" class="m-2" placeholder="Select">
        <el-option
          v-for="item in listCategory"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
    </div>
    <Editor2 :content="articleContent" @valueEditor="valueEditor"/>
    <div class="admin-buttons__wrapper">
      <el-button class="admin-add" type="success" @click="addItem"
                 v-text="dataPage.action === 'add' ? 'Добавить статью' : 'Изменить статью'"/>
      <el-button class="admin-add" type="danger" @click="cancel">Отменить</el-button>
    </div>
  </div>
</template>

<script>
import Editor2 from "~/components/editor/Editor2.vue";
import {useStore} from "~/store";

export default {
  name: "add-articles",
  components: {
    Editor2,
  },
  computed: {
    editorContent() {
      return this.dataPage.data.content ? this.dataPage.data.content : ``
    },
    dataPage() {
      return useStore().getDataArticle
    },
    listCategory() {
      return useStore().getCategories
    },
  },
  data() {
    return {
      stateEditor: false,
      articleId: null,
      articleStatus: false,
      articleName: '',
      articleCategory: null,
      articleContent: '',
    }
  },
  setup() {
    useHead({
      titleTemplate: '%s : Добавление статьи',
    })
  },
  mounted() {
    if (this.dataPage.data.hasOwnProperty('id')) {
      this.articleId = this.dataPage.data.id
      this.articleStatus = this.dataPage.data.status
      this.articleContent = this.dataPage.data.content
      this.articleName = this.dataPage.data.name
      this.articleCategory = useStore().categories.find(item => item.id === this.dataPage.data.category).name
    }
  },
  methods: {
    returnToBack() {
      this.$emit('currentComponent', 'adminArticles')
    },
    cancel() {
      this.returnToBack()
      this.stateEditor = !this.stateEditor
    },
    addItem() {
      const data = {
        id: this.articleId,
        name: this.articleName,
        category: this.articleCategory,
        content: this.articleContent,
        status: this.articleStatus,
      }
      useStore().actionArticle(this.dataPage.action, data)
      this.$emit('currentComponent', 'adminArticles')
    },
    valueEditor(value) {
      this.articleContent = value
    },
  }
}
</script>

<style scoped>

</style>
