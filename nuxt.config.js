require('dotenv').config();
module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Motorgari Shop',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet',href: 'https://fonts.googleapis.com/css?family=Nunito|Open+Sans' },
      { rel: 'stylesheet', type: 'text/css', href: '/css/fontawesome-all.min.css' },
      { rel: 'stylesheet', type: 'text/css', href: 'https://unpkg.com/flickity@2/dist/flickity.min.css' },
    ],
    script: [
      { src: 'https://unpkg.com/flickity@2/dist/flickity.pkgd.min.js' },
    ]

  },
  css: [
    'bulma',
    '@/assets/main.sass',
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#ffd83d' },
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000/api',
    rootUrl: process.env.ROOT_URL || 'http://localhost:2020/api',
    imageUrl: process.env.IMAGE_URL || 'http://img.motorgari.shop/images'
  },
  /*
  ** Modules for NuxtJS
  */
  modules: [
  ],
  router: {
    middleware: ['searchbar']
  },
  plugins: ['~/plugins/lazyload', '~/plugins/toaster', '~/plugins/rx', { src: '~plugins/fb-sdk.js', ssr: false }],
  /*
  ** Build configuration
  */
  build: {
    postcss: {
      plugins: {
        'postcss-custom-properties': {
          warnings: false
        }
      }
    },
    vendor: ['isomorphic-fetch', 'moment', 'vue-rx', 'rxjs', 'js-cookie', 'cookie'],
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
