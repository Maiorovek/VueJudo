<template>
    <div class="modal-edit__wrapper" v-if="stateModal">
        <div class="modal-edit">
      <span
        class="modal-edit__close"
        @click="changeModalState"
      >
        <v-icon icon="mdi-close"/>
      </span>
            <h1
              :style="styleTitle"
              class="modal-edit__title"
              v-text="dataEdited.title"
            />
            <input
              v-if="dataEdited.action !== 'remove'"
              class="input"
              type="text"
              placeholder="Название категории"
              v-model="name"
            >
            <div class="modal-edit__buttons">
                <vButton
                  @click.prevent="cancelChanges"
                  :text="cancelButtonName"
                  class="large"
                />
                <vButton
                  v-if="dataEdited.action === 'remove'"
                  class="red large"
                  @click.prevent="removeItem"
                  :text="'Да'"
                />
                <vButton
                  v-else
                  class="blue large"
                  @click.prevent="saveChanges"
                  :text="addButtonName"
                />
            </div>
        </div>
    </div>
</template>

<script>
import { useStore } from "@/store"
import vButton from '~/components/ui/v-button.vue'

export default {
   data() {
      return {
         name: ''
      }
   },
   components: {
      vButton
   },
   computed: {
      stateModal() {
         return useStore().getStateEditedModal
      },
      dataEdited() {
         this.name = useStore().getDataEditedModal.data.name
         return useStore().getDataEditedModal
      },
      addButtonName() {
         return this.dataEdited.action === 'add' ? 'Добавить' : 'Сохранить'
      },
      cancelButtonName() {
         return this.dataEdited.action === 'remove' ? 'Нет' : 'Отменить'
      },
      styleTitle() {
         return {textAlign: this.dataEdited.action === 'remove' ? 'center' : 'left'}
      }
   },
   methods: {
      changeModalState() {
         useStore().changeModalState()
      },
      cancelChanges() {
         this.changeModalState()
         this.name = ''
      },
      saveChanges() {
         useStore().changeData(this.name, this.dataEdited.data.id, this.dataEdited.type, this.dataEdited.action, this.dataEdited.data.indexDB)
         this.changeModalState()
      },
      removeItem() {
         useStore().removeItem(this.dataEdited.data, this.dataEdited.type)
         this.changeModalState()
      },
   },
}
</script>
