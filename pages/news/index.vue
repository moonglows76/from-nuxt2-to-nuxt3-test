<template>
  <div class="container">
    <firstview
      title-en="News"
      :title="title"
      description="株式会社シナプスのニュースをお届けします。"
    />

    <breadcrumb :contents="breadcrumbContents" />

    <div class="contents-box">
      <article-index title="シナプスのお知らせ一覧" :contents="contents" />
    </div>

    <pagination
      base-path="/news"
      :page-current="pageCurrent"
      :page-max="pageMax"
    />

    <other-links />
  </div>
</template>

<script>
import moment from 'moment'
import firstview from '@/components/organisms/firstview'
import breadcrumb from '@/components/molecules/breadcrumb'
import otherLinks from '@/components/molecules/otherLinks'
import articleIndex from '@/components/organisms/articleIndex'
import pagination from '@/components/organisms/pagination'
import updateMeta from '@/plugins/updateMeta'

export default {
  components: { firstview, breadcrumb, otherLinks, articleIndex, pagination },
  async asyncData({ $axios, route }) {
    const pageCurrent = parseInt(route.query.page) || 1
    const [newsRes, { data: categoryData }] = await Promise.all([
      await $axios.get(
        `${process.env.apiEndpoint}news?_embed&page=${pageCurrent}`
      ),
      await $axios.get(`${process.env.apiEndpoint}categories?per_page=100`)
    ])
    const data = newsRes.data

    return {
      contents: data.map((_data) => {
        return {
          link: `/news/${_data.slug}/`,
          thumbnail:
            _data?._embedded?.['wp:featuredmedia']?.[0]?.source_url || null,
          title: _data.title.rendered.replace(/<br>/g, ''),
          date: moment(_data.date).format('YYYY.MM.DD'),
          category: _data.categories
            ? categoryData.find((category) => {
                return category.id === _data.categories[0]
              })?.name
            : '',
        }
      }),
      pageCurrent,
      pageMax: parseInt(newsRes.headers['x-wp-totalpages']),
    }
  },
  data() {
    return {
      title: 'お知らせ',
      breadcrumbContents: [
        {
          title: 'ホーム',
          link: '/',
        },
        {
          title: 'お知らせ',
          link: '/news/',
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
  :deep(.breadcrumb) {
    top: 360px;
  }
}

.contents-box {
  position: relative;
  max-width: $width-2;
  min-height: 800px;
  margin: -64px auto 0;
  border: 1px solid $color-gray-3;
  background-color: white;
}

@include smartphone {
  .container {
    :deep(.breadcrumb) {
      top: 196px;
    }
  }

  .contents-box {
    min-height: initial;
    margin: 0 auto;
    padding: 32px 0;
    border: none;
  }
}
</style>
