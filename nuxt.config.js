export default defineNuxtConfig({

   ssr: false,

   generate: {fallback: true},

   head: {
      link: [
         {
            rel: 'icon',
            type: 'image/x-icon',
            href: 'public/favicon.ico'
         }
      ]
   },

   css: [
      '@/assets/styles/index.scss',
      'vuetify/lib/styles/main.sass',
      '@mdi/font/css/materialdesignicons.min.css',
      'devextreme/dist/css/dx.light.css'
   ],

   modules: [
      '@pinia/nuxt',
      '@element-plus/nuxt'
   ],

   buildModules: [
      '@nuxtjs/svg'
   ],

   build: {
      transpile: ['vuetify']
   }
})
