<template>
  <div class="container">
    <firstview
      title-en="About"
      :title="title"
      description="経営理念や特長、展開するサービスなどについて、シナプスのありのままをご紹介します。"
    />

    <breadcrumb :contents="breadcrumbContents" />

    <page-index :contents="contents" />

    <other-links />
  </div>
</template>

<script>
import firstview from '@/components/organisms/firstview'
import breadcrumb from '@/components/molecules/breadcrumb'
import otherLinks from '@/components/molecules/otherLinks'
import pageIndex from '@/components/organisms/pageIndex'

export default defineComponent({
  components: {
    firstview,
    breadcrumb,
    otherLinks,
    pageIndex,
  },
  data() {
    return {
      title: 'シナプスについて',
      breadcrumbContents: [
        {
          title: 'ホーム',
          link: '/',
        },
        {
          title: 'シナプスについて',
          link: '/about/',
        },
      ],
    }
  },
  mounted() {
    this.$fontReload()
  },
})
</script>

<script setup>
// composables
const config = useRuntimeConfig()
const nuxtApp = useNuxtApp()
const route  = useRoute()

// jsonの読み込み
const links = await import('@/assets/jsons/links.json')
  .then((module) => module.default)

// ページコンテンツの取得
const contents = links.find((link) => {
  return link.path.replace(/\/$/, '') === route.path.replace(/\/$/, '')
})?.children

// head要素内の設定
useHead(
  nuxtApp.$updateMeta({
    title: config.public.titleTemplate.replace(/%s/, 'シナプスについて'),
    url: `${config.public.url}${route.path.slice(1)}`,
  })
)
</script>

<style scoped lang="scss">
.container {
  min-width: $width-2;

  :deep(.breadcrumb) {
    top: 364px;
  }

  :deep(.firstview) {
    overflow: initial;
  }
}

@include smartphone {
  .container {
    min-width: initial;

    :deep(.breadcrumb) {
      top: 196px;
    }
  }
}
</style>
