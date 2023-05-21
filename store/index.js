import { defineStore } from 'pinia'
import { collection, onSnapshot } from "firebase/firestore";
import { database } from "~/server/setting";
import deleteDocument from "~/server/deleteDocument";
import createDocument from "~/server/createDocument";
import updateDocument from "~/server/updateDocument";
import createObject from "~/utils/createObject";

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
      menuList: [
         {
            id: 0,
            title: 'Главная',
            link: '/',
         },
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
         // {
         //    id: 0,
         //    title: 'Сайт',
         //    component: 'adminMain',
         //    icon: 'mdi-home',
         // },
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
      siteSetting: {
         name: {
            name: 'Название сайта',
            param: 'Дзюдо',
         },
      },
      indexPageSetting: {
         newsList: {
            state: true,
         },
      },
      errorAuth: {},
      articles: [],
      categories: [],
      events: [],
      friends: [],
   }),
   getters: {
      getStateAdminSidebar: state => state.adminSidebarIsOpen,
      getSiteSetting: state => state.siteSetting,
      getListAdminSidebar: state => state.listAdminSidebar,
      getMenuList: state => state.menuList,
      getStateEditedModal: state => state.editedModalState,
      getDataEditedModal: state => state.editedModalData,
      getCategories: state => state.categories,
      getArticles: state => state.articles,
      getStateDownloadArticles: state => state.stateDownloadArticles,
      getErrorAuth: state => state.errorAuth,
      getArticle: state => index => {
         return state.articles.find(news => news.id === Number(index))
      },
      getDataArticle: state => state.dataArticle,
      getEvents: state => state.events,
      getIndexPageSetting: state => state.indexPageSetting,
      getFriendsList: state => state.friends
   },
   actions: {
      changeAdminSidebarState() {
         this.adminSidebarIsOpen = !this.adminSidebarIsOpen
      },
      setErrorAuth(value, type) {
         let typeString = ''
         let errorString = ''

         switch (value) {
            case 'auth/invalid-email':
               typeString = 'login'
               errorString = 'Введите действительный адрес электронной почты'
               break;
            case 'auth/user-not-found':
               typeString = 'login'
               errorString = 'Этот почтовый адрес не зарегистрирован'
               break;
            case 'auth/missing-password':
               typeString = 'password'
               errorString = 'Неверный формат пароля'
               break;
            case 'auth/wrong-password':
               typeString = 'password'
               errorString = 'Неверный пароль'
               break;
            case 'auth/too-many-requests':
               typeString = 'login'
               errorString = 'Слишком много попыток авторизации'
               break;
            default:
               typeString = type
               errorString = value
               break;
         }

         this.errorAuth = {
            value: errorString,
            type: typeString
         }
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
         this[type] = this[type].map(item => {
            if (item.id === index) {
               return {...newData}
            }
            return item
         })
         await updateDocument(path, newData, indexDB, type)
      },
      async addItem(data, type, path) {
         const lastIndex = this[type].at(-1) ? this[type].at(-1).id + 1 : 1
         const newDate = createObject(lastIndex, data, type)
         await createDocument(path, newDate)
      },
      async removeItem(data, type, path) {
         this[type] = this[type].filter(item => item.id !== data.id)
         if (data.id !== null) await deleteDocument(path, data.indexDB)
      },
      async fetchArticleCategories() {
         onSnapshot(collection(database, 'article-categories'), querySnapshot => {
            querySnapshot.forEach((doc) => {
               if (this.categories.filter(item => item.id === doc.data().id).length < 1) {
                  this.categories.push({
                     ...doc.data(),
                     indexDB: doc.id,
                  })
               }
            });
         });
         this.categories.sort((prev, next) => {
            return prev.id - next.id
         });
      },
      async fetchArticlesList() {
         onSnapshot(collection(database, 'articles-list'), querySnapshot => {
            querySnapshot.forEach((doc) => {
               if (this.articles.filter(item => item.id === doc.data().id).length < 1) {
                  this.articles.push({
                     ...doc.data(),
                     indexDB: doc.id,
                  })
               }
            });
         });
         this.articles.sort((prev, next) => {
            return prev.id - next.id
         });
      },
      async fetchEventsList() {
         onSnapshot(collection(database, 'events-list'), querySnapshot => {
            querySnapshot.forEach((doc) => {
               if (this.events.filter(item => item.id === doc.data().id).length < 1) {
                  this.events.push({
                     ...doc.data(),
                     indexDB: doc.id,
                  })
               }
            });
         });
         this.events.sort((prev, next) => {
            return prev.id - next.id
         });
      },
      async fetchFriendsList() {
         onSnapshot(collection(database, 'companions-list'), querySnapshot => {
            querySnapshot.forEach((doc) => {
               if (this.friends.filter(item => item.id === doc.data().id).length < 1) {
                  this.friends.push({
                     ...doc.data(),
                     indexDB: doc.id,
                  })
               }
            });
         });
         this.friends.sort((prev, next) => {
            return prev.id - next.id
         });
      },
   },
})
