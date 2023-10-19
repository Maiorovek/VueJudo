import { defineStore } from "pinia";

export const state = defineStore('state', {
   state: () => ({
      listAdminSidebar: [
         {
            id: 0,
            title: 'Сайт',
            component: 'adminMain',
            list: null,
            icon: 'mdi-home',
         },
         {
            id: 1,
            title: 'Новости',
            component: null,
            icon: 'mdi-newspaper',
            list: [
               {
                  id: 0,
                  title: 'Категории',
                  component: 'adminCategories',
                  icon: 'mdi-format-list-bulleted',
               },
               {
                  id: 1,
                  title: 'Статьи',
                  component: 'adminArticles',
                  icon: 'mdi-newspaper',
               },
            ]
         },
         {
            id: 2,
            title: 'События',
            component: 'adminEvents',
            list: null,
            icon: 'mdi-calendar-multiple',
         },
         // {
         //    id: 3,
         //    title: 'Страницы',
         //    component: 'adminPages',
         //    list: null,
         //    icon: 'mdi-page-layout-body',
         // },
         {
            id: 4,
            title: 'Наши друзья',
            component: 'adminFriends',
            list: null,
            icon: 'mdi-domain',
         }
      ],
      modalFriendState: false,
      modalFriendData: {
         data: {},
         action: ''
      },
      menuList: [
         {
            id: 1,
            title: 'Новости',
            link: '/news',
         },
         {
            id: 2,
            title: 'События',
            link: '/events',
         },
         {
            id: 3,
            title: 'Наши друзья',
            link: '/friends',
         },
      ],
      indexPageSetting: {
         newsList: {
            state: true,
         },
         calendar: {
            state: true,
         },
      },
   }),
   getters: {
      getStateAdminModalFriend: state => state.modalFriendState,
      getModalFriendData: state => state.modalFriendData,
      getListAdminSidebar: state => state.listAdminSidebar,
      getMenuList: state => state.menuList,
      getIndexPageSetting: state => state.indexPageSetting,
   },
   actions: {
      changeModalFriendState() {
         this.modalFriendState = !this.modalFriendState
      },
      changeModalFriend(data = {}, action) {
         this.changeModalFriendState()

         this.modalFriendData = {
            data: action === 'edit' ? {...data} : {},
            action,
         };
      },
   }
})
