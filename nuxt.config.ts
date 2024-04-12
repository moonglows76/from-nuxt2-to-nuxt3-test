let hash = ''

const title = '株式会社シナプス'
const description =
  '株式会社シナプスは、地域密着型プロバイダとして、1995年から鹿児島県のインターネット環境を支えてきました。ネットワークインフラからフロントエンドまでの幅広い技術力、万全のお客様サポート力が私たちの強みです。これからも、インターネットで、鹿児島の毎日を笑顔にします。'
const url = process.env.CORP_URL || 'https://corp.synapse.jp/'
const keywords =
  '鹿児島,インターネット,プロバイダ,自社サービス,ネットワーク運用,サーバ運用,システム構築,Webサイト制作,サポート,地域密着,パートナー制度,コミュニティー支援,光,ADSL,ブロードバンド,マークメイザン'
const wpAccessToken =
  'dummy' 
//const apiEndpoint = 'https://corp-resource.synapse.jp/wp-json/wp/v2/'
const apiEndpoint = process.env.CORP_API_ENDPOINT || 'https://corp-resource.synapse.jp/wp-json/wp/v2/'

let isPreviewMode = false
process.argv.forEach((val) => {
  if (val === '--preview') {
    isPreviewMode = true
  } else if (val === 'build' || val === 'start') {
    //const latestCommit = childProcess.execSync('git rev-parse master')
    //hash = latestCommit.toString('utf-8', 0, latestCommit.length - 1)
    var date = new Date();
    hash =     date.getFullYear() + ('0' + (date.getMonth() + 1)).slice(-2) +('0' + date.getDate()).slice(-2)  +  ('0' + date.getHours()).slice(-2) + ('0' + date.getMinutes()).slice(-2) + ('0' + date.getSeconds()).slice(-2) + date.getMilliseconds()
  }
})

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      title,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'keywords', content: keywords },
        { hid: 'description', name: 'description', content: description },
        { hid: 'ogTitle', property: 'og:title', content: title },
        { hid: 'ogType', property: 'og:type', content: 'website' },
        { hid: 'ogUrl', property: 'og:url', content: url },
        { hid: 'ogImage', property: 'og:image', content: `${url}ogp.jpg` },
        { property: 'og:site_name', content: title },
        {
          hid: 'ogDescription',
          property: 'og:description',
          content: description,
        },
        { name: 'twitter:card', content: 'summary_large_image' },
        { hid: 'twitterSite', name: 'twitter:site', content: title },
        { hid: 'twitterTitle', name: 'twitter:title', content: title },
        {
          hid: 'twitterDescription',
          name: 'twitter:description',
          content: description,
        },
        {
          hid: 'twitterImageSrc',
          name: 'twitter:image:src',
          content: `${url}ogp.jpg`,
        },
      ],
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: url,
        },
        { href: '/webclipicon.png', rel: 'apple-touch-icon' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon_0630.ico' },
        {
          rel: 'stylesheet',
          href: 'https://pro.fontawesome.com/releases/v5.8.2/css/all.css',
          integrity:
            'sha384-xVVam1KS4+Qt2OrFa+VdRUoXygyKIuNWUUUBZYv+n27STsJ7oDOHJgfF0bNKLMJF',
          crossorigin: 'anonymous',
        },
        {
          rel: 'alternate',
          type: 'application/rss+xml',
          title: `${title} 更新情報`,
          href: `${url}feed.xml`,
        },
      ],
      script: [
        {
          type: 'text/javascript',
          src: '//webfont.fontplus.jp/accessor/script/fontplus.js?yJw5bd6AqZE%3D&box=4e3-dbiMLHA%3D',
        },
        {
          type: 'text/javascript',
          src: '/scripts/padStart.js',
        },
        {
          src: 'https://sdk.form.run/js/v2/formrun.js',
        },
        {
          src: '/scripts/core-js-bundle@3.0.1.js',
        },
      ],
    },
  },
  css: ['~/assets/styles/main.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "~/assets/styles/_variables.scss" as *;
            @use "~/assets/styles/_mixins.scss" as *;
          `,
        },
      },
    },
  },
  runtimeConfig: {
    public: {
      url,
      titleTemplate: `%s - ${title}`,
      description,
      apiEndpoint,
      isPreviewMode: isPreviewMode ? { wpAccessToken } : {},
    }
  },
  modules: ['@pinia/nuxt'],
})
