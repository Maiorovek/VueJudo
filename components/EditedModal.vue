<template>
  <div class="modal-edit__wrapper" v-if="stateModal">
    <div class="modal-edit">
      <div
        class="modal-edit__close"
        @click="changeModalState"
      >
        <v-icon icon="mdi-close" />
      </div>

      <h2 class="modal-edit__title">
        Изменение {{dataEdited}}
      </h2>
    </div>
  </div>
</template>

<script setup>
import {useStore} from "@/store"

const stateModal = computed(() => useStore().getStateEditedModal)
const dataEdited = computed(() => useStore().getDataEditedModal)
const changeModalState = () => useStore().closeEditModal()
</script>
