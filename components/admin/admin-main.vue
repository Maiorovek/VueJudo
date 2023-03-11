<template>
  <div class="admin-view__inner">
    <h2 class="admin-title">Главная</h2>
    <div class="admin-item" v-for="item in siteSetting">
      <adminEdit
        :editItem="item"
        @changedItem="changedItem"
      />
    </div>
  </div>
</template>

<script>
import {useStore} from "~/store";
import adminEdit from "~/components/admin/admin-edit.vue";
export default {
  name: "admin-main",
  components: {
    adminEdit,
  },
  setup() {
    useHead({
      titleTemplate: '%s : Главная',
    })
  },
  data() {
    return {

    }
  },
  methods: {
    changedItem(value) {

    }
  },
  computed: {
    siteSetting() {
      return Object.entries(useStore().getSiteSetting)
    },
  },
}
</script>

<style scoped>

</style>
