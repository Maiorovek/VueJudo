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
      <el-select v-model="articleCategory" class="m-2" placeholder="Select">
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
    <Editor2 :content="articleContent" @valueEditor="valueEditor"/>
    <div class="admin-buttons__wrapper">
      <el-button
        class="admin-add"
        type="success"
        @click="addItem"
        v-text="buttonName"
      />
      <el-button
        class="admin-add"
        type="danger"
        @click="cancel"
        v-text="'Отменить'"
      />
    </div>
  </div>
</template>

<script>
import Editor2 from "~/components/editor/Editor2.vue";
import {useStore} from "~/store";
import decoderImage from "~/utils/decoder-image";
import transliter from "~/utils/translit";

export default {
  name: "add-articles",
  components: {Editor2},
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
    buttonName() {
      return this.dataPage.action === 'add' ? 'Добавить статью' : 'Изменить статью'
    }
  },
  mounted() {
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
    addItem() {
      const data = {
        id: this.articleId,
        name: this.articleName,
        page: transliter(this.articleName),
        category: this.articleCategory,
        content: this.articleContent,
        status: this.articleStatus,
        preview: this.articlePreview
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
