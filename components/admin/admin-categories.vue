<template>
  <div class="admin-view__inner">
    <h2 class="admin-title">Категории</h2>
    <el-table :data="filterTableData" style="width: 100%">
      <el-table-column prop="name" label="Имя"/>
      <el-table-column fixed="right" label="Действия" width="250">
        <template #header>
          <el-input v-model="search" size="small" placeholder="Поиск"/>
        </template>
        <template #default="scope">
          <el-button type="primary" plain @click="editItem(scope.row.id)">Изменить</el-button>
          <el-button type="danger" plain @click="removeItem(scope.row.id)">Удалить</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button class="admin-add" type="success" @click="addCategory">Добавить категорию</el-button>
  </div>
</template>

<script>
import {useStore} from "~/store";

export default {
  name: "admin-categories",
  components: {},
  data() {
    return {
      search: '',
    }
  },
  setup() {
    useHead({
      titleTemplate: '%s : Категории',
    })
  },
  computed: {
    filterTableData() {
      return this.categoriesList.filter((data) => {
          return !this.search || data.name.toLowerCase().includes(this.search.trim().toLowerCase())
        }
      )
    },
    categoriesList() {
      return useStore().getCategories
    },
  },
  methods: {
    editItem(index) {
      useStore().changeModalData(index, 'categories', 'change')
    },
    removeItem(index) {
      useStore().changeModalData(index, 'categories', 'remove', 'Удалить категорию?')
    },
    addCategory() {
      useStore().addItem('categories', 'add')
    },
  }
}
</script>

<style scoped>

</style>
