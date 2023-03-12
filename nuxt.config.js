export default defineNuxtConfig({

    head: {
        link: [
            { rel: 'icon', type: 'image/x-icon', href: 'public/favicon.png' }
        ]
    },

    css: [
        '@/assets/style/index.scss',
        'vuetify/lib/styles/main.sass',
        '@mdi/font/css/materialdesignicons.min.css',
        'devextreme/dist/css/dx.light.css',
    ],

    modules: [
        '@pinia/nuxt',
        '@element-plus/nuxt',
    ],

    build: {
        transpile: ['vuetify'],
    },
})
