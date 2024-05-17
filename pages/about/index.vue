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
import links from '@/assets/jsons/links'
import firstview from '@/components/organisms/firstview'
import breadcrumb from '@/components/molecules/breadcrumb'
import otherLinks from '@/components/molecules/otherLinks'
import pageIndex from '@/components/organisms/pageIndex'
import updateMeta from '@/plugins/updateMeta'

export default defineNuxtComponent({
  components: {
    firstview,
    breadcrumb,
    otherLinks,
    pageIndex,
  },
  asyncData() {
    const route = useRoute()
    return {
      contents: links.find((link) => {
        return link.path.replace(/\/$/, '') === route.path.replace(/\/$/, '')
      })?.children,
    }
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
    const nuxtApp = useNuxtApp()
    const config = useRuntimeConfig()
    const route = useRoute()
    const headObj = nuxtApp.$updateMeta({
      title: config.public.titleTemplate.replace(/%s/, this.title),
      url: `${config.public.url}${route.path.slice(1)}`,
    })
    useHead(headObj)
    this.$fontReload()
  },
})
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
