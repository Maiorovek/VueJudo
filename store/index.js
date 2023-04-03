import { defineStore } from 'pinia'
import { collection, getDocs } from "firebase/firestore";
import { database } from "~/server/setting";
import deleteDocument from "~/server/deleteDocument";
import createDocument from "~/server/createDocument";
import updateDocument from "~/server/updateDocument";

export const useStore = defineStore('store', {
   state: () => ({
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
            title: 'Страницы',
            component: 'adminPages',
            list: null,
            icon: 'mdi-page-layout-body',
         }
      ],
      articles: [],
      dataArticle: {
         data: {},
         action: '',
      },
      stateDownloadArticles: true,
      categories: [],
      siteSetting: {
         name: {
            name: 'Название сайта',
            param: 'Дзюдо',
         },
      },
   }),
   getters: {
      getSiteSetting: state => state.siteSetting,
      getListAdminSidebar: state => state.listAdminSidebar,
      getMenuList: state => state.menuList,
      getStateEditedModal: state => state.editedModalState,
      getDataEditedModal: state => state.editedModalData,
      getCategories: state => state.categories,
      getArticles: state => state.articles,
      getStateDownloadArticles: state => state.stateDownloadArticles,
      getArticle: (state) => index => {
         return state.articles.find(news => news.id === Number(index))
      },
      getDataArticle: state => state.dataArticle,
   },
   actions: {
      changeModalState() {
         this.editedModalState = !this.editedModalState
      },
      changeModalData(information, type, action, title = 'Изменить категорию') {
         let data = {}
         if (action === 'change') {
            data = this[type].find(item => item.id === information.id)
         } else if (action === 'remove') {
            data = {...information}
         }
         this.editedModalData = {
            type,
            action,
            title,
            data: {...data}
         }
         this.changeModalState()
      },
      async changeData(data, index, type, action, indexDB) {
         if (action === 'change') {
            this[type] = this[type].map(item => {
               if (item.id === index) {
                  item.name = data
               }
               return item
            })
            await updateDocument('article-categories', data, indexDB, type)
         } else if (action === 'add') {
            const lastIndex = this[type].at(-1) ? this[type].at(-1).id + 1 : 1
            const newItem = {
               id: lastIndex,
               name: data
            }
            this[type].push(newItem)
            await createDocument('article-categories', lastIndex, data, type)
         }
      },
      async removeItem(data, type) {
         this[type] = this[type].filter(item => item.id !== data.id)
         if (type === 'categories') {
            await deleteDocument('article-categories', data.indexDB)
         } else {
            await deleteDocument('articles-list', data.indexDB)
         }
      },
      changeDataArticle(information = null, action = 'add') {
         const data = information === null ? {} : this.articles.find(item => item.id === information.id)
         this.dataArticle = {
            data,
            action,
         }
      },
      async actionArticle(action, data) {
         if (action === 'add') {
            const lastIndex = this.articles.at(-1) ? this.articles.at(-1).id + 1 : 1
            let options = {
               year: 'numeric',
               month: 'numeric',
               day: 'numeric',
               timezone: 'UTC'
            };
            this.articles.push({
               ...data,
               id: lastIndex,
               date: new Date().toLocaleString('ru', options)
            })
            await createDocument('articles-list', lastIndex, data, 'articles', options)
         } else {
            const {name, page, content, status, category, preview} = data
            this.articles = this.articles.map(item => {
               if (item.id === data.id) {
                  item.name = name
                  item.page = page
                  item.content = content
                  item.category = category
                  item.status = status
                  item.preview = preview
               }
               return item
            })
            await updateDocument('article-categories', data, data.indexDB, 'articles')
         }
      },
      async fetchArticleCategories() {
         const querySnapshot = await getDocs(collection(database, 'article-categories'));
         querySnapshot.forEach((doc) => {
            this.categories.push({
               ...doc.data(),
               indexDB: doc.id,
            })
         });
      },
      async fetchArticlesList() {
         const querySnapshot = await getDocs(collection(database, 'articles-list'));
         querySnapshot.forEach((doc) => {
            this.articles.push({
               ...doc.data(),
               indexDB: doc.id,
            })
         });
         this.stateDownloadArticles = false
      },
   },
})
