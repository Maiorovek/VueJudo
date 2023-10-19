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
      dataArticle: {
         data: {},
         action: '',
      },
      setting: {},
      articles: [],
      categories: [],
      events: [],
      friends: [],
   }),
   getters: {
      getStateAdminSidebar: state => state.adminSidebarIsOpen,
      getSiteSetting: state => state.setting,
      getSiteSettingParam: state => name => state.setting[name],

      getStateEditedModal: state => state.editedModalState,
      getDataEditedModal: state => state.editedModalData,
      getCategories: state => state.categories,
      getArticles: state => state.articles,
      getStateDownloadArticles: state => state.stateDownloadArticles,
      getArticle: state => index => {
         return state.articles.find(news => news.id === Number(index))
      },
      getDataArticle: state => state.dataArticle,
      getEvents: state => state.events,
      getFriendsList: state => state.friends,
   },
   actions: {
      changeAdminSidebarState() {
         this.adminSidebarIsOpen = !this.adminSidebarIsOpen
      },
      changeModalState() {
         this.editedModalState = !this.editedModalState
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
