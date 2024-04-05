<template>
  <div class="container">
    <firstview
      title-en="Work"
      :title="title"
      description="このページではシナプスで働くスタッフとその主な職種、採用情報についてご紹介します。"
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

export default {
  components: {
    firstview,
    breadcrumb,
    otherLinks,
    pageIndex,
  },
  asyncData({ route }) {
    return {
      contents: links.find((link) => {
        return link.path.replace(/\/$/, '') === route.path.replace(/\/$/, '')
      })?.children,
    }
  },
  data() {
    return {
      title: 'シナプスの仕事と人',
      breadcrumbContents: [
        {
          title: 'ホーム',
          link: '/',
        },
        {
          title: 'シナプスの仕事と人',
          link: '/work/',
        },
      ],
    }
  },
  head() {
    return updateMeta({
      title: process.env.titleTemplate.replace(/%s/, this.title),
      url: `${process.env.url}${this.$route.path.slice(1)}`,
    })
  },
  mounted() {
    this.fontReload()
  },
}
</script>

<style scoped lang="scss">
.container {
  min-width: $width-2;

  :deep(.breadcrumb) {
    top: 360px;
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
