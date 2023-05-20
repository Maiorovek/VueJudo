<template>
    <div class="admin-view__inner">
        <h2 class="admin-title">Друзья</h2>

        <div class="friends-list">
            <adminFriendsItem v-for="friend in friendsList" :friend="friend"/>
        </div>

        <v-button class="admin-add green" :text="'Добавить категорию'" @click="addFriend"/>
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
      return {}
   },
   computed: {
      friendsList() {
         return useStore().getFriendsList
      }
   },
   methods: {
      addFriend() {
          useStore().friends.push({
              id: null,
              number: '',
              time: {
                  from: '',
                  to: '',
              },
              name: '',
              address: '',
          })
      },
   },
}
</script>

<style scoped>

</style>
