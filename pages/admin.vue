<template>
    <div class="admin__inner">
        <adminSidebar @currentComponent="currentComponent"/>
        <div class="admin-view" :class="{'morePad': !stateAdminSidebar}">
            <Component :is="selectComponent" @currentComponent="currentComponent"/>
        </div>
    </div>
</template>

<script>
import { auth } from '~/server/setting'
import { useStore } from "~/store";
import adminMain from "~/components/admin/admin-main.vue";
import adminArticles from "~/components/admin/admin-articles.vue";
import adminCategories from "~/components/admin/admin-categories.vue";
import actionsArticles from "~/components/admin/actions-articles.vue";
import adminSidebar from "~/components/admin/admin-sidebar.vue";
import adminEvents from "~/components/admin/admin-events.vue";
import adminFriends from "~/components/admin/admin-friends.vue";

export default {
   setup() {
      const siteInfo = computed(() => useStore().getSiteSetting)
      definePageMeta({
         layout: "admin",
         middleware: 'check-auth',
         auth: {auth}
      });
      useHead({
         title: `${siteInfo.value.name.param} : Админ`,
      })
   },
   components: {
      adminMain,
      adminArticles,
      adminCategories,
      actionsArticles,
      adminSidebar,
      adminEvents,
      adminFriends
   },
   data() {
      return {
         selectComponent: shallowRef(adminMain),
      }
   },
   methods: {
      currentComponent(component) {
         sessionStorage.setItem('currentComponentAdmin', component.value);
         this.selectComponent = shallowRef(component)
      },
   },
   mounted() {
      this.selectComponent = sessionStorage.getItem('currentComponentAdmin')
         ? sessionStorage.getItem('currentComponentAdmin')
         : 'adminMain'
   },
   computed: {
      stateAdminSidebar() {
         return useStore().getStateAdminSidebar
      }
   }
}
</script>
