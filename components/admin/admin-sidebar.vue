<template>
    <div class="admin-sidebar" :class="{'active-sidebar': sidebarIsOpen}">
        <div class="admin-sidebar__button" @click="hideSidebar">
            <img src="../../assets/icons/double-arrow.svg" alt=""/>
        </div>
        <div class="admin-sidebar__title">
            Администратор
        </div>
        <adminSidebarTabs @currentComponent="currentComponent"/>
        <div class="admin-sidebar__title">
            Пользователь
        </div>
        <nuxt-link class="tab-item__top" to="/">
            <v-icon icon="mdi-sitemap-outline"/>
            <span v-text="'Открыть сайт'"/>
        </nuxt-link>
        <div class="tab-item__top" @click="logoutUser">
            <v-icon icon="mdi-logout"/>
            <span v-text="'Выйти'"/>
        </div>
    </div>
</template>

<script>
import adminSidebarTabs from "~/components/admin/admin-sidebar-tabs.vue";
import logout from "~/server/logout";
import { useStore } from "~/store";

export default {
   name: "admin-sidebar",
   components: {
      adminSidebarTabs
   },
   data() {
      return {
          sidebarIsOpen: true,
      }
   },
   methods: {
      async logoutUser() {
         logout()
      },
      currentComponent(component) {
         this.$emit('currentComponent', shallowRef(component))
      },
      hideSidebar() {
          useStore().changeAdminSidebarState()
          this.sidebarIsOpen = !this.sidebarIsOpen
      }
   },
}
</script>
