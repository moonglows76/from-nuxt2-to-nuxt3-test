<template>
  <div class="container">
    <firstview
      title-en="Service"
      :title="title"
      description="シナプスが提供しているサービスをご紹介します。"
    />

    <breadcrumb :contents="breadcrumbContents" />

    <background-layer class="container__service-container">
      <div class="service-container">
        <div v-for="(service, index) in services" :key="index" class="service">
          <p class="service__title">
            {{ service.title }}
          </p>
          <p class="service__description">
            {{ service.description }}
          </p>

          <div class="service__href-container">
            <a
              v-for="(link, linkIndex) in service.links"
              :key="linkIndex"
              :href="link.link"
              class="service__href hover-opacity"
              target="_blank"
            >
              {{ link.title }}
            </a>
          </div>
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
import updateMeta from '@/plugins/updateMeta'
import otherLinks from '@/components/molecules/otherLinks'

export default defineNuxtComponent({
  components: { firstview, breadcrumb, backgroundLayer, otherLinks },
  data() {
    return {
      title: 'サービス紹介',
      services: [
        {
          links: [
            {
              title: 'シナプスのネットワークマップ',
              link: 'https://www.synapse.jp/support/network/map.html',
            },
          ],
          title: 'インターネットサービス',
          description:
            '鹿児島県内で最高のスピードと安定した品質の「インターネット接続サービス」を提供するため、バックボーンネットワークを鹿児島〜東京間で構成し多重化して接続しています。また私たちは、インターネット上の様々なサービスの動向の把握と、トラフィック量や遅延の変化を監視し、常に安定した最適なネットワークとなるよう、設計・構築・運用を行っています。',
        },
        {
          links: [
            {
              title: '大容量ホスティングサービス「ホスティング・プラス」',
              link: 'https://www.synapse.jp/org/hosting-plus/index.html',
            },
          ],
          title: 'サーバ／インフラ環境構築',
          description:
            'お客様の多様なニーズに応え、サービスを快適にご利用いただくためのインフラ環境を設計・構築します。自社ビル内のデータセンターには24時間即応できる体制を設け、サービスの安定供給に努めています。',
        },
        {
          links: [
            {
              title: '安心・安全サービス',
              link: 'https://www.synapse.jp/service/safety/',
            },
            {
              title: '鹿児島県内のシナプス取扱店一覧',
              link: 'https://www.synapse.jp/menu/agent/',
            },
          ],
          title: '安全安心サービス',
          description:
            'シナプスの窓口店舗「シナプス・ステーション」と県内すみずみに拡がるシナプスパートナーによって、安心・安全なインターネットサービスのご利用をサポートします。「インターネットで、鹿児島の毎日を笑顔にしたい」というミッションのため、お客様とのフェイスツーフェイスのコミュニケーションで信頼関係を形成していきます。',
        },
        {
          links: [
            {
              title: '会員サポート',
              link: 'https://www.synapse.jp/support/',
            },
            {
              title: 'なんでんサポートパック',
              link: 'https://www.synapse.jp/support/nanden/',
            },
          ],
          title: '会員サポート',
          description:
            '「シナプスへ相談してよかった」という声をいただけることが私たちの喜びです。そのためお客様の困りごとを正確に把握すること、最適な回答につながる知識を備えること、お客様へ寄り添うことの3点を日々心がけて対応しています。',
        },
      ],
      breadcrumbContents: [
        {
          title: 'ホーム',
          link: '/',
        },
        {
          title: 'シナプスについて',
          link: '/about/',
        },
        {
          title: 'サービス紹介',
          link: '/service/',
        },
      ],
    }
  },
  head({ $config, $updateMeta, _route }) {
    return $updateMeta({
      title: $config.public.titleTemplate.replace(/%s/, 'サービス紹介'),
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
    top: 354px;
  }

  :deep(.background-layer) {
    position: relative;
    margin-top: -64px;
    padding: 80px 0;
  }
}

.service-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 128px 120px 24px;
  background-color: white;
}

.service {
  padding: 0 16px 64px;

  &__thumbnail {
    height: 320px;
    background-size: cover;
    background-position: center;
    background-color: $color-gray-1;
  }

  &__title {
    margin-top: 16px;
    font-size: 24px;
    font-weight: bold;
  }

  &__description {
    line-height: 2em;
    margin-top: 20px;
  }

  &__href-container {
    margin-top: 36px;
  }

  &__href {
    display: block;
    line-height: 1.8em;
    margin: 8px 0;
    text-decoration: underline;

    &:after {
      display: inline-block;
      width: 24px;
      height: 24px;
      margin-left: 8px;
      background-image: url('/images/illust/external_link.png');
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      vertical-align: middle;
      transform: translateY(-2px);
      content: '';
    }
  }
}

@include smartphone {
  .container {
    :deep(.background-layer) {
      margin-top: initial;
      padding: 40px $padding-1;
    }

    :deep(.breadcrumb) {
      top: 196px;
    }
  }

  .service-container {
    display: block;
    padding: 32px $padding-1;
  }

  .service {
    width: initial;
    padding-bottom: 32px;

    &__thumbnail {
      height: 210px;
    }

    &__title {
      margin-top: 20px;
      font-size: 16px;
    }

    &__description {
      margin-top: 10px;
      font-size: 14px;
    }

    &__href {
      font-size: 14px;

      &:after {
        width: 20px;
        height: 20px;
      }
    }
  }
}
</style>
