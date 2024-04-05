<template>
  <div class="container">
    <firstview
      title-en="Recruit"
      :title="title"
      description="シナプスの求人に関する情報です"
    />

    <breadcrumb :contents="breadcrumbContents" />

    <background-layer>
      <tableTab base="work/recruit" :slug="slug" :tabs="tabs" />

      <div class="list-container">
        <p class="list-container__title">Recruit</p>

        <div v-if="tabs.length === 0" class="list-container__pending-container">
          <p class="list-container__pending">
            シナプスでは現在、採用募集を行っておりません。<br />
            募集を開始する際はこちらのページでお知らせいたしますので、今しばらくお待ちください。
          </p>
          <common-button title="シナプスの仕事をもっと知る" link="/work/job/" />
        </div>
        <template v-else>
          <list :lists="lists" />
          <common-button title="エントリーはこちら" link="/work/entry/" />
        </template>
      </div>
    </background-layer>
    <other-links />
  </div>
</template>

<script>
import firstview from '@/components/organisms/firstview'
import breadcrumb from '@/components/molecules/breadcrumb'
import backgroundLayer from '@/components/atoms/backgroundLayer'
import list from '@/components/organisms/list'
import commonButton from '@/components/atoms/commonButton'
import updateMeta from '@/plugins/updateMeta'
import otherLinks from '@/components/molecules/otherLinks'
import tableTab from '@/components/molecules/tableTab'

export default {
  components: {
    firstview,
    breadcrumb,
    backgroundLayer,
    list,
    commonButton,
    otherLinks,
    tableTab,
  },
  async asyncData({ $axios, route, params }) {
    const isPreview = !!(route.query?.preview && process.env.wpAccessToken)
    const options = isPreview
      ? {
          headers: {
            Authorization: `Bearer ${process.env.wpAccessToken}`,
          },
        }
      : {}

    const { data } = await $axios.get(
      `${process.env.apiEndpoint}recruit?_embed${
        isPreview
          ? '&status=future,draft,pending,private,trash,inherit,publish'
          : ''
      }`,
      options
    )

    // change to newest version using revisions
    await Promise.all(
      data.map(async (_data) => {
        if (isPreview && _data?.status === 'publish') {
          const { data: revisionData } = await $axios.get(
            `${process.env.apiEndpoint}recruit/${_data?.id}/revisions?_embed`,
            options
          )

          if (revisionData?.[0]) {
            _data = Object.assign(_data, revisionData[0])
          }
        }
      })
    )

    return {
      datas: data.map((_data) => {
        return {
          name: _data.title?.rendered,
          slug: _data.slug,
          values: _data.acf?.applicationRequirements?.body?.map?.((body) => {
            return {
              key: body[0]?.c,
              value: body[1]?.c?.replace(/\n/g, '<br>'),
            }
          }),
        }
      }),
      tabs: data.map((_data) => {
        return {
          name: _data.title?.rendered,
          slug: _data.slug,
        }
      }),
    }
  },
  data() {
    return {
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
          title: '採用情報',
          link: '/work/recruit/',
        },
      ],
      title: '募集要項',
      slug: '',
      lists: [],
    }
  },
  head() {
    return updateMeta({
      title: process.env.titleTemplate.replace(/%s/, this.title),
      url: `${process.env.url}${this.$route.path.slice(1)}`,
    })
  },
  watch: {
    '$route.hash'() {
      this.updateData()
    },
  },
  mounted() {
    this.updateData()
    this.fontReload()
  },
  methods: {
    updateData() {
      this.slug = this.$route.hash?.slice(1) || this.datas[0]?.slug

      const data = this.datas.find((_data) => {
        return _data.slug === this.slug
      })
      this.$set(this, 'lists', data?.values)
    },
  },
}
</script>

<style scoped lang="scss">
.container {
  :deep(.breadcrumb) {
    top: 360px;
  }

  :deep(.background-layer) {
    margin-top: -64px;
    padding: 120px 0;
  }
}

.list-container {
  position: relative;
  max-width: $width-2;
  margin: 0 auto;
  padding: 120px 0 64px;
  background-color: white;
  overflow: hidden;

  &__pending-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 96px;
  }

  &__pending {
    line-height: 2em;
    padding-bottom: 48px;
  }

  &__title {
    position: absolute;
    top: 56px;
    left: 120px;
    color: $color-gray-1;
    @include fontTsuku;
    font-size: 22px;
    transform-origin: left top;
    transform: rotate(90deg);
  }

  :deep(.common-button) {
    width: 560px;
    margin: 56px auto;
  }
}

@include smartphone {
  .container {
    :deep(.background-layer) {
      margin-top: 0;
      padding: 40px $padding-1;
    }

    :deep(.breadcrumb) {
      top: 196px;
    }
  }

  .list-container {
    padding: 40px $padding-1;

    &__pending-container {
      padding: 0;
    }

    &__pending {
      padding: 0 20px 20px;
    }

    &__title {
      display: none;
    }

    :deep(.common-button) {
      width: initial;
      margin: 0 auto;
      padding: 8px 0;
      font-size: 13px;
    }
  }
}
</style>
