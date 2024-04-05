<template>
  <div class="container">
    <firstview2 name="社長ブログ" :titles="titles" />

    <breadcrumb :contents="breadcrumbContents" />

    <background-layer>
      <article-content
        :date="date"
        :categories="categories"
        :content="content"
      />
    </background-layer>

    <link-container :links="links" />
    <other-links />
  </div>
</template>

<script>
import moment from 'moment'
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
    const [
      { prevLink, nextLink, targetLink },
      { data: categoryData }
    ] = await Promise.all([
      fetchWordpress({
        route,
        params,
        $axios,
        base: 'blog'
      }),
      $axios.get(`${process.env.apiEndpoint}categories?per_page=100`)
    ])

    const title = targetLink.title?.rendered?.replace(/<br>/g, '')

    const categories = []
    targetLink.categories?.forEach?.((category) => {
      categories.push(
        categoryData?.find((_categoryData) => {
          return _categoryData.id === category
        })?.name
      )
    })

    return {
      titles: targetLink.title?.rendered?.split('<br>'),
      categories,
      date: moment(targetLink.date).format('YYYY月M月D日'),
      content: targetLink.content?.rendered,
      links: [
        prevLink
          ? {
              position: 'prev',
              path: `/blog/${prevLink.slug}/`,
              role: '社長ブログ',
              name: prevLink.title?.rendered?.replace(/<br>/g, ''),
            }
          : null,
        nextLink
          ? {
              position: 'next',
              path: `/blog/${nextLink.slug}/`,
              role: '社長ブログ',
              name: nextLink.title?.rendered?.replace(/<br>/g, ''),
            }
          : null,
      ],
      breadcrumbContents: [
        {
          title: 'ホーム',
          link: '/',
        },
        {
          title: '社長ブログ',
          link: '/blog/',
        },
        {
          title,
          link: `/blog/${params.id}/`,
        },
      ],
    }
  },
  head() {
    return updateMeta({
      title: process.env.titleTemplate.replace(/%s/, this.titles.join('')),
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
  :deep(.firstview2) {
    color: $color-black-1;
  }

  :deep(.breadcrumb) {
    top: 440px;
  }

  :deep(.background-layer) {
    padding: 80px 0;
  }
}

@include smartphone {
  .container {
    :deep(.breadcrumb) {
      top: 308px;
    }
  }
}
</style>
