<template>
  <div class="container">
    <firstview title-en="Thanks" :title="title" />

    <breadcrumb :contents="breadcrumbContents" />

    <background-layer>
      <div class="thanks-container">
        <div class="thanks-container__description-container">
          <p class="thanks-container__description">
            株式会社シナプスへお問い合わせいただき、誠にありがとうございます。<br />
            担当者より追ってご連絡いたしますので、しばらくご猶予をください。
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
          title: 'お問い合わせ',
          link: '/contact/',
        },
        {
          title: 'ありがとうございました',
          link: '/contact/thanks/',
        },
      ],
    }
  },
  head({ $config, $updateMeta, _route }) {
    return $updateMeta({
      title: $config.public.titleTemplate.replace(/%s/, 'ありがとうございました'),
      url: `${$config.public.url}${_route.path.slice(1)}`,
    })
  },
  mounted() {
    this.$fontReload()
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

    :deep(.breadcrumb) {
      top: 196px;
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
