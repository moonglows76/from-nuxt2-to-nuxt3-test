<template>
  <div class="container">
    <firstview
      title-en="Technology"
      :title="title"
      description="シナプスは、ネットワークインフラからフロントエンドまで、一貫した技術を持っています。<br>エンジニアが日々更新する技術者ブログやスタッフ同士による座談会を通じて、技術に関するシナプスの考え方をお伝えします。"
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
  asyncData({ _route }) {
    return {
      contents: links.find((link) => {
        return link.path.replace(/\/$/, '') === _route.path.replace(/\/$/, '')
      })?.children,
    }
  },
  data() {
    return {
      title: 'シナプスの技術',
      breadcrumbContents: [
        {
          title: 'ホーム',
          link: '/',
        },
        {
          title: 'シナプスの技術',
          link: '/technology/',
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
    top: 372px;
  }

  :deep() {
    .firstview {
      overflow: initial;
      &__description {
        padding: 0 8px;
      }
    }
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
