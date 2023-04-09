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
                  @click.prevent="cancelAction"
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
                  v-if="dataEdited.action === 'change'"
                  class="blue large"
                  @click.prevent="saveChanges"
                  :text="'Сохранить'"
                />
                <vButton
                  v-if="dataEdited.action === 'add'"
                  class="blue large"
                  @click.prevent="addItem"
                  :text="'Добавить'"
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
      cancelAction() {
         this.changeModalState()
         this.name = ''
      },
      saveChanges() {
         const newData = {
            ...this.dataEdited.data,
            id: this.dataEdited.data.id,
            name: this.name
         }
         useStore().saveChange(newData, this.dataEdited.data.id, this.dataEdited.type, this.dataEdited.data.indexDB, this.dataEdited.path)
         this.changeModalState()
      },
      removeItem() {
         useStore().removeItem(this.dataEdited.data, this.dataEdited.type, this.dataEdited.path)
         this.changeModalState()

         if (this.dataEdited.type === 'events') {
            this.dataEdited.event.remove()
         }
      },
      addItem() {
         const newData = this.dataEdited.type === 'categories'
            ? this.name
            : {
               ...this.dataEdited.data,
               title: this.name,
            }

         useStore().addItem(newData, this.dataEdited.type, this.dataEdited.path)
         this.changeModalState()
      },
   },
}
</script>
