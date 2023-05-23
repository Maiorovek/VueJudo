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

<script>
import { useStore } from "~/store";
import adminFriendsItem from "./admin-friends-item.vue"
import vButton from "~/components/ui/v-button.vue";

export default {
   name: "admin-friends",
   components: {
      vButton,
      adminFriendsItem
   },
   data() {
      return {
         search: '',
      }
   },
   computed: {
      friendsList() {
         return useStore().getFriendsList
      },
      filterTableData() {
         return this.friendsList.filter((data) => {
               return !this.search || data.name.toLowerCase().includes(this.search.trim().toLowerCase())
            }
         )
      }
   },
   methods: {
      editItem(index) {
         console.log(index)
      },
      removeItem(data) {
         useStore().changeModalData(data, 'friends', 'remove', 'Удалить друга?', 'companions-list')
      }
   },
}
</script>
