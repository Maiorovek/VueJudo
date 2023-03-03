<template>
  <div class="admin__inner">
    <div class="admin-sidebar">
      <div class="admin-sidebar__user">
        Evgeny Smirnov
      </div>
      <div class="admin-sidebar__title">
        Администратор
      </div>
      <div class="admin-tabs">
        <div class="tab-item" v-for="item in listSidebar">
          <div
            v-if="!item.list"
            class="tab-item__top"
            :class="{'item-active': item.component === selectComponent}"
            @click="selectView(item.component)"
          >
            <v-icon :icon="item.icon" />
            <span v-text="item.title"/>
          </div>
          <div
            v-else
            class="tab-item__top"
            @click="openMiniList"
          >
            <v-icon :icon="item.icon" />
            <span v-text="item.title" />
            <v-icon
              class="arrow"
              :class="{'arrow-item': stateMiniList}"
              icon="mdi-menu-left"
            />
          </div>
          <div
            v-if="item.list && stateMiniList"
            class="tab-item__sublist"
          >
            <div
              class="sublist-item"
              :class="{'item-active': itemMini.component === selectComponent}"
              v-for="itemMini in item.list"
              @click="selectView(itemMini.component)"
            >
              <v-icon :icon="itemMini.icon" />
              <span v-text="itemMini.title" />
            </div>
          </div>
        </div>
      </div>
      <div class="admin-sidebar__title">
        Пользователь
      </div>
      <div class="tab-item__top">
        <v-icon icon="mdi-logout" />
        <span v-text="'Выйти'"/>
      </div>
    </div>
    <div class="admin-view">
      <keep-alive>
        <Component :is="selectComponent"/>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import {useStore} from "~/store";
import adminMain from "~/components/admin/admin-main.vue";
import adminArticles from "~/components/admin/admin-articles.vue";
import adminCategories from "~/components/admin/admin-categories.vue";
import adminPages from "~/components/admin/admin-pages.vue";

export default {
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
    adminPages
  },
  data() {
    return {
      selectComponent: shallowRef(adminMain),
      stateMiniList: false,
    }
  },
  methods: {
    selectView(component) {
      this.selectComponent = shallowRef(component)
    },
    openMiniList() {
      this.stateMiniList = !this.stateMiniList
    },
  },
  computed: {
    listSidebar() {
      return useStore().getListAdminSidebar
    },
  },
}
</script>
