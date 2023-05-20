<template>
    <div class="friend">
        <div class="name" ref="name">
            <span v-if="!isChange" v-text="friend.name"/>
            <input v-else placeholder="Название" v-model="name" name="name" type="text" class="input">
        </div>

        <div class="address" ref="address">
            <span v-if="!isChange" v-text="friend.address"/>
            <input v-else placeholder="Адресс" v-model="address" name="address" type="text" class="input">
        </div>

        <div class="number" ref="number">
            <span v-if="!isChange" v-text="friend.number"/>
            <input v-else placeholder="Номер телефона" v-model="number" name="number" type="text" v-maska
                   data-maska="8-(###)-###-##-##"
                   class="input">
        </div>

        <div class="time" ref="time">
            <span v-if="!isChange" class="time">
                {{ friend.time.from }} - {{ friend.time.to }}
            </span>
            <input v-else placeholder="Время работы" v-model="time" name="time" type="text" v-maska
                   data-maska="##:## - ##:##" class="input">
        </div>

        <VButton :text="isChange ? 'Отменить' : 'Изменить'" @click="replaceDivsWithInputs"/>
        <VButton :text="isChange ? 'Сохранить' : 'Удалить'" class="red" @click="deleteFriend"/>
    </div>
</template>

<script>
import VButton from "~/components/ui/v-button.vue";
import { useStore } from "~/store";

export default {
   name: "admin-friends-item",
   components: {
      VButton,
   },
   data() {
      return {
         isChange: false,
         number: null,
         name: '',
         address: '',
         time: '',
      }
   },
   props: {
      friend: {
         type: Object,
         default: {}
      }
   },
   mounted() {
      if (this.friend.id === null) this.isChange = true
      this.setDefault()
   },
   methods: {
      deleteFriend() {
         if (this.friend.id === null) {
            useStore().friends = useStore().friends.filter(item => item.id !== this.friend.id)
            return false
         }
         if (!this.isChange) {
            useStore().changeModalData(this.friend, 'friends', 'remove', 'Удалить друга?', 'companions-list')
         } else {
            const newData = this.createObject()
            useStore().saveChange(newData, this.friend.id, 'friends', this.friend.indexDB, 'companions-list')
         }
      },
      replaceDivsWithInputs() {

         if (!this.isChange) {
            const names = Object.keys(this.$refs)
            const sizes = names.map(item => {
               return {
                  name: item,
                  size: this.$refs[item].clientWidth
               }
            })
            this.isChange = true

            sizes.forEach(item => {
               this.$refs[item.name].style.width = `${item.size}px`
            })
         } else {
            this.isChange = false
            Object.values(this.$refs).forEach(item => {
               item.style.width = 'auto'
            })

            this.setDefault()
         }
      },
      createObject() {
         const {number, name, address} = this;
         const time = this.time.split('-')

         return {
            id: this.friend.id,
            indexDB: this.friend.indexDB,
            number,
            name,
            address,
            time: {
               from: time[0].trim(),
               to: time[1].trim()
            }
         }
      },
      setDefault() {
         const {number, name, address, time} = this.friend;
         this.number = number;
         this.name = name;
         this.address = address;
         this.time = `${time.from} - ${time.to}`;
      }
   },
}
</script>

<style scoped>

</style>
