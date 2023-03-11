// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        {rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/leaflet.min.css', integrity: 'sha512-KJRB1wUfcipHY35z9dEE+Jqd+pGCuQ2JMZmQPAjwPjXuzz9oL1pZm2cd79vyUgHQxvb9sFQ6f05DIz0IqcG1Jw==', crossorigin: 'anonymous', referrerpolicy: 'no-referrer'}
      ],
      script: [
        {src: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/leaflet.min.js', integrity: 'sha512-Io0KK/1GsMMQ8Vpa7kIJjgvOcDSwIqYuigJEYxrrObhsV4j+VTOQvxImACNJT5r9O4n+u9/58h7WjSnT5eC4hA==', crossorigin: 'anonymous', referrerpolicy: 'no-referrer'}
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
})
