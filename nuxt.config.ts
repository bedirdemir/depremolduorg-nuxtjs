// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: { lang: 'tr' },
      link: [
        {rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/leaflet.min.css', integrity: 'sha512-KJRB1wUfcipHY35z9dEE+Jqd+pGCuQ2JMZmQPAjwPjXuzz9oL1pZm2cd79vyUgHQxvb9sFQ6f05DIz0IqcG1Jw==', crossorigin: 'anonymous', referrerpolicy: 'no-referrer'},
        {rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png'},
        {rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png'},
        {rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png'},
        {rel: 'manifest', href: '/manifest.json'}
      ],
      script: [
        {src: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/leaflet.min.js', integrity: 'sha512-Io0KK/1GsMMQ8Vpa7kIJjgvOcDSwIqYuigJEYxrrObhsV4j+VTOQvxImACNJT5r9O4n+u9/58h7WjSnT5eC4hA==', crossorigin: 'anonymous', referrerpolicy: 'no-referrer'},
        {src: 'https://www.googletagmanager.com/gtag/js?id=G-1NZT3VV3SJ', async: 'true'},
        {children: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
  
        gtag('config', 'G-1NZT3VV3SJ');
        `},
        {children: `
        if ('serviceWorker' in navigator) {
          window.addEventListener('load', function () {
            navigator.serviceWorker.register('/sw.js?v=3');
          });
        }
        `}
      ],
      meta: [
        {charset: 'utf-8'},
        {property: 'og:title', content:'Son Depremler - Deprem Haritası | DepremOldu.org'},
        {property: 'og:description', content: "Türkiye'de gerçekleşen son depremler. Türkiye deprem haritası. DepremOldu.org"},
        {property: 'og:url', content: 'https://depremoldu.org'},
        {property: 'og:image', content: 'https://depremoldu.org/logo-social.jpg'},
        {property: 'og:locale', content: 'tr_TR'},
        {name: 'robots', content: 'index, follow'},
        {name: 'twitter:card', content: 'summary_large_image'},
        {name: 'theme-color', content: '#EB455F'}
      ]
    }
  },
  components: [
    '~/components/',
    '~/components/Shared'
  ],
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    '@pinia/nuxt',
  ],
  imports: {
    dirs: ['stores'],
  },
  // routeRules: {
  //   "/**": {
  //     headers: {'cache-control': 's-maxage=0, stale-while-revalidate'}
  //   },
  // }
})
