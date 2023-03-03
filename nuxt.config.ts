import svgLoader from 'vite-svg-loader'

export default defineNuxtConfig({

    css: [
        '@/assets/style/index.scss',
        'vuetify/lib/styles/main.sass',
        '@mdi/font/css/materialdesignicons.min.css',
    ],

    modules: [
        '@pinia/nuxt',
    ],

    build: {
        transpile: ['vuetify'],
    },

    vite: {
        plugins: [
            svgLoader({})
        ]
    }
})
