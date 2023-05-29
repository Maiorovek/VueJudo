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
            >
            <input
              class="input"
              type="text"
              placeholder="Адрес"
            >
            <input
              class="input"
              type="text"
              placeholder="Номер телефона"
              v-maska
              data-maska="8-(###)-###-##-##"
            >
            <input
              class="input"
              type="text"
              placeholder="Время работы"
              v-maska
              data-maska="##:## - ##:##"
            >
            <input
              class="input"
              type="text"
              placeholder="Сайт"
            >
            <div class="modal-edit__buttons">
<!--                <vButton-->
<!--                  @click.prevent="cancelAction"-->
<!--                  :text="cancelButtonName"-->
<!--                  class="large"-->
<!--                />-->
<!--                <vButton-->
<!--                  v-if="dataEdited.action === 'remove'"-->
<!--                  class="red large"-->
<!--                  @click.prevent="removeItem"-->
<!--                  :text="'Да'"-->
<!--                />-->
<!--                <vButton-->
<!--                  v-if="dataEdited.action === 'change'"-->
<!--                  class="blue large"-->
<!--                  @click.prevent="saveChanges"-->
<!--                  :text="'Сохранить'"-->
<!--                />-->
<!--                <vButton-->
<!--                  v-if="dataEdited.action === 'add'"-->
<!--                  class="blue large"-->
<!--                  @click.prevent="addItem"-->
<!--                  :text="'Добавить'"-->
<!--                />-->
            </div>
        </div>
    </div>
</template>

<script>
import { useStore } from "~/store";
import vButton from "~/components/ui/v-button.vue";

export default defineComponent({
   name: "admin-friend-modal",
   components: {vButton},
   data() {
      return {

      }
   },
   computed: {
      stateModal() {
         return useStore().getStateAdminModalFriend
      },
   },
   methods: {
      changeModalState() {
         useStore().changeModalFriendState()
      },
      cancelAction() {
         this.changeModalState()
      },
      removeItem() {

      },
      saveChanges() {

      },
      addItem() {

      },
   },
})
</script>
