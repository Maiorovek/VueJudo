<template>
    <div class="admin__inner">
        <adminSidebar @currentComponent="currentComponent"/>
        <div class="admin-view" :class="{'morePad': !this.stateAdminSidebar}">
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
      const store = useStore()
      const siteInfo = computed(() => store.getSiteSetting)

      definePageMeta({
         layout: "admin",
         middleware: 'check-auth',
         auth: {auth}
      });
      useHead({
         title: `Админ`,
      })

      const reactiveStore = reactive(store.setting);

      watch(() => reactiveStore, () => {
            useHead({
               title: `${siteInfo.value.name.param} : Админ`,
            })
         },
         {deep: true}
      );
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
   computed: {
      stateAdminSidebar() {
         return useStore().getStateAdminSidebar
      }
   },
   methods: {
      currentComponent(component) {
         localStorage.setItem('currentComponentAdmin', component.value);
         this.selectComponent = shallowRef(component)
      },
   },
   mounted() {
      this.selectComponent = localStorage.getItem('currentComponentAdmin')
         ? localStorage.getItem('currentComponentAdmin')
         : 'adminMain'
   },
   watch: {}
}
</script>
