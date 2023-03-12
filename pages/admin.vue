<template>
  <div class="admin__inner">
    <adminSidebar @currentComponent="currentComponent"/>
    <div class="admin-view">
      <Component :is="selectComponent" @currentComponent="currentComponent"/>
    </div>
  </div>
</template>

<script>
import {useStore} from "~/store";
import adminMain from "~/components/admin/admin-main.vue";
import adminArticles from "~/components/admin/admin-articles.vue";
import adminCategories from "~/components/admin/admin-categories.vue";
import actionsArticles from "~/components/admin/actions-articles.vue";
import adminSidebar from "~/components/admin/admin-sidebar.vue";

export default {
  middleware: ['auth-admin'],
  setup() {
    const siteInfo = computed(() => useStore().getSiteSetting)
    definePageMeta({
      layout: "admin",
    });
    useHead({
      title: `${siteInfo.value.name.param} : Админ`,
      meta: [{
        name: 'Админ-панель',
      }]
    })
  },
  components: {
    adminMain,
    adminArticles,
    adminCategories,
    actionsArticles,
    adminSidebar,
  },
  data() {
    return {
      selectComponent: shallowRef(adminMain),
    }
  },
  methods: {
    currentComponent(component) {
      this.selectComponent = shallowRef(component)
    },
  },
}
</script>
