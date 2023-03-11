import {defineStore} from 'pinia'

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
        articles: [
            {
                id: 1,
                category: 1,
                name: 'Какое-то имя',
                date: '08.01.2023',
                content: `
    <h2>
        Formatted Text Editor (HTML Editor)
    </h2>
    <br>
    <p>DevExtreme JavaScript HTML Editor is a client-side WYSIWYG text editor that allows its users to format textual and visual content and store it as HTML or Markdown.</p>
    <p>Supported features:</p>
    <ul>
        <li>Inline formats:
            <ul>
                <li><strong>Bold</strong>, <em>italic</em>, <s>strikethrough</s> text formatting</li>
                <li>Font, size, color changes (HTML only)</li>
            </ul>
        </li>
        <li>Block formats:
            <ul>
                <li>Headers</li>
                <li>Text alignment</li>
                <li>Lists (ordered and unordered)</li>
                <li>Code blocks</li>
                <li>Quotes</li>
            </ul>
        </li>
        <li>Custom formats</li>
        <li>HTML and Markdown support</li>
        <li>Mail-merge placeholders (for example, %username%)</li>
        <li>Adaptive toolbar for working images, links, and color formats</li>
        <li>Image upload: drag-and-drop images onto the form, select files from the file system, or specify a URL.</li>
        <li>Copy-paste rich content (unsupported formats are removed)</li>
        <li>Tables support</li>
    </ul>
    <br>
    <p>Supported frameworks and libraries</p>
    <table>
        <tr>
            <td><strong>jQuery</strong></td>
            <td style="text-align: right;">v2.1 - v2.2 and v3.x</td>
        </tr>
        <tr>
            <td><strong>Angular</strong></td>
            <td style="text-align: right;">v7.0.x - v10.0.x</td>
        </tr>
        <tr>
            <td><strong>React</strong></td>
            <td style="text-align: right;">v16.2+</td>
        </tr>
        <tr>
            <td><strong>Vue</strong></td>
            <td style="text-align: right;">v2.6.3+</td>
        </tr>
    </table>
`,
                status: false,
            },
            {
                id: 2,
                category: 2,
                name: 'Какое-то имя 2',
                date: '10.03.2023',
                content: 'Данные 2',
                status: true,
            },
        ],
        categories: [
            {
                id: 1,
                name: 'Категория 1',
            },
            {
                id: 2,
                name: 'Категория 2',
            },
            {
                id: 3,
                name: 'Категория 3',
            },
            {
                id: 4,
                name: 'Категория 4',
            },
        ],
        siteSetting: {
            name: {
                name: 'Название сайта',
                param: 'Дзюдо',
            },
            meta: '2123',
        },
        dataArticle: {
            data: {},
            action: '',
        }
    }),
    getters: {
        getSiteSetting: state => state.siteSetting,
        getListAdminSidebar: state => state.listAdminSidebar,
        getMenuList: state => state.menuList,
        getStateEditedModal: state => state.editedModalState,
        getDataEditedModal: state => state.editedModalData,
        getCategories: state => state.categories,
        getArticles: state => state.articles,
        getDataArticle: state => state.dataArticle,
    },
    actions: {
        changeModalState() {
            this.editedModalState = !this.editedModalState
        },
        changeModalData(index, type, action, title = 'Изменить категорию') {
            let data = {}
            if (action !== 'remove') {
                data = this[type].find(item => item.id === index)
            } else {
                data = {id: index}
            }
            this.editedModalData = {
                type,
                action,
                title,
                data: {...data}
            }
            this.changeModalState()
        },
        changeData(data, index, type, action) {
            if (action === 'change') {
                this[type] = this[type].map(item => {
                    if (item.id === index) {
                        item.name = data
                    }
                    return item
                })
            } else if (action === 'add') {
                const newItem = {
                    id: this[type].at(-1).id + 1,
                    name: data
                }
                this[type].push(newItem)
            }
        },
        removeItem(index, type) {
            this[type] = this[type].filter(item => item.id !== index)
            this.changeModalState()
        },
        addItem(type, action) {
            this.changeModalData(null, type, action)
        },
        changeDataArticle(index = null, action = 'add') {
            const data = index === null ? {} : this.articles.find(item => item.id === index)
            this.dataArticle = {
                data,
                action,
            }
        },
        actionArticle(action, data) {
            if (action === 'add') {
                let options = {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                    timezone: 'UTC'
                };
                this.articles.push({
                    ...data,
                    id: this.articles.at(-1).id + 1,
                    date: new Date().toLocaleString("ru", options)
                })
            } else {
                this.articles = this.articles.map(item => {
                    if (item.id === data.id) {
                        const {name, content, status, category} = data
                        item.name = name
                        item.content = content
                        item.category = category
                        item.status = status
                    }
                    return item
                })
            }
        },
    },
})
