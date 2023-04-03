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
                    <v-button class="blue" :text="'Изменить'" @click="editItem(scope.row)"/>
                    <v-button class="red" :text="'Удалить'" @click="removeItem(scope.row)"/>
                </template>
            </el-table-column>
        </el-table>
        <v-button class="admin-add green" :text="'Добавить категорию'" @click="addCategory"/>
    </div>
</template>

<script>
import { useStore } from "~/store";
import vButton from "~/components/ui/v-button.vue";

export default {
   name: "admin-categories",
   components: {vButton},
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
      editItem(data) {
         useStore().changeModalData(data, 'categories', 'change')
      },
      removeItem(data) {
         useStore().changeModalData(data, 'categories', 'remove', 'Удалить категорию?')
      },
      addCategory() {
         useStore().changeModalData(null, 'categories', 'add', 'Добавить категорию?')
      },
   }
}
</script>
