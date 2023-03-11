<template>
  <div class="modal-edit__wrapper" v-if="stateModal">
    <div class="modal-edit">
      <span
        class="modal-edit__close"
        @click="changeModalState"
      >
        <v-icon icon="mdi-close" />
      </span>
      <h1
        :style="{textAlign: this.dataEdited.action === 'remove' ? 'center' : 'left'}"
        class="modal-edit__title"
      >
        {{ dataEdited.title }}
      </h1>
      <input
        v-if="dataEdited.action !== 'remove'"
        class="input"
        type="text"
        placeholder="Название категории"
        v-model="name"
      >
      <div class="modal-edit__buttons">
        <button class="button" @click.prevent="cancelChanges">
          <span v-text="dataEdited.action === 'remove' ? 'Нет' : 'Отменить'" />
        </button>
        <button
          v-if="dataEdited.action === 'remove'"
          class="button button-red"
          @click.prevent="removeItem"
        >
          <span>Да</span>
        </button>
        <button
          v-else
          class="button button-blue"
          @click.prevent="saveChanges"
        >
          <span v-text="dataEdited.action === 'add' ? 'Добавить' : 'Сохранить'" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {useStore} from "@/store"

export default {
  data() {
    return {
      name: ''
    }
  },
  computed: {
    stateModal() {
      return useStore().getStateEditedModal
    },
    dataEdited() {
      this.name = useStore().getDataEditedModal.data.name
      return useStore().getDataEditedModal
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
      useStore().changeData(this.name, this.dataEdited.data.id, this.dataEdited.type, this.dataEdited.action)
      this.changeModalState()
    },
    removeItem() {
      useStore().removeItem(this.dataEdited.data.id, this.dataEdited.type)
    },
  },
}
</script>
