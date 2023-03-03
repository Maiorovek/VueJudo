<template>
  <div class="admin-item-edit">
    <h3 class="admin-item-title" v-text="editItem[1].name" />
    <div class="admin-item-edit">
      <input
        class="edit-input"
        type="text"
        v-model="defaultParam"
      />
      <button class="edit-button edit-button--save" @click.prevent="saveChange">
        Сохранить
      </button>
      <button
        v-show="showButtonCancel"
        class="edit-button edit-button--cancel"
        @click.prevent="cancelChange"
      >
        Отменить
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "admin-edit",
  data() {
    return {
      defaultParam: this.editItem[1].param,
      showButtonCancel: false,
    }
  },
  props: {
    editItem: {}
  },
  methods: {
    saveChange() {
      
    },
    cancelChange() {
      this.defaultParam = this.editItem
    },
  },
  watch() {
    this.showButtonCancel = this.editItem === this.defaultParam;
  },
}
</script>

<style scoped>

</style>
