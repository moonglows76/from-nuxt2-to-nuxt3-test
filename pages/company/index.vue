<template>
  <div class="container">
    <firstview
      title-en="Company"
      :title="title"
      description="シナプスの企業情報を紹介します。"
    />

    <breadcrumb :contents="breadcrumbContents" />

    <background-layer>
      <tableTab ref="tab" base="company" :slug="slug" :tabs="tabs" />

      <div class="list-container">
        <p class="list-container__title">Company</p>

        <list :lists="lists" />

        <p v-if="caption" class="list-container__caption">
          {{ caption }}
        </p>

        <nuxt-link
          :to="`/company/#${nextLink.slug}`"
          class="list-container__link hover-opacity"
          @click.native="scrollToTab"
        >
          {{ nextLink.name }}はこちら
        </nuxt-link>
      </div>
    </background-layer>
    <other-links />
  </div>
</template>

<script>
import scroll from 'scroll'
import scrollDoc from 'scroll-doc'
import firstview from '@/components/organisms/firstview'
import breadcrumb from '@/components/molecules/breadcrumb'
import backgroundLayer from '@/components/atoms/backgroundLayer'
import list from '@/components/organisms/list'
import companyDatas from '@/assets/jsons/companyDatas'
import updateMeta from '@/plugins/updateMeta'
import otherLinks from '@/components/molecules/otherLinks'
import tableTab from '@/components/molecules/tableTab'

export default defineNuxtComponent({
  components: {
    firstview,
    breadcrumb,
    backgroundLayer,
    list,
    otherLinks,
    tableTab,
  },
  data() {
    return {
      title: '会社情報',
      slug: '',
      lists: [],
      caption: '',
      tabs: [
        {
          name: '会社概要',
          slug: 'outline',
        },
        {
          name: 'アクセス',
          slug: 'access',
        },
        {
          name: '沿革',
          slug: 'history',
        },
      ],
      breadcrumbContents: [
        {
          title: 'ホーム',
          link: '/',
        },
        {
          title: '会社概要',
          link: '/company/',
        },
      ],
    }
  },
  head({ $config, $updateMeta, _route }) {
    return $updateMeta({
      title: $config.public.titleTemplate.replace(/%s/, '会社情報'),
      url: `${$config.public.url}${_route.path.slice(1)}`,
    })
  },
  computed: {
    nextLink() {
      const nextIndex =
        (this.tabs.findIndex((tab) => {
          return tab.slug === this.slug
        }) +
          1) %
        this.tabs.length

      return this.tabs[nextIndex]
    },
  },
  watch: {
    '$route.hash'() {
      this.updateData()
    },
  },
  mounted() {
    this.$updateData
    this.$fontReload
  },
  methods: {
    scrollToTab() {
      scroll.top(
        scrollDoc(),
        this.$refs.tab.$el.getBoundingClientRect().top + window.pageYOffset,
        {
          duration: 500,
        }
      )
    },
    updateData() {
      this.slug = this.$route.hash?.slice(1) || companyDatas[0].name

      const companyData = companyDatas.find((companyData) => {
        return companyData.name === this.slug
      })
      // this.$set(this, 'lists', companyData?.values)
      this.lists = companyData?.values
      this.caption = companyData?.caption
    },
  },
})
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

  &__caption {
    padding-right: 64px;
    margin-top: 32px;
    text-align: right;
    font-size: 13px;
  }

  &__link {
    display: block;
    width: 210px;
    height: 56px;
    line-height: 56px;
    margin-top: 48px;
    margin-left: auto;
    text-align: center;
    font-weight: bold;
    font-size: 18px;
    border-bottom: solid 2px $color-black-1;
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

    &__title {
      display: none;
    }

    &__caption {
      margin-top: 20px;
      padding-right: 0;
      font-size: 11px;
    }

    &__link {
      width: 140px;
      height: 44px;
      line-height: 44px;
      margin-top: 24px;
      font-size: 16px;
    }
  }
}
</style>
