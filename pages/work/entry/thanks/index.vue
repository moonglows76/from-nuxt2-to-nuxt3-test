<template>
  <div class="container">
    <firstview title-en="Thanks" :title="title" />

    <breadcrumb :contents="breadcrumbContents" />

    <background-layer>
      <div class="thanks-container">
        <div class="thanks-container__description-container">
          <p class="thanks-container__description">
            株式会社シナプスにご応募いただき、誠にありがとうございます。<br />
            人事担当者より追ってご連絡いたしますので、しばらくご猶予をください。
          </p>
          <common-button title="ホームへもどる" link="/" />
        </div>
      </div>
    </background-layer>
    <other-links />
  </div>
</template>

<script>
import firstview from '@/components/organisms/firstview'
import breadcrumb from '@/components/molecules/breadcrumb'
import backgroundLayer from '@/components/atoms/backgroundLayer'
import commonButton from '@/components/atoms/commonButton'
import updateMeta from '@/plugins/updateMeta'
import otherLinks from '@/components/molecules/otherLinks'

export default defineNuxtComponent({
  components: {
    firstview,
    breadcrumb,
    backgroundLayer,
    commonButton,
    otherLinks,
  },
  data() {
    return {
      title: 'ありがとうございました',
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
          title: '採用エントリー',
          link: '/work/entry/',
        },
        {
          title: 'ありがとうございました',
          link: '/work/entry/thanks/',
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
  :deep(.breadcrumb) {
    top: 314px;
  }

  :deep(.background-layer) {
    margin-top: -64px;
    padding: 120px 0;
  }
}

.thanks-container {
  position: relative;
  max-width: $width-2;
  margin: 0 auto;
  padding: 120px 0 64px;
  background-color: white;

  &__description-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 96px;
  }

  &__description {
    line-height: 2em;
    padding-bottom: 48px;
    text-align: center;
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

    :deep() {
      .breadcrumb {
        top: 196px;
        &__content {
          &:nth-child(3) {
            .breadcrumb__dot {
              display: none;
            }
          }
        }
      }
    }
  }

  .thanks-container {
    padding: 40px $padding-1;

    &__description-container {
      padding: 0;
    }

    &__description {
      padding: 0 20px 20px;
      font-size: 15px;
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
