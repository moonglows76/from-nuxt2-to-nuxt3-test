<template>
  <div class="container">
    <section class="firstview">
      <div class="firstview__picture-container">
        <div
          v-for="(firstviewPicture, index) in firstviewPictures"
          v-show="!($store.state.isSmartphone && firstviewPicture.onlyPc)"
          ref="firstview-picture"
          :key="index"
          :style="{
            backgroundImage: `url(${firstviewPicture.src})`,
            marginLeft: `${
              firstviewPicture.x * ($store.state.isSmartphone ? 0.25 : 1)
            }px`,
            marginTop: `${
              firstviewPicture.y * ($store.state.isSmartphone ? 0.5 : 1)
            }px`,
            width: `${
              firstviewPicture.width * ($store.state.isSmartphone ? 0.35 : 1)
            }px`,
            height: `${
              firstviewPicture.height * ($store.state.isSmartphone ? 0.35 : 1)
            }px`,
          }"
          class="firstview-picture"
        />
      </div>

      <div class="firstview__illust-container">
        <img
          v-for="(firstviewIllust, index) in firstviewIllusts"
          v-show="!($store.state.isSmartphone && firstviewIllust.onlyPc)"
          ref="firstview-illust"
          :key="index"
          :src="firstviewIllust.src"
          :style="{
            marginLeft: `${
              firstviewIllust.x * ($store.state.isSmartphone ? 0.35 : 1)
            }px`,
            marginTop: `${
              firstviewIllust.y * ($store.state.isSmartphone ? 0.4 : 1)
            }px`,
            width: `${
              firstviewIllust.width * ($store.state.isSmartphone ? 0.35 : 1)
            }px`,
          }"
          class="firstview-illust"
        />
      </div>

      <p class="firstview__title-en">Jobs</p>
      <h1 class="firstview__title">
        {{ title }}
      </h1>
      <p class="firstview__description">
        シナプスの仕事について、<br />
        それぞれのカテゴリと各職種に分けて詳しくご紹介します。
      </p>

      <breadcrumb :contents="breadcrumbContents" />
    </section>

    <div class="outline-container">
      <p class="outline-container__title-en">Outline</p>
      <p class="outline-container__title">職種の全体像</p>

      <div class="outline-container__box">
        <delayed-show
          v-for="(outline, index) in outlines"
          :key="index"
          :delay="$store.state.isSmartphone ? 0 : 0.2 * index"
          class="outline"
          @click="goWork(index)"
        >
          <div class="outline__box">
            <div
              :style="`background-image: url(${outline.picture})`"
              class="outline__picture"
            />
            <p class="outline__title">
              {{ outline.title }}
            </p>
            <ul class="outline__list-container">
              <li
                v-for="(list, listIndex) in outline.lists"
                :key="listIndex"
                class="outline__list"
              >
                {{ list }}
              </li>
            </ul>
          </div>
        </delayed-show>
      </div>
    </div>

    <div class="work-container">
      <div v-for="(work, index) in works" :key="index" ref="work" class="work">
        <div
          class="work__firstview"
          :style="`background-image: url(${work.picture})`"
        >
          <div class="work__catchcopy-container">
            <delayed-show
              v-for="(catchcopy, catchcopyIndex) in work.catchcopies"
              :key="catchcopyIndex"
              @start="showElem(`catchcopy-${index}`)"
            >
              <label-animation
                :is-start="!!isShowElem[`catchcopy-${index}`]"
                class="work__catchcopy"
              >
                {{ catchcopy }}
              </label-animation>
              <br />
            </delayed-show>
          </div>
          <p class="work__title">
            {{ work.title }}
          </p>
          <p class="work__description">
            {{ work.description }}
          </p>
        </div>

        <div class="work__job-container">
          <delayed-show
            v-for="(job, jobIndex) in work.jobs"
            :key="jobIndex"
            :delay="$store.state.isSmartphone ? 0 : 0.2 * (jobIndex % 2)"
            class="work-job"
          >
            <p class="work-job__title">
              {{ job.title }}
            </p>
            <p class="work-job__description" v-html="job.description" />
            <common-button
              v-if="job.link"
              :link="job.link"
              title="この職種の社員を見る"
            />
          </delayed-show>
        </div>
      </div>
    </div>

    <other-links />
  </div>
</template>

<script>
import { gsap } from 'gsap'
import scroll from 'scroll'
import scrollDoc from 'scroll-doc'
import breadcrumb from '@/components/molecules/breadcrumb'
import commonButton from '@/components/atoms/commonButton'
import otherLinks from '@/components/molecules/otherLinks'
import delayedShow from '@/components/atoms/delayedShow'
import labelAnimation from '@/components/atoms/labelAnimation'
import updateMeta from '@/plugins/updateMeta'

export default {
  components: {
    breadcrumb,
    commonButton,
    otherLinks,
    delayedShow,
    labelAnimation,
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
          title: '職種紹介',
          link: '/work/job/',
        },
      ],
      title: '職種紹介',
      isShowElem: {},
      timelines: [],
      firstviewIllusts: [
        {
          src: '/images/illust/communication_2.png',
          y: -460,
          x: -170,
          width: 230,
        },
        {
          src: '/images/illust/support_2.png',
          y: -250,
          x: -280,
          width: 230,
        },
        {
          src: '/images/illust/takeuchi.png',
          y: 60,
          x: 430,
          width: 100,
        },
        {
          src: '/images/illust/meeting.png',
          y: -500,
          x: 400,
          width: 160,
        },
        {
          src: '/images/illust/internet.png',
          y: 270,
          x: -300,
          width: 170,
        },
        {
          src: '/images/illust/communication.png',
          y: 420,
          x: 30,
          width: 200,
        },
      ],
      firstviewPictures: [
        {
          src: '/images/about/picture_2.jpg',
          y: -420,
          x: -500,
          width: 320,
          height: 240,
        },
        {
          src: '/images/about/picture_4.jpg',
          y: -300,
          x: 300,
          width: 400,
          height: 400,
        },

        {
          src: '/images/index/work_picture_1.jpg',
          y: 0,
          x: -400,
          width: 270,
          height: 380,
        },
        {
          src: '/images/index/work_picture_2.jpg',
          y: 100,
          x: 140,
          width: 380,
          height: 270,
        },
        {
          src: '/images/technology/picture_2.jpg',
          y: 300,
          x: 460,
          width: 380,
          height: 320,
        },
        {
          src: '/images/job/picture_3.jpg',
          y: 420,
          x: -550,
          width: 380,
          height: 250,
        },
        {
          onlyPc: true,
          src: '/images/job/picture_2.jpg',
          y: -450,
          x: 750,
          width: 380,
          height: 320,
        },
      ],
      outlines: [
        {
          title: '技術職',
          picture: '/images/illust/internet.png',
          lists: [
            'ネットワークエンジニア',
            'サーバエンジニア',
            'システムエンジニア',
            'フロントエンドエンジニア',
            'Webディレクター',
          ],
        },
        {
          title: 'お客様対応',
          picture: '/images/illust/communication.png',
          lists: ['カスタマーサポート', '窓口対応（シナプス・ステーション）'],
        },
        {
          title: '広報・企画',
          picture: '/images/illust/meeting.png',
          lists: ['サービス企画', '広報（広報/販促/営業）'],
        },
      ],
      works: [
        {
          picture: '/images/index/work_picture_1.jpg',
          catchcopies: [
            'ネットワークインフラからフロントエンドまで、',
            '幅広い技術が持ち味。',
          ],
          title: '技術職',
          description:
            'シナプスはインターネットサービスプロバイダとして、ネットワークインフラからWebのフロントエンドまで、ICT領域で一貫した技術を持っています。鹿児島の持続的発展に必要不可欠なICTの力。そのICTの分野で高い専門性と豊富な経験を持つスペシャリストたちは、皆さまに安心してご利用いただけるインターネット環境のご提供を通じて、鹿児島の未来に貢献しています。',
          jobs: [
            {
              title: 'ネットワークエンジニア',
              description: `ネットワークの設計や構築、保守を行います。自社、お客様に提供するネットワーク、イベント会場のWi-Fiを設計/構築を行います。<br>
                安定したインターネットサービスの提供のため、通信障害が発生していないか、通信環境で改善できる点がないかなど、日々メンテナンスを行っています。`,
              link: '/work/staff/katsuyuki-sueyoshi/',
            },
            {
              title: 'サーバエンジニア',
              description: `主に自社サービスで使用するサーバ／インフラの運用、構築を行います。自社で利用する分だけではなく、お客様からオーダーを受けて構築を行うこともあります。<br>
              他部署からの依頼で設定や仕様変更を行うことも多いのですが、依頼に対して受け身になるだけではなく、セキュリティやユーザビリティを向上させるための提案も行います。<br>
              また、技術トレンドの流行り廃りが激しい職種であるため、セミナーやイベントには積極的に参加し、常に新しい技術を取り入れるよう心掛けています。`,
            },
            {
              title: 'システムエンジニア',
              description: `シナプスがお客様にサービスを提供する上で必要な社内外向けのシステムの設計や構築、日々の保守、運用を行います。<br>
              その他、社内向け各種サービスの提供（IP-PBX、アンチウイルス、グループウェア、ドキュメント共有など）、システムをより良くしていくための改善活動、システム提供をするためのサーバの設計や構築、保守、運用、社内開発環境の整備など多岐に渡る業務を行っています。<br>
              新しい技術を学び、そこから自社にどのように活用できるかを検討し、提案することも重要な業務のひとつです。`,
              link: '/work/staff/masayuki-kuratubo/',
            },
            {
              title: 'フロントエンドエンジニア',
              description: `Webサイトの制作、運用を行います。普段はシステムエンジニアと連携しながら修正対応やサイトの立ち上げなど行っています。<br>
              HTML5やCSS3、Sass等を標準技術として採用し、WordPressでのサイト構築も行っています。<br>
              様々なデバイスからの利用者に"正しい情報を分かりやすく"伝えることが目標です。`,
              link: '/work/staff/saori-tabata/',
            },
            {
              title: 'Webディレクター',
              description: `自社で運用するWebサイトやアプリケーション開発の指揮をとります。<br>
              サービス紹介サイト、会員向けコントロールパネルなど、それぞれの目的を達成するための導線やユーザ・インターフェースを設計し、要件に合った技術を選別します。<br>
              開発の過程では、企画部署と開発部署、デザイナーとエンジニア、自社開発者と開発パートナー間の橋渡し的役割も担いながら、それぞれの担当者と議論し、品質を高めていきます。`,
            },
          ],
        },
        {
          picture: '/images/job/picture_2.jpg',
          catchcopies: [
            'お客様の「不便」にワンストップで対応、',
            '鹿児島弁もお任せ！',
          ],
          title: 'お客様対応',
          description: `シナプスでは、お客様と電話で応対する「サポートセンター」、直接窓口で相談できる「シナプス・ステーション」の2本柱のサポート体制を整えています。インターネットやスマホのご利用において、どんな些細な不便や不安も解決し、お客様の快適なインターネットライフを支えます。`,
          jobs: [
            {
              title: 'カスタマーサポート',
              description: `シナプスのサポートセンターは、お客様と電話で対応するコールセンター業務が主な仕事です。<br>
              ご加入／ご解約の相談から、インターネットやメールが利用できないといったトラブルに関するサポートも行います。<br>
              また、メールやサポート掲示板でのご相談への回答もサポートセンターで行っています。`,
              link: '/work/staff/riho-matsumoto/',
            },
            {
              title: '窓口対応（シナプス・ステーション）',
              description: `鹿児島中央駅前にあるシナプスの窓口「シナプス・ステーション」では、来店されたお客様へのサポート対応を行います。<br>
              インターネットの導入相談や各種手続きを中心に、端末修理の受付やお客様が利用されている機器やサービスの設定やトラブル解決、使い方の案内まで幅広くサポートします。<br>
              インターネットをもっと楽しく便利に使うためのセミナーやイベントの企画、開催も行うなど、仕事の幅は多岐にわたります。`,
              link: '/work/staff/takeshi-kuraya/',
            },
          ],
        },
        {
          picture: '/images/job/picture_3.jpg',
          catchcopies: [
            '鹿児島の地域の声を拾い、',
            '課題解決に導くサービスを企画・展開。',
          ],
          title: '広報・企画',
          description:
            'シナプスは地域密着型のインターネットサービスプロバイダとして、地域に根ざした課題を解決するサービスを企画・展開しています。また、より多くのお客様にご利用いただくため、パートナー企業と連携した広報体制の構築にも取り組んでいます。',
          jobs: [
            {
              title: 'サービス企画',
              description: `「鹿児島にこだわった新サービスの立ち上げ」を担います。<br>
              サービスの想定顧客に徹底的にヒアリングを行い、ご意見の中から課題を探り、アイデアを出し、コンセプトや開発仕様などを想定して企画にまとめます。<br>
              その後、技術スタッフや外部関係者との調整や広報戦略、販売戦略を並行して行い、ひとつのサービスの全体をまとめ上げていく仕事です。`,
            },
            {
              title: '広報（広報/販促/営業）',
              description: `サービスの特長やメリットを正しくお伝えし、納得してもらい、一人でも多くのお客様にシナプスを利用していただくことが広報の役割です。<br>
              また販促キャンペーンや、私たちと一緒に各地域のお客様をサポートする「パートナー企業」との関係性強化にも取り組んでいます。<br>
              ICTがどんなに発展しようとも、決して無くなることのないお客様やパートナーとのコミュニケーションを描きあげる（デザインする）ことが私たちのお仕事です。`,
            },
          ],
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

    this.animateFirstview()
  },
  destroyed() {
    this.timelines.forEach((timeline) => {
      timeline.kill()
    })
  },
  methods: {
    animateFirstview() {
      const targets = this.$refs['firstview-picture'].concat(
        this.$refs['firstview-illust']
      )
      targets.forEach((target) => {
        this.timelines.push(
          gsap
            .timeline({ repeat: -1 })
            .to(
              { val: 0 },
              {
                duration: Math.random() * 2,
                val: 1,
              }
            )
            .to(target, {
              duration: 3 + Math.random() * 6,
              opacity: 1,
              scale: 1.02,
            })
            .to(target, {
              duration: 3 + Math.random() * 6,
              opacity: 0,
              scale: 1,
            })
        )
      })
    },
    showElem(key) {
      this.$set(this.isShowElem, key, true)
    },
    goWork(index) {
      scroll.top(
        scrollDoc(),
        this.$refs.work[index].getBoundingClientRect().top + window.pageYOffset,
        {
          duration: 500,
        }
      )
    },
  },
}
</script>

<style scoped lang="scss">
.container {
  min-width: $width-2;

  :deep(.breadcrumb) {
    top: 1120px;
    background-color: $color-gray-2;
  }
}

.firstview {
  position: relative;
  padding-top: 306px;
  padding-bottom: 880px;
  text-align: center;
  overflow: hidden;

  &__picture-container,
  &__illust-container {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    height: 1240px;
  }

  &__picture-container {
    opacity: 0.4;
  }

  &__title-en {
    position: relative;
    @include fontTsuku;
    font-size: 20px;
  }

  &__title {
    position: relative;
    margin-top: 32px;
    @include fontTsuku;
    font-size: 48px;
  }

  &__description {
    position: relative;
    margin-top: 20px;
    line-height: 2em;
    font-size: 14px;
  }
}

.firstview-picture {
  position: absolute;
  top: 50%;
  left: 50%;
  background-size: cover;
  background-position: center;
  transform: translate(-50%, -50%);
  box-shadow: 3px 3px 10px 2px rgba(0, 0, 0, 0.3);
  opacity: 0;
}

.firstview-illust {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
}

.outline-container {
  position: relative;

  &__title-en {
    position: absolute;
    top: 0;
    left: 50%;
    @include fontTsuku;
    font-size: 20px;
    color: $color-gray-1;
    transform: translateX(180px);
  }

  &__title {
    position: absolute;
    top: 28px;
    left: 50%;
    @include fontTsuku;
    font-size: 36px;
    letter-spacing: 0.1em;
    transform: translateX(180px);
  }

  &__box {
    width: $width-2;
    margin: 0 auto;
    padding-bottom: 32px;
    overflow: hidden;
  }
}

.outline {
  float: left;
  margin: 0 20px;
  cursor: pointer;

  &:nth-child(2) {
    margin-top: 180px;
  }

  &:nth-child(3) {
    margin-top: 360px;
  }

  &__box {
    width: 360px;
    padding: 400px 24px 32px;
    @include boxShadow;
    transition-property: transform, box-shadow;
    transition-duration: 0.5s;
    border-radius: 8px;
    box-sizing: border-box;

    @include hover {
      transform: translate(-2px, -2px);
      box-shadow: 6px 6px 10px 2px rgba(0, 0, 0, 0.2);
    }
  }

  &__picture {
    position: absolute;
    top: 36px;
    right: 16px;
    left: 16px;
    height: 320px;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }

  &__title {
    font-size: 32px;
    font-weight: bold;
    text-align: center;
  }

  &__list-container {
    margin-top: 16px;
  }

  &__list {
    line-height: 2.4em;
    font-size: 13px;

    &:before {
      content: '・';
    }
  }
}

.work-container {
  padding-top: 248px;
}

.work {
  padding-bottom: 300px;

  &__firstview {
    position: relative;
    height: 850px;
    padding: 1px 0;
    background-color: $color-black-1;
    background-size: cover;
    background-position: center;

    &:before {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.5);
      content: '';
    }
  }

  &__catchcopy-container {
    position: relative;
    margin-top: 64px;
  }

  :deep() {
    .label-animation {
      line-height: 64px;
      margin: 12px 0;
      font-size: 32px;
      font-weight: bold;
      @include fontTsuku;

      &__content {
        padding-left: 16px;
      }
    }
  }

  &__title {
    position: absolute;
    top: 240px;
    right: 0;
    left: 0;
    width: 1em;
    margin: 0 auto;
    color: white;
    font-size: 56px;
    @include fontTsuku;
    writing-mode: vertical-rl;
    -ms-writing-mode: tb-rl;
    text-orientation: upright;
    -webkit-text-orientation: upright;
    white-space: nowrap;
    letter-spacing: 0.1em;
  }

  &__description {
    position: absolute;
    bottom: 120px;
    left: 50%;
    width: 480px;
    line-height: 2em;
    color: white;
    transform: translateX(120px);
  }

  &__job-container {
    display: flex;
    flex-wrap: wrap;
    position: relative;
    margin-top: -48px;
    border-radius: 64px;
    background-color: white;
  }
}

.work-job {
  position: relative;
  width: 50%;
  padding: 200px 100px 72px;
  box-sizing: border-box;

  &:before,
  &:after {
    position: absolute;
    width: 80px;
    height: 80px;
    background-size: contain;
    background-repeat: no-repeat;
    background-image: url(~assets/images/work/frame.png);
    content: '';
  }

  &:before {
    top: 120px;
    left: 28px;
  }

  &:after {
    right: 28px;
    bottom: -8px;
    transform: scale(-1, -1);
  }

  &__title {
    text-align: center;
    font-weight: bold;
    font-size: 24px;
  }

  &__description {
    line-height: 2em;
    margin-top: 48px;
  }

  :deep(.common-button) {
    margin-top: 32px;
  }
}

@include smartphone {
  .container {
    min-width: 0;

    :deep(.breadcrumb) {
      top: 420px;
    }
  }

  .firstview {
    padding-top: 175px;
    padding-bottom: 290px;

    &__picture-container,
    &__illust-container {
      height: 480px;
    }

    &__title-en {
      position: absolute;
      top: 206px;
      right: 0;
      left: 0;
      text-align: center;
      font-size: 11px;
    }

    &__title {
      margin-top: initial;
      font-size: 20px;
    }

    &__description {
      display: none;
    }
  }

  .outline-container {
    padding: 16px $padding-1 68px;
    background-color: $color-gray-2;

    &__title-en {
      display: none;
    }

    &__title {
      display: none;
    }

    &__box {
      width: initial;
      padding-bottom: initial;
      overflow: initial;
    }
  }

  .outline {
    float: initial;
    margin: 32px 0;

    &__box {
      width: initial;
      padding: 36px 16px 36px 160px;
      border-radius: 4px;
      background-color: white;
    }

    &:nth-child(2) {
      margin-top: initial;
    }

    &:nth-child(3) {
      margin-top: initial;
    }

    &__picture {
      top: 8px;
      right: initial;
      bottom: 8px;
      left: 8px;
      width: 140px;
      height: initial;
    }

    &__title {
      font-size: 18px;
      text-align: left;
    }

    &__list-container {
      margin-top: 12px;
    }

    &__list {
      line-height: 2.4em;
      font-size: 11px;
    }
  }

  .work-container {
    padding-top: initial;
  }

  .work {
    padding-bottom: initial;

    &__firstview {
      height: 660px;
    }

    &__catchcopy-container {
      margin-top: 280px;
    }

    :deep(.label-animation) {
      line-height: 32px;
      margin: 4px 0;
      font-size: 16px;
    }

    &__title {
      top: 72px;
      font-size: 30px;
    }

    &__description {
      padding: 24px $padding-1;
      bottom: initial;
      left: initial;
      width: initial;
      font-size: 14px;
      transform: initial;
    }

    &__job-container {
      display: block;
      margin-top: -24px;
      padding: 36px 0;
      border-radius: 32px;
    }
  }

  .work-job {
    width: initial;
    padding: 36px 40px;

    &:before,
    &:after {
      display: none;
    }

    &__title {
      padding-bottom: 28px;
      font-size: 18px;
      text-align: left;
      border-bottom: 1px solid $color-gray-1;
    }

    &__description {
      margin-top: 24px;
      font-size: 14px;
    }
  }
}
</style>
