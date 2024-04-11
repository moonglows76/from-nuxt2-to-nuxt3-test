<template>
  <div class="container">
    <firstview
      title-en="Discussion"
      :title="title"
      description="様々な話題について座談会形式で議論した内容をお届けします。"
      background="/images/index/work_picture_2.jpg"
    />

    <breadcrumb :contents="breadcrumbContents" />

    <div class="contents-box">
      <article-index title="座談会の記事一覧" :contents="contents" />
    </div>

    <pagination
      base-path="/technology/discussion"
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

    const [discussionRef, { data: categoryData }] = await Promise.all([
      await $axios.get(
        `${process.env.apiEndpoint}discussion?_embed&page=${pageCurrent}`
      ),
      await $axios.get(`${process.env.apiEndpoint}categories?per_page=100`)
    ])

    const data = discussionRef.data

    return {
      contents: data.map((_data) => {
        return {
          link: `/technology/discussion/${_data.slug}/`,
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
      pageMax: parseInt(discussionRef.headers['x-wp-totalpages']),
    }
  },
  data() {
    return {
      title: '座談会',
      breadcrumbContents: [
        {
          title: 'ホーム',
          link: '/',
        },
        {
          title: 'シナプスの技術',
          link: '/technology/',
        },
        {
          title: '座談会',
          link: '/technology/discussion/',
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
    background-color: $color-gray-2;
  }

  :deep() {
    .firstview {
      &__description {
        padding: 0 8px;
      }
    }
  }
}

.contents-box {
  position: relative;
  max-width: $width-2;
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
    margin: 0 auto;
    padding: 32px 0;
    border: none;
  }
}
</style>
