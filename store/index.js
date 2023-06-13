import { defineStore } from 'pinia'
import deleteDocument from "~/server/deleteDocument";
import createDocument from "~/server/createDocument";
import updateDocument from "~/server/updateDocument";
import createObject from "~/utils/createObject";
import fetchDocuments from "~/server/fetchDocuments";

export const useStore = defineStore('store', {
   state: () => ({
      adminSidebarIsOpen: true,
      editedModalState: false,
      editedModalData: {
         title: '',
         data: {
            id: '',
            name: '',
         }
      },
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
      listAdminSidebar: [
         {
            id: 0,
            title: 'Сайт',
            component: 'adminMain',
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
            title: 'Друзья',
            component: 'adminFriends',
            list: null,
            icon: 'mdi-domain',
         }
      ],
      dataArticle: {
         data: {},
         action: '',
      },
      setting: {},
      indexPageSetting: {
         newsList: {
            state: true,
         },
         calendar: {
            state: true,
         },
      },
      articles: [],
      categories: [],
      events: [],
      friends: [],
   }),
   getters: {
      getStateAdminSidebar: state => state.adminSidebarIsOpen,
      getSiteSetting: state => state.setting,
      getSiteSettingParam: state => name => state.setting[name],
      getListAdminSidebar: state => state.listAdminSidebar,
      getMenuList: state => state.menuList,
      getStateEditedModal: state => state.editedModalState,
      getStateAdminModalFriend: state => state.modalFriendState,
      getDataEditedModal: state => state.editedModalData,
      getCategories: state => state.categories,
      getArticles: state => state.articles,
      getStateDownloadArticles: state => state.stateDownloadArticles,
      getArticle: state => index => {
         return state.articles.find(news => news.id === Number(index))
      },
      getDataArticle: state => state.dataArticle,
      getEvents: state => state.events,
      getIndexPageSetting: state => state.indexPageSetting,
      getFriendsList: state => state.friends,
      getModalFriendData: state => state.modalFriendData
   },
   actions: {
      changeAdminSidebarState() {
         this.adminSidebarIsOpen = !this.adminSidebarIsOpen
      },
      changeModalState() {
         this.editedModalState = !this.editedModalState
      },
      changeModalFriendState() {
         this.modalFriendState = !this.modalFriendState
      },
      changeModalData(information, type, action, title = 'Изменить категорию', path, event) {
         const data = action === 'change'
            ? this[type].find(item => item.id === information.id)
            : {...information}
         this.editedModalData = {
            path,
            type,
            action,
            title,
            data: {...data},
            event,
         }
         this.changeModalState()
      },
      saveChangeArticle(information = null, action = 'add') {
         const data = information === null
            ? {}
            : this.articles.find(item => item.id === information.id)
         this.dataArticle = {
            data,
            action,
         }
      },
      changeModalFriend(data = {}, action) {
         this.changeModalFriendState()

         this.modalFriendData = {
            data: action === 'edit' ? {...data} : {},
            action,
         };
      },

      async saveChange(data, index, type, indexDB, path) {
         const newData = createObject(null, data, type)
         if (type === 'setting') {
            this[type][data.type] = {
               ...newData
            }
         } else {
            this[type] = this[type].map(item => {
               if (item.id === index) {
                  return {...newData}
               }
               return item
            })
         }
         await updateDocument(path, newData, indexDB)
      },
      async addItem(data, type, path) {
         this[type].sort((prev, next) => prev.id - next.id);
         const lastIndex = this[type].at(-1) ? this[type].at(-1).id + 1 : 1
         const newDate = createObject(lastIndex, data, type)
         await createDocument(path, newDate)
      },
      async removeItem(data, type, path) {
         this[type] = this[type].filter(item => item.id !== data.id)
         await deleteDocument(path, data.indexDB)
      },
      async fetchArticleCategories() {
         await fetchDocuments('article-categories', doc => {
            if (this.categories.filter(item => item.id === doc.data().id).length < 1) {
               this.categories.push({
                  ...doc.data(),
                  indexDB: doc.id,
               })
            }
         });
      },
      async fetchArticlesList() {
         await fetchDocuments('articles-list', doc => {
            if (this.articles.filter(item => item.id === doc.data().id).length < 1) {
               this.articles.push({
                  ...doc.data(),
                  indexDB: doc.id,
               })
            }
         });
      },
      async fetchEventsList() {
         await fetchDocuments('events-list', doc => {
            if (this.events.filter(item => item.id === doc.data().id).length < 1) {
               this.events.push({
                  ...doc.data(),
                  indexDB: doc.id,
               })
            }
         });
      },
      async fetchFriendsList() {
         await fetchDocuments('companions-list', doc => {
            if (this.friends.filter(item => item.id === doc.data().id).length < 1) {
               this.friends.push({
                  ...doc.data(),
                  indexDB: doc.id,
               })
            }
         });
      },
      async fetchSiteSetting() {
         await fetchDocuments('site-setting', doc => {
            this.setting[doc.data().type] = {
               ...doc.data(),
               indexDB: doc.id,
            }
         });
      },
   },
})
