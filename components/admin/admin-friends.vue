<template>
    <div class="admin-view__inner">
        <h2 class="admin-title">Друзья</h2>
        <el-table :data="filterTableData" style="width: 100%">
            <el-table-column prop="name" label="Имя"/>
            <el-table-column prop="address" label="Адрес"/>
            <el-table-column prop="number" label="Телефон"/>
            <el-table-column prop="link" label="Сайт"/>
            <el-table-column label="Время работы">
                <template #default="scope">
                    <span>{{ scope.row.time.from }} - {{ scope.row.time.to }}</span>
                </template>
            </el-table-column>
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
        <v-button class="admin-add green" :text="'Добавить друга'" @click="addFriend"/>
    </div>
</template>

<script setup>
import VButton from "~/components/ui/v-button.vue";
import { useStore } from "~/store";
import { state } from "~/store/state";

useHead({
   titleTemplate: '%s : Друзья',
})

const store = useStore()
const modalState = state()
const search = ref('')

const friendsList = computed(() => store.getFriendsList)
const filterTableData = computed(() => {
   return friendsList.value.filter(data => {
         return !search.value || data.name.toLowerCase().includes(search.value.trim().toLowerCase())
      }
   )
})

const editItem = data => modalState.changeModalFriend(data, 'edit')
const removeItem = data => store.changeModalData(data, 'friends', 'remove', 'Удалить друга?', 'companions-list')
const addFriend = () => modalState.changeModalFriend({}, 'add')

</script>
