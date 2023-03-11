<template>
  <div class="admin-sidebar">
    <div class="admin-sidebar__user">
      Admin Adminov
    </div>
    <div class="admin-sidebar__title">
      Администратор
    </div>
    <adminSidebarTabs @currentComponent="currentComponent"/>
    <div class="admin-sidebar__title">
      Пользователь
    </div>
    <nuxt-link class="tab-item__top" to="/">
      <v-icon icon="mdi-sitemap-outline" />
      <span v-text="'Открыть сайт'"/>
    </nuxt-link>
    <div class="tab-item__top">
      <v-icon icon="mdi-logout" />
      <span v-text="'Выйти'"/>
    </div>
  </div>
</template>

<script>
import adminSidebarTabs from "~/components/admin/admin-sidebar-tabs.vue";
export default {
  name: "admin-sidebar",
  components: {
    adminSidebarTabs
  },
  data() {
    return {

    }
  },
  methods: {
    currentComponent(component) {
      this.$emit('currentComponent', shallowRef(component))
    }
  },
}
</script>
