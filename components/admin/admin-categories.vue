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

<script setup>
import { useStore } from "~/store";
import VButton from "~/components/ui/v-button.vue";

useHead({
   titleTemplate: '%s : Категории',
})

const store = useStore()
const search = ref('')

const categoriesList = computed(() => store.getCategories)
const filterTableData = computed(() => {
   return categoriesList.value.filter((data) => {
         return !search.value || data.name.toLowerCase().includes(search.value.trim().toLowerCase())
      }
   )
})

const editItem = data => {
   store.changeModalData(data, 'categories', 'change', null, 'article-categories')
}
const removeItem = data => {
   store.changeModalData(data, 'categories', 'remove', 'Удалить категорию?', 'article-categories')
}
const addCategory = () => {
   store.changeModalData(null, 'categories', 'add', 'Добавить категорию?', 'article-categories')
}
</script>
