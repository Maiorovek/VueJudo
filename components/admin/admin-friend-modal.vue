<template>
    <div class="modal-edit__wrapper modal-friend" v-if="stateModal">
        <div class="modal-edit">
             <span
               class="modal-edit__close"
               @click="changeModalState"
             >
                <v-icon icon="mdi-close"/>
            </span>
            <h1
              class="modal-edit__title"
              v-text="'Добавить друга'"
            />
            <input
              class="input"
              type="text"
              placeholder="Название"
              v-model="name"
            >
            <input
              class="input"
              type="text"
              placeholder="Адрес"
              v-model="address"
            >
            <input
              class="input"
              type="text"
              placeholder="Номер телефона"
              v-maska
              data-maska="8-(###)-###-##-##"
              v-model="number"
            >
            <input
              class="input"
              type="text"
              placeholder="Время работы"
              v-maska
              data-maska="##:## - ##:##"
              v-model="time"
            >
            <input
              class="input"
              type="text"
              placeholder="Сайт"
              v-model="link"
            >
            <div class="modal-edit__buttons">
                <vButton
                  @click.prevent="cancelAction"
                  :text="'Отменить'"
                  class="large"
                />
                <vButton
                  class="red large"
                  @click.prevent="saveChanges"
                  :text="buttonText"
                />
            </div>
        </div>
    </div>
</template>

<script>
import { useStore } from "~/store";
import vButton from "~/components/ui/v-button.vue";

export default defineComponent({
   name: "admin-friend-modal",
   components: {
      vButton
   },
   data() {
      return {
         name: '',
         address: '',
         number: '',
         time: '',
         link: '',
      }
   },
   computed: {
      stateModal() {
         return useStore().getStateAdminModalFriend
      },
      dataFriend() {
         return useStore().getModalFriendData
      },
      buttonText() {
         console.log(this.dataFriend)
         return this.dataFriend.action === 'edit' ? 'Изменить' : 'Добавить'
      },
   },
   methods: {
      changeModalState() {
         this.clearModal()
      },
      cancelAction() {
         this.clearModal()
      },
      clearModal() {
         this.name = ''
         this.address = ''
         this.number = ''
         this.link = ''
         this.time = ''
         useStore().changeModalFriend({}, '')
      },
      saveChanges() {
         if (this.dataFriend.action === 'edit') {
            useStore().saveChange(this.createObject(), this.dataFriend.data.id, 'friends', this.dataFriend.data.indexDB, 'companions-list')
         } else {
            useStore().addItem(this.createObject(), 'friends', 'companions-list')
         }
         this.clearModal()
      },
      createObject() {
         const timeArray = this.time.split(' ')
         return {
            ...this.dataFriend.data,
            name: this.name,
            address: this.address,
            number: this.address,
            link: this.link,
            time: {
               from: timeArray[0],
               to: timeArray[2],
            },
         }
      }
   },
   watch: {
      dataFriend() {
         if (this.dataFriend.data.hasOwnProperty('id')) {
            this.name = this.dataFriend.data.name
            this.address = this.dataFriend.data.address
            this.number = this.dataFriend.data.number
            this.link = this.dataFriend.data.link
            this.time = `${this.dataFriend.data.time.from} - ${this.dataFriend.data.time.to}`
         }
      }
   }
})
</script>
