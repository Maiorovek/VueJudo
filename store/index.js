import {defineStore} from 'pinia'

export const useStore = defineStore('store', {
    state: () => ({
        editedModalState: false,
        editedModalData: {},
        listNews: [
            {
                id: 0,
                title: ''
            }
        ],
        listNewsCategories: [
            {
                id: 0,
                name: 'Соревования'
            },
            {
                id: 1,
                name: 'Новости',
            },
        ],
        menuList: [
            {
                id: 0,
                title: 'Главная',
                link: '/',
            },
            {
                id: 0,
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
        siteSetting: {
            name: {
                name: 'Название сайта',
                param: 'Дзюдо',
            },
            meta: '2123',
        },
    }),
    getters: {
        getSiteSetting: state => state.siteSetting,
        getListAdminSidebar: state => state.listAdminSidebar,
        getMenuList: state => state.menuList,
        getListNews: state => state.listNews,
        getStateEditedModal: state => state.editedModalState,
        getDataEditedModal: state => state.editedModalData,
    },
    actions: {
        closeEditModal() {
            this.editedModalState = !this.editedModalState
        },
    },
})
