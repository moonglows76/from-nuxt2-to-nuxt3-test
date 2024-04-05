<template>
  <div class="container">
    <firstview2
      :role-en="roleEn"
      :name="name"
      :role="role"
      :titles="titles"
      title="社員紹介"
      :background="thumbnail"
      :is-large="true"
    />

    <breadcrumb :contents="breadcrumbContents" />

    <background-layer>
      <article-content :content="content" />
    </background-layer>

    <link-container :links="links" />
    <other-links />
  </div>
</template>

<script>
import breadcrumb from '@/components/molecules/breadcrumb'
import articleContent from '@/components/organisms/articleContent'
import backgroundLayer from '@/components/atoms/backgroundLayer'
import linkContainer from '@/components/molecules/linkContainer'
import firstview2 from '@/components/organisms/firstview2'
import fetchWordpress from '@/plugins/fetchWordpress'
import updateMeta from '@/plugins/updateMeta'
import otherLinks from '@/components/molecules/otherLinks'

export default {
  components: {
    breadcrumb,
    articleContent,
    backgroundLayer,
    linkContainer,
    firstview2,
    otherLinks,
  },
  async asyncData({ $axios, params, route }) {
    const { prevLink, nextLink, targetLink } = await fetchWordpress({
      route,
      params,
      $axios,
      base: 'staff',
    })

    return {
      titles: targetLink.acf?.catchcopy?.split('<br>'),
      thumbnail:
        targetLink?._embedded?.['wp:featuredmedia']?.[0]?.source_url || null,
      thumbnailMeta:
        targetLink?._embedded?.['wp:featuredmedia']?.[0]?.media_details,
      name: targetLink.title?.rendered,
      role: targetLink.acf?.role,
      roleEn: targetLink.acf?.roleEn,
      content: targetLink.content?.rendered,
      links: [
        prevLink
          ? {
              position: 'prev',
              path: `/work/staff/${prevLink.slug}/`,
              thumbnail:
                prevLink?._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
                null,
              role: prevLink.acf?.role,
              name: prevLink.title?.rendered,
            }
          : null,
        nextLink
          ? {
              position: 'next',
              path: `/work/staff/${nextLink.slug}/`,
              thumbnail:
                nextLink?._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
                null,
              role: nextLink.acf?.role,
              name: nextLink.title?.rendered,
            }
          : null,
      ],
      breadcrumbContents: [
        {
          title: 'ホーム',
          link: '/',
        },
        {
          title: 'シナプスの仕事と人',
          link: '/work/',
        },
        {
          title: 'スタッフ紹介',
          link: '/work/staff/',
        },
        {
          title: targetLink.title?.rendered,
          link: `/work/staff/${params.id}/`,
        },
      ],
    }
  },
  head() {
    return updateMeta({
      title: process.env.titleTemplate.replace(/%s/, this.titles.join('')),
      url: `${process.env.url}${this.$route.path.slice(1)}`,
      image: this.thumbnail
        ? {
            src: this.thumbnail,
            width: this.thumbnailMeta.width,
            height: this.thumbnailMeta.height,
          }
        : null,
    })
  },
  mounted() {
    this.fontReload()
  },
}
</script>

<style scoped lang="scss">
.container {
  :deep(.firstview2) {
    &__role-en {
      display: none;
    }
  }

  :deep(.breadcrumb) {
    top: 610px;
    background-color: $color-gray-2;
  }

  :deep(.background-layer) {
    padding: 80px 0;
  }
}

@include smartphone {
  .container {
    :deep(.firstview2) {
      &__title-container {
        bottom: 84px;
      }
    }

    :deep(.breadcrumb) {
      top: 376px;
    }
  }
}
</style>
