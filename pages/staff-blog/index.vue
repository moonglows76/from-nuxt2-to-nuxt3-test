<template>
  <div class="container">
    <firstview
      title-en="Staff blog"
      :title="title"
      description="株式会社シナプス スタッフブログ"
      background="/images/staff-blog/firstview.jpg"
    />

    <breadcrumb :contents="breadcrumbContents" />

    <div class="contents-box">
      <article-index
        title="スタッフブログの記事一覧"
        subtitle="過去のスタッフ・ブログについては、「<a href='https://www.synapse.jp/station/' target='_blank'>シナプス・ステーションぶろぐ</a>」をご参照ください。"
        :contents="contents"
        :has-default-thumbnail="true"
      />

      <div class="contents-sidebar">
        <div class="contents-recent-container">
          <p class="contents-recent-container__title">最新の記事</p>
          <nuxt-link
            v-for="(content, index) in latestContents"
            :key="index"
            :to="content.link"
            class="contents-recent"
          >
            <div class="contents-recent__meta">
              <p v-if="content.category" class="contents-recent__category">
                {{ content.category }}
              </p>
              <p class="contents-recent__date">
                {{ content.date }}
              </p>
            </div>
            <p class="contents-recent__title">
              {{ content.title }}
            </p>
          </nuxt-link>
        </div>
      </div>
    </div>

    <pagination
      base-path="/staff-blog"
      :page-current="pageCurrent"
      :page-max="pageMax"
    />

    <other-links />
  </div>
</template>

<script>
// TODO refactoring with /blog
import moment from 'moment'
import firstview from '@/components/organisms/firstview'
import breadcrumb from '@/components/molecules/breadcrumb'
import otherLinks from '@/components/molecules/otherLinks'
import articleIndex from '@/components/organisms/articleIndex'
import pagination from '@/components/organisms/pagination'
import updateMeta from '@/plugins/updateMeta'
import variables from '@/variables'

export default {
  components: { firstview, breadcrumb, otherLinks, articleIndex, pagination },
  async asyncData({ $axios, route }) {
    const pageCurrent = parseInt(route.query.page) || 1
    const [
      staffBlogRes,
      { data: latestData },
      { data: categoryData }
    ] = await Promise.all([
      await $axios.get(
        `${process.env.apiEndpoint}staff_blog?_embed&page=${pageCurrent}`
      ),
      await $axios.get(
        `${process.env.apiEndpoint}staff_blog?_embed&per_page=5`
      ),
      await $axios.get(`${process.env.apiEndpoint}categories?per_page=100`)
    ])

    const data = staffBlogRes.data

    const getContent = (rowDatas) => {
      return rowDatas.map((_data) => {
        return {
          link: `/staff-blog/${_data.slug}/`,
          thumbnail: _data.acf?.thumbnail || null,
          title: _data.title.rendered.replace(/<br>/g, ''),
          date: moment(_data.date).format('YYYY.MM.DD'),
          category: _data.categories
            ? categoryData.find((category) => {
                return category.id === _data.categories[0]
              })?.name
            : '',
        }
      })
    }

    return {
      contents: getContent(data),
      latestContents: getContent(latestData),
      pageCurrent,
      pageMax: parseInt(staffBlogRes.headers['x-wp-totalpages']),
    }
  },
  data() {
    return {
      title: 'スタッフブログ',
      breadcrumbContents: [
        {
          title: 'ホーム',
          link: '/',
        },
        {
          title: 'スタッフブログ',
          link: '/staff-blog/',
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
    this.$store.commit('updateFirstviewColor', '#FFFFFF')
  },
  destroyed() {
    this.$store.commit('updateFirstviewColor', variables['color-black-1'])
  },
}
</script>

<style scoped lang="scss">
.container {
  min-width: $width-2;

  :deep(.breadcrumb) {
    top: 364px;
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
  min-height: 800px;
  margin: -64px auto 64px;
  border: 1px solid $color-gray-3;
  background-color: white;
}

.contents-sidebar {
  position: absolute;
  top: 100px;
  right: -22px;
  width: 380px;
  @include boxShadow;
}

.contents-profile {
  padding: 40px;
  color: white;
  background-color: $color-black-2;

  &__thumbnail-container {
    position: relative;
    width: 100px;
    height: 100px;
    margin: 0 auto;
    background-size: cover;
    background-position: center;
    border-radius: 50%;
    background-color: white;
    overflow: hidden;
  }

  &__thumbnail {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 120px;
    transform: translate(-50%, -50%);
  }

  &__name {
    margin-top: 20px;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
  }

  &__role {
    margin-top: 8px;
    text-align: center;
    font-weight: bold;
  }

  &__description {
    line-height: 2em;
    margin-top: 12px;
    font-size: 14px;
  }
}

.contents-recent-container {
  padding: 40px;
  background-color: $color-gray-2;

  &__title {
    position: relative;
    margin-bottom: 16px;
    font-size: 20px;
    font-weight: bold;

    &:after {
      position: absolute;
      bottom: -8px;
      left: 0;
      width: 16px;
      height: 1px;
      background-color: $color-gray-3;
      content: '';
    }
  }
}

.contents-recent {
  display: block;
  padding: 16px 0;

  &__meta {
    display: flex;
  }

  &__category {
    padding: 6px 16px;
    font-size: 12px;
    border: 1px solid $color-gray-3;
    background-color: white;
  }

  &__date {
    margin-top: 8px;
    margin-left: 16px;
    color: $color-gray-3;
    font-size: 12px;
  }

  &__title {
    line-height: 1.5em;
    margin-top: 8px;
    font-weight: bold;
  }
}

@include smartphone {
  .container {
    min-width: initial;

    :deep(.firstview) {
      padding-top: 120px;
      padding-bottom: 148px;
    }

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

  .contents-sidebar {
    position: relative;
    top: initial;
    right: initial;
    width: initial;
  }

  .contents-profile {
    display: flex;
    padding: 32px $padding-1;

    &__thumbnail-container {
      flex-shrink: 0;
      width: 80px;
      height: 80px;
    }

    &__thumbnail {
      width: 96px;
    }

    &__meta {
      padding-left: 16px;
    }

    &__name {
      margin-top: 0;
      font-size: 16px;
      text-align: initial;
    }

    &__role {
      margin-top: 8px;
      font-size: 14px;
      text-align: initial;
    }

    &__description {
      margin-top: 8px;
      font-size: 13px;
    }
  }

  .contents-recent-container {
    padding: 32px $padding-1;

    &__title {
      margin-bottom: 16px;
      font-size: 18px;
    }
  }

  .contents-recent {
    padding: 16px 0;

    &__category {
      padding: 4px 8px;
      font-size: 10px;
    }

    &__date {
      margin-top: 6px;
      margin-left: 12px;
      font-size: 10px;
    }

    &__title {
      margin-top: 8px;
    }
  }
}
</style>
