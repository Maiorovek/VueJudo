export default defineNuxtConfig({

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
