<template>
    <div class="friend" ref="check">
        <div class="name" ref="name">
            <span v-if="!isChange" v-text="friend.name"/>
            <input v-else placeholder="Название" required-input v-model="name" name="name" type="text"
                   class="input">
        </div>

        <div class="address" ref="address">
            <span v-if="!isChange" v-text="friend.address"/>
            <input v-else placeholder="Адрес" required-input v-model="address" name="address" type="text"
                   class="input">
        </div>

        <div class="number" ref="number">
            <span v-if="!isChange" v-text="friend.number"/>
            <input v-else placeholder="Номер телефона" required-input v-model="number" name="number" type="text" v-maska
                   data-maska="8-(###)-###-##-##"
                   class="input">
        </div>

        <div class="time" ref="time">
            <span v-if="!isChange" class="time">
                {{ friend.time.from }} - {{ friend.time.to }}
            </span>
            <input v-else placeholder="Время работы" required-input v-model="time" name="time" type="text" v-maska
                   data-maska="##:## - ##:##" class="input">
        </div>

        <div class="link" ref="link">
            <span v-if="!isChange" v-text="friend.link"/>
            <input v-else placeholder="Сайт" required-input v-model="link" name="link" type="text"
                   class="input">
        </div>

        <VButton :text="isChange ? 'Отменить' : 'Изменить'" @click="replaceDivsWithInputs"/>
        <VButton :text="isChange ? this.friend.id === null ? 'Добавить' : 'Сохранить' : 'Удалить'" class="red"
                 @click="deleteFriend"/>
    </div>
</template>

<script>
import VButton from "~/components/ui/v-button.vue";
import { useStore } from "~/store";
import checkInput from "~/utils/checkInput";

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
         link: '',
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
         if (!checkInput(this.$refs.check)) return false

         if (this.friend.id === null) {
            const newData = this.createObject()
            useStore().removeItem(this.friend, 'friends', '')
            useStore().addItem(newData, 'friends', 'companions-list')
            this.replaceDivsWithInputs()
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
         if (this.friend.id === null) {
            useStore().removeItem(this.friend, 'friends', '')
         }

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
         const {number, name, address, link} = this;
         const time = this.time.split('-')

         const newObject = {
            id: this.friend.id,
            indexDB: this.friend.indexDB,
            number,
            name,
            address,
            link,
            time: {
               from: time[0].trim(),
               to: time[1].trim()
            }
         }

         if (newObject.id === null) {
            delete newObject.id;
            delete newObject.indexDB;
         }

         return newObject
      },
      setDefault() {
         const {number, name, address, time, link} = this.friend;
         this.number = number;
         this.name = name;
         this.address = address;
         this.link = link;
         this.time = `${time.from} - ${time.to}`;
      },
   },
}
</script>

<style scoped>

</style>
