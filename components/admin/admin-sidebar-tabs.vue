<template>
    <div class="admin-tabs">
        <div class="tab-item" v-for="item in listSidebar">
            <div
              v-if="!item.list"
              class="tab-item__top"
              :class="{'item-active': item.component === selectComponent}"
              @click="selectView(item.component)"
            >
                <v-icon :icon="item.icon"/>
                <span v-text="item.title"/>
            </div>
            <div
              v-else
              class="tab-item__top"
              @click="openMiniList"
            >
                <v-icon :icon="item.icon"/>
                <span v-text="item.title"/>
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
                    <v-icon :icon="itemMini.icon"/>
                    <span v-text="itemMini.title"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useStore } from "~/store";

export default {
   name: "admin-sidebar-tabs",
   data() {
      return {
         selectComponent: '',
         stateMiniList: false,
      }
   },
   methods: {
      selectView(component) {
         this.selectComponent = component
         this.$emit('currentComponent', shallowRef(component))
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
   mounted() {
      this.selectComponent = sessionStorage.getItem('currentComponentAdmin')
         ? sessionStorage.getItem('currentComponentAdmin')
         : 'adminMain'
      this.$emit('currentComponent', this.selectComponent)
   },
}
</script>
