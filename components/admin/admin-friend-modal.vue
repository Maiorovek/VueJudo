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

<script setup>
import { useStore } from "~/store";
import { state } from "~/store/state";
import VButton from "~/components/ui/v-button.vue";

const store = useStore()
const modalState = state()
const name = ref('')
const address = ref('')
const number = ref('')
const time = ref('')
const link = ref('')

const changeModalState = () => clearModal()
const cancelAction = () => clearModal()

const clearModal = () => {
   name.value = ''
   address.value = ''
   number.value = ''
   link.value = ''
   time.value = ''
   modalState.changeModalFriend({}, '')
}

const saveChanges = () => {
   if (dataFriend.value.action === 'edit') {
      store.saveChange(createObject(), dataFriend.value.data.id, 'friends', dataFriend.value.data.indexDB, 'companions-list')
   } else {
      store.addItem(this.createObject(), 'friends', 'companions-list')
   }
   clearModal()
}

const createObject = () => {
   const timeArray = time.value.split(' ')
   return {
      ...dataFriend.value.data,
      name: name.value,
      address: address.value,
      number: number.value,
      link: link.value,
      time: {
         from: timeArray[0],
         to: timeArray[2],
      },
   }
}

const buttonText = computed(() => dataFriend.value.action === 'edit' ? 'Изменить' : 'Добавить')
const stateModal = computed(() => modalState.getStateAdminModalFriend)
const dataFriend = computed(() => modalState.getModalFriendData)

watch(() => dataFriend.value.data, () => {
   if (dataFriend.value.data.hasOwnProperty('id')) {
      name.value = dataFriend.value.data.name
      address.value = dataFriend.value.data.address
      number.value = dataFriend.value.data.number
      link.value = dataFriend.value.data.link
      time.value = `${dataFriend.value.data.time.from} - ${dataFriend.value.data.time.to}`
   }
});
</script>
