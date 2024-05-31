<template>
  <div class="container">
    <section class="firstview">
      <div class="firstview__background" />
      <p class="firstview__title-en">Feature</p>
      <label-animation class="firstview__title">
        {{ title }}
      </label-animation>
      <p class="firstview__description">
        シナプスは地域密着型のインターネットサービスプロバイダと<br
          class="only-pc"
        />して長年鹿児島のインターネット環境を支えています。
      </p>
    </section>

    <breadcrumb :contents="breadcrumbContents" />

    <div class="content-container">
      <div v-for="(content, index) in contents" :key="index" class="content">
        <p class="content__title-en">
          {{ `${`${index + 1}`.padStart(2, '0')} ${content.titleEn}` }}
        </p>

        <delayed-show
          class="content__title"
          modifier="no-transform"
          @start="showElem(`title-${index}`)"
        >
          <label-animation
            :has-fadein="false"
            :is-start="!!isShowElem[`title-${index}`]"
          >
            {{ content.title }}
          </label-animation>
        </delayed-show>

        <div class="content__link-container">
          <figure>
            <img
              v-for="(image, imageIndex) in content.images"
              :key="imageIndex"
              :src="image.src"
              class="content__image"
              :style="{
                width: `${
                  // $store.state.isSmartphone
                  $store.isSmartphone
                    ? image.widthSmartphone
                    : image.width
                }px`,
                top: `${
                  // $store.state.isSmartphone ? image.topSmartphone : image.top
                  $store.isSmartphone ? image.topSmartphone : image.top
                }px`,
                left: `${
                  // $store.state.isSmartphone ? image.leftSmartphone : image.left
                  $store.isSmartphone ? image.leftSmartphone : image.left
                }px`,
              }"
            />
          </figure>

          <div>
            <delayed-show
              v-for="(link, linkIndex) in content.links"
              :key="linkIndex"
              modifier="scale"
              :delay="0.2 * (linkIndex % 2)"
              class="content-link"
              @click="updateModalDescription(link.description)"
            >
              <p class="content-link__title" v-html="link.title" />
              <p class="content-link__link">詳しく見る</p>
            </delayed-show>
          </div>
        </div>
      </div> 
    </div>

    <other-links />

    <modal
      :description="modalDescription"
      @close="updateModalDescription(null)"
    />
  </div>
</template>

<script>
import breadcrumb from '@/components/molecules/breadcrumb'
import otherLinks from '@/components/molecules/otherLinks'
import labelAnimation from '@/components/atoms/labelAnimation'
import delayedShow from '@/components/atoms/delayedShow'
import modal from '@/components/organisms/modal'
import updateMeta from '@/plugins/updateMeta'

export default defineNuxtComponent({　
  components: { breadcrumb, otherLinks, labelAnimation, delayedShow, modal },
  data() {
    return {
      title: 'シナプスの特長',
      isShowElem: {},
      modalDescription: null,
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
          title: 'シナプスの特長',
          link: '/feature/',
        },
      ],
      contents: [
        {
          title: '高い技術力',
          titleEn: 'Technology',
          links: [
            {
              title: '自社サービス開発／運用の豊富な経験',
              description: `シナプスは1995年から、南九州初のインターネットサービスプロバイダとして、鹿児島の皆さまにインターネットサービスをお届けしています。<br>
「鹿児島の皆さんに必要なサービスは何か？」をいつも問い続け、自らサービスを企画・開発し、そして安定した運用とご利用支援に至るまで責任を持ってサービスをご提供します。自ら創り出したサービスでお客様が笑顔になるその瞬間が、私たちにとっての大きなやりがいです。`,
            },
            {
              title: 'インフラ技術からその上流まで見通せる幅広い技術',
              description: `シナプスには、すべてを自社でやろう！という文化があります。<br>
そのためには、幅広い技術とインフラを持っていることが必須の条件となります。それぞれの専門スタッフが、常に新しいトレンドを意識し習得しながら、ネットワーク/サーバ運用、システム構築、Webサイト制作などに日々奮闘しています。`,
            },
            {
              title: '安心・安全のインターネット利用を支えるサポート力',
              description: `シナプスでは、お客様と電話で応対する「サポートセンター」、直接窓口で相談できる「シナプス・ステーション」の2本柱のサポート体制でお客様のインターネット・ライフを支えています。<br>
難しい技術用語を、親しみのある「鹿児島弁」に変換して、お客様の悩みを解決します。`,
            },
          ],
          images: [
            {
              src: '/images/illust/internet.png',
              width: 320,
              widthSmartphone: 150,
              top: 160,
              topSmartphone: 80,
              left: 250,
              leftSmartphone: 200,
            },
            {
              src: '/images/illust/communication.png',
              width: 400,
              widthSmartphone: 180,
              top: 280,
              topSmartphone: 100,
              left: 560,
              leftSmartphone: 20,
            },
            {
              src: '/images/illust/support.png',
              width: 320,
              widthSmartphone: 120,
              top: 20,
              topSmartphone: 30,
              left: 20,
              leftSmartphone: 20,
            },
          ],
        },
        {
          title: '地域との強固な連携',
          titleEn: 'Community',
          links: [
            {
              title: '積極的な地域への貢献',
              description: `1995年に地域密着型インターネットサービスプロバイダとして産声をあげて以来、鹿児島県内で開催されるイベントなどに、積極的にネットの接続環境を提供してきました。「鹿児島ラーメン王決定戦」「かごしまマラソン」など、地域の様々なイベントをネットワーク技術で支援しています。<br>
また、接続環境の提供だけでなく、お祭りや花火大会のお手伝い、パソコン相談会や学校でのセキュリティセミナーなど、小規模な地域のイベントにも技術サポートとして参加し、幅広く地域社会に貢献しています。`,
            },
            {
              title: 'シナプスパートナーとの連携',
              description: `地域に根ざし地域密着志向を共有する鹿児島県内の企業と連携し、県本土はもちろん離島まで網羅する、シナプス取扱店／シナプスパートナーの緻密なネットワークを構築しています。<br>
お客様のお困りごとの解決のため、お客様と同じ地元の、顔の見えるシナプスパートナーが全力で支援します。`,
            },
            {
              title: '地元エンジニアとの連携',
              description: `シナプスは、今後の鹿児島の発展にICT（情報通信技術）は不可欠で、そのICTを自在に駆使するエンジニアとの連携が重要だと考えています。地元のエンジニアの方々とお互いに補完し高め合うことを目指し、その一環として、鹿児島に在住する個人や企業で働くエンジニアとの協業や、技術力向上のための勉強会「q-Tech」の運営を行っています。`,
            },
            {
              title: 'クリエイターコミュニティへの参画',
              description: `鹿児島県内外のエンジニアが集まる大規模イベント「さくらじまハウス」への協力、WordPressの公式ユーザグループ「Kagoshima WordPress Meetup」の支援など、クリエイターコミュニティーに積極に関わり、鹿児島のICT業界を盛り上げています。<br>
シナプスは、鹿児島を愛するクリエイターコミュニティの活性化は、鹿児島そのものの活力アップにつながると考えています。`,
            },
            {
              title:
                '鹿児島市のクリエイティブ産業創出拠点施設「マークメイザン」への協力',
              description: `鹿児島市にある「マークメイザン」は鹿児島のクリエイティブ産業を支援する施設です。シナプスは、鹿児島の次代を担う人や企業の創出を少しでも支援できればとの想いから、クリエイティブ産業と技術の連携を支援し、人材育成・事業拡大や経営基盤強化のため、様々なサポートを行っています。`,
            },
          ],
          images: [
            {
              src: '/images/illust/communication_2.png',
              width: 300,
              widthSmartphone: 200,
              top: 500,
              topSmartphone: 0,
              left: 600,
              leftSmartphone: -60,
            },
            {
              src: '/images/illust/support_2.png',
              width: 400,
              widthSmartphone: 200,
              top: 500,
              topSmartphone: 70,
              left: 900,
              leftSmartphone: 120,
            },
          ],
        },
        {
          title: '働きやすい環境づくり',
          titleEn: 'Environment',
          links: [
            {
              title: '子育て応援',
              description: `従業員の仕事と子育ての両立支援に積極的に取り組む「かごしま子育て応援企業」として、シナプスも鹿児島県から認定されています。<br>
またシナプス・ステーションは、子供を犯罪被害から守る避難所「子ども110番の家」の役割も果たしています。`,
            },
            {
              title: '働き方改革',
              description:
                'シナプスの考える「働き方改革」は、働きやすさと働きがいの向上です。まだまだ不十分ですが、有休取得促進やテレワーク活用のほか、多様な個性を持つスタッフが、高い生産性を持ちつつ柔軟な働き方ができるよう環境整備を行っています。',
            },
            {
              title: '人材育成',
              description: `シナプスでは、スタッフそれぞれの知識・能力にあわせた研修カリキュラムを策定し、教育を行っています。また、メンター制度を導入し、新しいスタッフが不安や悩みを抱えることなく業務に必要な技術を身につけ、早く職場に慣れるための環境を構築しています。`,
            },
          ],
          images: [
            {
              src: '/images/illust/since_1995.png',
              width: 700,
              widthSmartphone: 300,
              top: 75,
              topSmartphone: -20,
              left: -140,
              leftSmartphone: 20,
            },
            {
              src: '/images/illust/meeting.png',
              width: 380,
              widthSmartphone: 100,
              top: 700,
              topSmartphone: 140,
              left: 360,
              leftSmartphone: 140,
            },
          ],
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
  methods: {
    showElem(key) {
      // this.$set(this.isShowElem, key, true)
      this.isShowElem = true;
    },
    stopPropagation($event) {
      $event.stopPropagation()
    },
    updateModalDescription(description) {
      this.modalDescription = description
    },
  },
})
</script>

<style scoped lang="scss">
.container {
  min-width: $width-2;

  :deep(.breadcrumb) {
    top: 600px;
    background-color: $color-gray-2;
  }
}

@keyframes background-scale {
  from {
    transform: scale(1.2);
  }
  to {
    transform: scale(1);
  }
}

.firstview {
  position: relative;
  height: 690px;
  padding-top: 240px;
  box-sizing: border-box;
  overflow: hidden;

  &__background {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-size: cover;
    background-position: center;
    background-image: url('/images/job/picture_3.jpg');
    animation: background-scale 8s;
  }

  &__title-en {
    position: relative;
    @include fontTsuku;
    font-size: 20px;
    color: $color-gray-1;
    text-align: center;
  }

  &__title {
    position: relative;
    margin-top: 20px;
    margin-left: 50%;
    @include fontTsuku;
    font-size: 44px;
    font-weight: bold;
    letter-spacing: 0.1em;
    text-shadow: 0 0 2px white;
    transform: translateX(-170px);
  }

  &__description {
    position: relative;
    line-height: 2em;
    margin-top: 32px;
    @include fontTsuku;
    font-size: 20px;
    text-shadow: 0 0 2px white;
    text-align: center;
  }
}

.content-container {
  padding-top: 210px;
  overflow: hidden;
}

.content {
  max-width: $width-2;
  margin: 0 auto;
  padding-bottom: 150px;

  &__image {
    position: absolute;
  }

  &__title-en {
    font-size: 22px;
    @include fontTsuku;
    color: $color-gray-1;
  }

  &__title {
    margin-top: 16px;
    font-size: 52px;
    @include fontTsuku;
    letter-spacing: 0.1em;
  }

  &__link-container {
    position: relative;
    width: 1140px;
    height: 960px;
    margin: 72px 0 0 140px;
    background-color: $color-gray-2;
  }

  &:nth-child(odd) {
    .content-link {
      &:nth-child(1) {
        top: 70px;
        left: 580px;
        border-bottom-left-radius: 0;
      }

      &:nth-child(2) {
        top: 530px;
        left: -80px;
        border-top-right-radius: 0;
      }

      &:nth-child(3) {
        top: 530px;
        left: 580px;
        border-top-left-radius: 0;
      }
    }
  }

  &:nth-child(even) {
    .content__title-en,
    .content__title {
      margin-left: 50%;
    }

    .content__link-container {
      height: 720px;
      margin: 56px 0 0 -90px;
    }

    .content-link {
      &:nth-child(1) {
        top: 40px;
        left: 150px;
        border-bottom-right-radius: 0;
      }

      &:nth-child(2) {
        top: 40px;
        left: 750px;
        border-bottom-left-radius: 0;
      }

      &:nth-child(3) {
        top: 290px;
        left: 150px;
        border-top-right-radius: 0;
      }

      &:nth-child(4) {
        top: 290px;
        left: 750px;
        border-top-left-radius: 0;
      }

      &:nth-child(5) {
        top: 540px;
        left: 150px;
        border-top-right-radius: 0;
      }
    }
  }
}

.content-link {
  position: absolute;
  display: block;
  width: 480px;
  padding: 24px 36px 80px 36px;
  background-color: white;
  box-sizing: border-box;
  border-radius: 32px;
  overflow: hidden;
  @include boxShadow;
  cursor: pointer;

  @include hover {
    .content-link__link {
      opacity: 0.5;
    }
  }

  &__title {
    line-height: 1.5em;
    font-size: 32px;
    font-weight: bold;
  }

  &__link {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 56px;
    line-height: 56px;
    color: white;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    background-color: $color-black-1;
    transition: opacity 0.5s;

    &:before {
      font-family: 'Font Awesome 5 Pro';
      content: '\f067';
    }
  }
}

@include smartphone {
  .container {
    min-width: initial;

    :deep(.breadcrumb) {
      right: 30px;
      top: 356px;
    }
  }

  .firstview {
    height: 418px;
    padding-top: 190px;

    &__title-en {
      position: absolute;
      top: 222px;
      right: 0;
      left: 0;
      font-size: 11px;
    }

    &__title {
      margin-top: initial;
      font-size: 24px;
      transform: translateX(-96px);
    }

    &__description {
      margin-top: 40px;
      padding: 0 $padding-1;
      font-size: 14px;
      text-align: initial;
    }
  }

  .content-container {
    padding-top: 56px;
  }

  .content {
    padding-bottom: 40px;

    &__title-en {
      padding-left: $padding-1;
      font-size: 12px;
    }

    &__title {
      position: relative;
      padding-left: $padding-1;
      margin-top: 4px;
      font-size: 30px;
      z-index: 1;
    }

    &__link-container {
      width: calc(100% - 40px);
      height: 560px;
      margin: -16px 0 72px;
      padding: 210px 0 1px 40px;
      box-sizing: border-box;
    }

    &:nth-child(odd) {
      .content-link {
        &:nth-child(1),
        &:nth-child(2),
        &:nth-child(3) {
          top: initial;
          left: initial;
          border-top-right-radius: 16px;
          border-bottom-left-radius: 16px;
        }
      }
    }

    &:nth-child(even) {
      .content__title-en,
      .content__title {
        margin-left: initial;
      }

      .content__link-container {
        height: initial;
        padding-left: 0;
        margin: -16px 0 72px auto;
      }

      .content-link {
        &:nth-child(1),
        &:nth-child(2),
        &:nth-child(3),
        &:nth-child(4),
        &:nth-child(5) {
          top: initial;
          left: initial;
          margin-left: -20px;
          border-top-right-radius: 16px;
          border-bottom-right-radius: 16px;
          border-bottom-left-radius: 16px;
        }
      }
    }
  }

  .content-link {
    position: relative;
    width: 316px;
    padding: 16px 20px 48px 20px;
    margin: 20px 0;
    border-radius: 16px;
    border-top-left-radius: 0;

    &__title {
      font-size: 16px;
    }

    &__link {
      height: 40px;
      line-height: 40px;
      font-size: 14px;
    }
  }
}
</style>
