<template>
  <div class="container">
    <section class="firstview">
      <div class="firstview__box">
        <figure
          v-if="$store.state.imageSuffix !== null"
          class="firstview__picture-container"
        >
          <img
            class="firstview__picture"
            :src="`/images/index/firstview_illust${$store.state.imageSuffix}.jpg`"
            alt=""
          />
          <img
            v-for="(firstviewChara, index) in firstviewCharas"
            v-show="firstviewChara.width && isFirstviewIllustLoaded"
            :key="index"
            :src="require(`~/assets/images/index/chara_${index + 1}.png`)"
            alt=""
            class="firstview__chara"
            :style="{
              top: `${firstviewChara.top * firstviewRatio}px`,
              left: `${firstviewChara.left * firstviewRatio}px`,
              opacity: firstviewChara.isShow ? 1 : 0,
              width: firstviewChara.width
                ? `${Math.floor(firstviewChara.width / 2) * firstviewRatio}px`
                : null,
            }"
          />
        </figure>
        <p class="firstview__title-en">
          Kagoshima,<br />Happy,<br class="only-smartphone" />by Internet.
        </p>
        <h1 class="firstview__title">
          インターネットで、<br />鹿児島の毎日を<br />笑顔にします。
        </h1>

        <common-button
          link="/feature/"
          title="シナプスの特長を知る"
          modifier="gray"
        />

        <div v-if="firstviewNews.length" class="firstview-news-container">
          <div
            v-for="(_firstviewNews, index) in firstviewNews"
            :key="index"
            class="firstview-news"
          >
            <div class="firstview-news__meta">
              <a
                :href="_firstviewNews.basePath"
                class="firstview-news__category"
                :target="_firstviewNews.isExternal ? '_blank' : '_self'"
              >
                {{ _firstviewNews.category }}
              </a>
              <p class="firstview-news__date">
                {{ _firstviewNews.date }}
              </p>
            </div>

            <a
              :href="_firstviewNews.link"
              class="firstview-news__title"
              :target="_firstviewNews.isExternal ? '_blank' : '_self'"
            >
              {{ _firstviewNews.title }}
            </a>
          </div>
        </div>
      </div>
    </section>

    <div class="introduction-container">
      <div
        v-for="(introduction, index) in introductions"
        :key="index"
        class="introduction"
      >
        <div class="introduction__picture-container">
          <div>
            <delayed-show
              v-for="(picture, pictureIndex) in introduction.pictures"
              :key="pictureIndex"
              :delay="0.2 * pictureIndex"
              class="introduction__picture"
            >
              <img :src="picture" class="introduction__picture-image" />
            </delayed-show>
          </div>
          <div>
            <delayed-show
              v-for="(message, messageIndex) in introduction.messages"
              :key="messageIndex"
              :delay="0.2 * messageIndex"
              class="introduction__message"
            >
              <div v-html="message" />
            </delayed-show>
          </div>
        </div>
        <delayed-show modifier="no-transform">
          <p class="introduction__title-en">
            {{ introduction.titleEn }}
          </p>
          <p v-if="introduction.title" class="introduction__title">
            {{ introduction.title }}
          </p>
          <p
            class="introduction__description"
            v-html="introduction.description"
          />
          <common-button
            :link="introduction.link.path"
            :title="introduction.link.title"
          />
        </delayed-show>
      </div>
    </div>

    <div class="work-container">
      <div class="work-container__box">
        <p class="work-container__title-en">Work</p>
        <p class="work-container__title">シナプスの仕事と人</p>

        <div>
          <div v-for="(work, index) in works" :key="index" class="work">
            <delayed-show
              modifier="image"
              class="work__picture-container"
              @finish="showElem(`work-picture-${index}`)"
            >
              <div
                class="work__picture"
                :style="`background-image: url(${`/images/index/work_picture_${
                  index + 1
                }.jpg`})`"
              >
                <div
                  class="work__title-container"
                  :class="{
                    'work__title-container--show':
                      isShowElem[`work-picture-${index}`],
                  }"
                >
                  <p class="work__title">
                    {{ work.title }}
                  </p>
                  <p class="work__title-en">
                    {{ work.titleEn }}
                  </p>
                </div>
              </div>
            </delayed-show>
            <delayed-show>
              <p class="work__description" v-html="work.description" />
              <common-button
                :link="work.link.path"
                :title="work.link.title"
                modifier="gray"
              />
            </delayed-show>

            <div class="work__chat-container">
              <delayed-show
                v-for="(chat, chatIndex) in work.chats"
                :key="chatIndex"
                class="work-chat"
              >
                <div class="work-chat__thumbnail">
                  <img
                    :src="chat.thumbnail"
                    class="work-chat__thumbnail-image"
                  />
                </div>
                <p class="work-chat__message" v-html="chat.message" />
              </delayed-show>
            </div>
          </div>
        </div>
      </div>
    </div>

    <recruit-banner />
  </div>
</template>

<script>
// TODO: xml2jsを使える状態であればコメントアウトを外す
// import { parseString } from 'xml2js'
import { gsap } from 'gsap'
import moment from 'moment'
import commonButton from '@/components/atoms/commonButton'
import recruitBanner from '@/components/molecules/recruitBanner'
import delayedShow from '@/components/atoms/delayedShow'

export default {
  components: { commonButton, recruitBanner, delayedShow },
  data() {
    return {
      isFirstviewIllustLoaded: false,
      firstviewNews: [],
      firstviewCharaTimelines: [],
      firstviewRatio: 1,
      firstviewCharas: [
        {
          top: 125,
          left: 680,
        },
        {
          top: 141,
          left: 660,
        },
        {
          top: 40,
          left: 790,
        },
        {
          top: 283,
          left: 947,
        },
        {
          top: 190,
          left: 527,
        },
        {
          top: 180,
          left: 406,
        },
        {
          top: 774,
          left: 745,
        },
        {
          top: 798,
          left: 621,
        },
        {
          top: 667,
          left: 812,
        },
        {
          top: 191,
          left: 687,
        },
        {
          top: 337,
          left: 853,
        },
        {
          top: 546,
          left: 895,
        },
        {
          top: 395,
          left: 1126,
        },
        {
          top: 372,
          left: 1166,
        },
        {
          top: 259,
          left: 1120,
        },
        {
          top: 407,
          left: 1271,
        },
        {
          top: 276,
          left: 1271,
        },
        {
          top: 130,
          left: 1165,
        },
        {
          top: 375,
          left: 535,
        },
        {
          top: 485,
          left: 612,
        },
        {
          top: 506,
          left: 994,
        },
        {
          top: 123,
          left: 1020,
        },
        {
          top: 90,
          left: 871,
        },
        {
          top: 401,
          left: 711,
        },
        {
          top: 284,
          left: 684,
        },
        {
          top: 192,
          left: 806,
        },
        {
          top: 425,
          left: 1135,
        },
      ],
      isShowElem: {},
      introductions: [
        {
          pictures: [
            '/images/illust/graph.png',
            '/images/illust/graph_2.png',
            '/images/illust/support_2.png',
            '/images/illust/web.png',
            '/images/illust/pencil.png',
            '/images/illust/support.png',
          ],
          messages: [
            'シナプスのあれこれを<br>数字で知りたい！',
            'シナプスはどんなサービスを<br>運営しているの？',
            'シナプスの社長がブログを<br>書いているって本当？',
          ],
          titleEn: 'About us',
          link: {
            path: '/about/',
            title: 'シナプスについて知る',
          },
          description: `シナプスは南九州初のインターネットサービスプロバイダです。1995年の誕生からこれまで、鹿児島の皆さまに安心してご利用いただけるインターネット環境を提供してきました。<br>
これまで培ってきた、インターネットをベースとしたICTの技術力とお客様サポート力、そして県内随一のネットワークインフラを強みとして、鹿児島の毎日をもっと多くの笑顔で満たすために、挑戦を続けています。`,
        },
        {
          pictures: [
            '/images/index/technology_logo_1.png',
            '/images/index/technology_logo_2.png',
            '/images/index/technology_logo_3.png',
            '/images/index/technology_logo_4.png',
            '/images/index/technology_logo_5.png',
          ],
          titleEn: 'Technology',
          title: 'シナプスの技術',
          link: {
            path: '/technology/',
            title: 'シナプスの技術を知る',
          },
          description: `シナプスが持つ最大の強みは、インターネットサービスプロバイダとして、24時間365日安定してインターネットサービスを稼働させ続ける高い技術力です。<br>
ネットワークインフラからWebのフロントエンドまで、高い専門性と豊富な経験を持つエンジニアリングのスペシャリストが、安心・安全のインターネット環境を作り上げています。`,
        },
      ],
      works: [
        {
          title: '仕事',
          titleEn: 'Jobs',
          description: `インターネットサービスプロバイダとして安定したサービスを提供するためには、鹿児島のお客様に求められるサービスの企画・開発、サーバやネットワークインフラの運用・保守、お客様のお困りごとを解決するサポート、の3つの柱が必要です。<br>
ここではシナプスで働くスタッフの職種を「技術職」「お客様対応」「広報・企画」の3つのカテゴリに分けてご紹介します。`,
          link: {
            title: 'シナプスの仕事を知る',
            path: '/work/job/',
          },
        },
        {
          title: '人',
          titleEn: 'Staff',
          description: `シナプスで働くスタッフのほとんどは地元鹿児島県出身。「インターネットの力で地元の鹿児島を盛り上げたい！」と意気込むスタッフが多数在籍しています。<br>
ここではシナプスで働くスタッフを各職種ごとにご紹介します。`,
          link: {
            title: 'シナプスで働くスタッフを知る',
            path: '/work/staff/',
          },
          chats: [
            {
              thumbnail: '/images/index/member_1.jpg',
              message: '息の長いサービスを<br>作っていきたいです。',
            },
            {
              thumbnail: '/images/index/member_2.jpg',
              message: '鹿児島の離島、全部制覇したいなと<br>思っています。',
            },
            {
              thumbnail: '/images/index/member_3.jpg',
              message:
                '情報を逃さず拾い上げることが<br>一番大切だと思っています。',
            },
            {
              thumbnail: '/images/index/member_4.jpg',
              message:
                '手がけたことのないネットワーク構築<br>をしてみたいです。',
            },
          ],
        },
      ],
    }
  },
  async mounted() {
    await this.sleep(200)
    this.firstviewRatio = this.$store.state.isSmartphone ? 0.353 : 1
    this.fetchFirstviewNews()
    this.loadFirstviewCharas()
    this.loadFirstviewIllust()
    this.animateFirstviewCharas()
    this.fontReload()
  },
  destroyed() {
    this.firstviewCharaTimelines.forEach((firstviewCharaTimeline) => {
      firstviewCharaTimeline.kill()
    })
  },
  methods: {
    async fetchFirstviewNews() {
      const [
        { data: news },
        { data: blog },
        { data: discussion },
        { data: staffBlog },
        { data: techBlogRawData },
      ] = await Promise.all(
        [
          this.$axios.get(`${process.env.apiEndpoint}news?_embed&per_page=5`),
          this.$axios.get(`${process.env.apiEndpoint}blog?_embed&per_page=5`),
          this.$axios.get(
            `${process.env.apiEndpoint}discussion?_embed&per_page=5`
          ),
          this.$axios.get(
            `${process.env.apiEndpoint}staff_blog?_embed&per_page=5`
          ),
        ].concat(
          process.env.wpAccessToken
            ? new Promise((resolve) => {
                resolve({
                  data: null,
                })
              })
            : this.$axios.post(`${process.env.url}api/fetchRSS`, {
                url: 'https://tech.synapse.jp/rss',
              })
        )
      )

      news.forEach((_news) => {
        _news.category = 'お知らせ'
        _news.basePath = '/news/'
      })

      blog.forEach((_blog) => {
        _blog.category = '社長ブログ'
        _blog.basePath = '/blog/'
      })

      discussion.forEach((_discussion) => {
        _discussion.category = '座談会'
        _discussion.basePath = '/technology/discussion/'
      })

      staffBlog.forEach((_staffBlog) => {
        _staffBlog.category = 'スタッフブログ'
        _staffBlog.basePath = '/staff-blog/'
      })

      const techBlog = techBlogRawData
        ? 
          // TODO: RSSのデータを読めるまではコメントアウト
          []
          // await new Promise((resolve) => {
          //   parseString(techBlogRawData, (error, result) => {
          //     if (error) {
          //       console.log(error)
          //     }
          //     resolve(result?.rss?.channel?.[0]?.item)
          //   })
          // })
        : []

      techBlog.forEach((_techBlog) => {
        _techBlog.category = '技術者ブログ'
        _techBlog.basePath = 'https://tech.synapse.jp/'
      })

      const maxLength = 5
      const firstviewNews = news
        .concat(blog)
        .concat(discussion)
        .concat(staffBlog)
        .concat(techBlog)
        .map((_firstviewNews) => {
          const isExternal = _firstviewNews.category === '技術者ブログ'

          return {
            category: _firstviewNews.category,
            date: moment(
              isExternal ? _firstviewNews.pubDate?.[0] : _firstviewNews.date
            ).format('YYYY.MM.DD'),
            title: isExternal
              ? _firstviewNews.title?.[0]
              : _firstviewNews.title.rendered.replace(/<br>/g, ''),
            basePath: _firstviewNews.basePath,
            link: isExternal
              ? _firstviewNews.link?.[0]
              : `${_firstviewNews.basePath}${_firstviewNews.slug}/`,
            isExternal,
          }
        })
        .sort((a, b) => {
          return (
            moment(b.date, 'YYYY.MM.DD').valueOf() -
            moment(a.date, 'YYYY.MM.DD').valueOf()
          )
        })
        .slice(0, maxLength)

      this.$set(this, 'firstviewNews', firstviewNews)
    },
    async loadFirstviewIllust() {
      const image = new Image()
      image.src = `/images/index/firstview_illust${this.$store.state.imageSuffix}.jpg`

      await new Promise((resolve) => {
        image.complete ? resolve() : (image.onload = resolve)
      })

      this.isFirstviewIllustLoaded = true
    },
    animateFirstviewCharas() {
      this.firstviewCharas.forEach((firstviewChara, index) => {
        this.$set(this.firstviewCharas[index], 'isShow', false)
        const duration = 1.5 + Math.random() * 1.5
        const params = { val: 0 }

        this.firstviewCharaTimelines.push(
          gsap
            .timeline({ repeat: -1 })
            .to(params, {
              duration,
              val: 1,
              onComplete: () => {
                this.$set(this.firstviewCharas[index], 'isShow', true)
              },
            })
            .to(params, {
              duration,
              val: 9,
              onComplete: () => {
                this.$set(this.firstviewCharas[index], 'isShow', false)
              },
            })
        )
      })
    },
    loadFirstviewCharas() {
      this.firstviewCharas.forEach(async (firstviewChara, index) => {
        const image = new Image()
        image.src = require(`~/assets/images/index/chara_${index + 1}.png`)
        await new Promise((resolve) => {
          image.complete ? resolve() : (image.onload = resolve)
        })
        this.$set(this.firstviewCharas[index], 'width', image.width)
      })
    },
    showElem(key) {
      this.$set(this.isShowElem, key, true)
    },
  },
}
</script>

<style scoped lang="scss">
.container {
  min-width: $width-2;
}

.firstview {
  position: relative;
  height: 1200px;
  padding-top: 224px;
  overflow: hidden;

  &__box {
    max-width: $width-2;
    margin: 0 auto;
  }

  &__picture-container {
    position: absolute;
    top: 70px;
    left: 50%;
    width: 1541px;
    transform: translateX(-467px);
  }

  &__picture {
    width: 100%;
  }

  &__chara {
    position: absolute;
    transition: opacity 0.1s;
  }

  &__title-en {
    position: absolute;
    top: 480px;
    left: 50%;
    line-height: 1.3em;
    padding-left: 120px;
    font-size: 30px;
    @include fontTsuku;
    color: $color-gray-1;
    transform: translateX(-480px);
  }

  &__title {
    position: absolute;
    top: 220px;
    left: 50%;
    line-height: 2em;
    @include fontTsuku;
    font-size: 40px;
    writing-mode: vertical-rl;
    -ms-writing-mode: tb-rl;
    text-orientation: upright;
    -webkit-text-orientation: upright;
    transform: translateX(-624px);
  }

  :deep(.common-button) {
    position: absolute;
    top: 1040px;
    left: 50%;
    width: 324px;
    margin-left: 232px;
  }
}

.firstview-news-container {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 600px;
  padding: 0 20px;
  border: 1px solid $color-gray-7;
  background-color: white;
  transform: translate(-616px, -72px);
  box-sizing: border-box;
}

.firstview-news {
  display: flex;
  align-items: center;
  padding: 12px 20px 12px 0;

  &:not(:last-child) {
    border-bottom: 1px solid $color-gray-7;
  }

  &__meta {
    display: flex;
    align-items: center;
  }

  &__category {
    display: block;
    width: 104px;
    line-height: 1.5em;
    padding: 6px 0;
    margin-right: 16px;
    text-align: center;
    font-size: 12px;
    font-weight: bold;
    color: white;
    background-color: $color-black-2;

    &:hover {
      text-decoration: underline;
    }
  }

  &__date {
    line-height: 1.5em;
    margin-right: 12px;
    font-size: 12px;
    color: $color-black-2;
  }

  &__title {
    display: -webkit-box;
    position: relative;
    max-height: 1.5em;
    line-height: 1.5em;
    overflow: hidden;
    font-size: 14px;
    font-weight: bold;
    -webkit-line-clamp: 1;

    &:hover {
      text-decoration: underline;
    }
  }

  &__title {
    /* autoprefixer: off */
    -webkit-box-orient: vertical;
  }
}

.introduction-container {
  position: relative;
  background-color: $color-gray-2;
  overflow: hidden;

  &__title {
    position: absolute;
    top: -64px;
    left: 0;
    display: inline-block;
    padding: 32px 24px;
    @include fontTsuku;
    font-size: 56px;
    background-color: white;
    letter-spacing: 0.1em;
  }
}

.introduction {
  position: relative;
  max-width: $width-2;
  line-height: 2em;
  margin: 0 auto;
  padding: 200px 40px 180px;
  box-sizing: border-box;

  &:nth-child(1) {
    .introduction {
      &__picture {
        width: 120px;

        &:nth-child(1) {
          top: 330px;
          left: 160px;
        }

        &:nth-child(2) {
          top: 200px;
          left: 474px;
        }

        &:nth-child(3) {
          top: 390px;
          left: 350px;
          width: 300px;
        }

        &:nth-child(4) {
          top: 460px;
          left: 80px;
          width: 100px;
        }

        &:nth-child(5) {
          top: 610px;
          left: 340px;
        }

        &:nth-child(6) {
          top: 590px;
          left: -60px;
          width: 180px;
        }
      }

      &__message {
        &:nth-child(1) {
          top: 290px;
          left: 220px;
        }

        &:nth-child(2) {
          top: 440px;
          left: 150px;
        }

        &:nth-child(3) {
          top: 590px;
          left: 20px;
        }
      }
    }
  }

  &:nth-child(2) {
    .introduction {
      &__picture {
        width: 120px;

        &:nth-child(1) {
          top: 270px;
          left: 180px;
        }

        &:nth-child(2) {
          top: 270px;
          left: 330px;
        }

        &:nth-child(3) {
          top: 270px;
          left: 480px;
        }

        &:nth-child(4) {
          top: 400px;
          left: 250px;
        }

        &:nth-child(5) {
          top: 400px;
          left: 410px;
        }
      }
    }
  }

  &__picture-container {
    position: absolute;
    top: 0;
    left: 50%;
  }

  &__picture {
    position: absolute;
  }

  &__picture-image {
    width: 100%;
  }

  &__message {
    position: absolute;
    width: 320px;
    line-height: 1.5em;
    padding: 16px 40px;
    color: white;
    font-weight: bold;
    border-radius: 48px;
    border-bottom-right-radius: 0;
    background-color: rgba(55, 55, 55, 0.95);
    white-space: nowrap;
    box-sizing: border-box;
  }

  &__title-en {
    position: absolute;
    top: 200px;
    left: 16px;
    @include fontTsuku;
    color: $color-gray-1;
    font-size: 22px;
    transform-origin: left top;
    transform: rotate(90deg);
    letter-spacing: 0;
  }

  &__title {
    margin-bottom: 72px;
    @include fontTsuku;
    font-size: 56px;
    letter-spacing: 0.1em;
  }

  &__description {
    width: 680px;
  }

  :deep(.common-button) {
    width: 388px;
    margin-top: 48px;
  }
}

.work-container {
  position: relative;
  padding: 96px 0;
  overflow: hidden;

  &__box {
    max-width: $width-2;
    margin: 0 auto;
  }

  &__title-en {
    position: absolute;
    top: 104px;
    left: 50%;
    @include fontTsuku;
    font-size: 20px;
    transform: translateX(-522px);
    color: $color-gray-1;
  }

  &__title {
    position: absolute;
    top: 160px;
    left: 50%;
    @include fontTsuku;
    font-size: 28px;
    transform-origin: left top;
    transform: translateX(-480px) rotate(90deg);
    letter-spacing: 0.1em;
  }
}

@keyframes show-title {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.work {
  position: relative;
  padding-bottom: 112px;

  &__chat-container {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-580px);
    z-index: 1;
  }

  &__title-container {
    display: none;

    &--show {
      display: block;
      animation: show-title 0.5s;
    }
  }

  &__picture-container {
    position: relative;
    z-index: 1;
  }

  &__picture {
    position: relative;
    width: 800px;
    height: 530px;
    margin-top: 8px;
    margin-left: 210px;
    background-size: cover;
    background-position: center;
    background-color: $color-gray-1;
  }

  &__title-container {
    position: absolute;
    bottom: 40px;
    left: 72px;
  }

  &__title {
    padding-left: 16px;
    @include fontTsuku;
    color: white;
    font-size: 56px;
    writing-mode: vertical-rl;
    -ms-writing-mode: tb-rl;
    letter-spacing: 0.1em;
  }

  &__title-en {
    position: absolute;
    top: 0;
    left: 0;
    @include fontTsuku;
    color: white;
    font-size: 20px;
    transform: rotate(90deg);
    transform-origin: center left;
    letter-spacing: 0.1em;
    opacity: 0.2;
  }

  &__description {
    width: 680px;
    line-height: 2em;
    margin-top: 20px;
    margin-left: 330px;
  }

  :deep(.common-button) {
    width: 388px;
    margin-top: 32px;
    margin-left: 330px;
  }

  &:nth-child(2) {
    .work {
      &__picture {
        margin-left: 450px;
      }

      &__description {
        margin-left: 524px;
      }
    }

    :deep(.common-button) {
      margin-left: 524px;
    }
  }
}

.work-chat {
  display: flex;
  align-items: center;
  margin-top: 48px;

  &:nth-child(even) {
    flex-direction: row-reverse;

    .work-chat__message {
      margin-left: 0;
      margin-right: 16px;
      border-bottom-left-radius: 48px;
      border-bottom-right-radius: 0;
    }
  }

  &__thumbnail {
    position: relative;
    width: 140px;
    line-height: 0;
    border-radius: 50%;
    overflow: hidden;

    &:after {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-size: 100% 100%;
      background-image: url('~assets/images/common/circle_frame.png');
      content: '';
    }
  }

  &__thumbnail-image {
    width: 100%;
  }

  &__message {
    width: 320px;
    line-height: 1.5em;
    height: 80px;
    padding: 16px 40px;
    margin-left: 16px;
    color: white;
    font-weight: bold;
    border-radius: 48px;
    border-bottom-left-radius: 0;
    background-color: rgba(55, 55, 55, 0.95);
    white-space: nowrap;
    box-sizing: border-box;
  }
}

@media screen and (min-width: $breakpoint-1) and (max-width: $width-1) {
  .firstview {
    &__title-en {
      transform: translateX(-440px);
    }

    &__title {
      transform: translateX(-584px);
    }
  }

  .firstview-news-container {
    transform: translate(-576px, -72px);
  }
}

@include smartphone {
  .container {
    min-width: initial;
  }

  .firstview {
    height: 1080px;
    padding-top: initial;
    box-sizing: border-box;

    &__picture-container {
      top: -8px;
      width: 544px;
      transform: translateX(-254px);
    }

    &__title-en {
      top: 472px;
      right: 20px;
      left: auto;
      width: 224px;
      line-height: 1.5em;
      font-size: 11px;
      transform: none;

      /* 20200715 位置変更のための上書き */
      width: 160px;
      top: 390px;
      padding-left: 0;
    }

    &__title {
      top: 380px;
      right: 20px;
      left: initial;
      line-height: 1.5em;
      font-size: 18px;
      letter-spacing: 0.1em;
      writing-mode: initial;
      -ms-writing-mode: initial;
      text-orientation: initial;
      -webkit-text-orientation: initial;
      transform: translateX(-72px);

      /* 20200715 位置変更のための上書き */
      width: 160px;
      top: 300px;
      transform: translateX(0);
    }

    :deep(.common-button) {
      top: 996px;
      right: 0;
      left: 0;
      width: calc(100% - 40px);
      margin: 0 auto;
    }
  }

  .firstview-news-container {
    top: 480px;
    right: $padding-1;
    left: $padding-1;
    width: auto;
    padding: 0 20px;
    transform: none;
  }

  .firstview-news {
    display: block;
    padding: 16px 0;

    &__category {
      width: 120px;
      margin-right: 0;
      font-weight: normal;
    }

    &__date {
      margin-right: 0;
      margin-left: auto;
    }

    &__title {
      margin-top: 12px;
    }
  }

  .introduction-container {
    padding: 0 0 72px;
    background-color: transparent;

    &__title {
      top: 0;
      right: 0;
      line-height: 1.5em;
      padding: initial;
      text-align: center;
      font-size: 28px;
      background-color: initial;
    }
  }

  .introduction {
    width: calc(100% - 40px);
    margin-right: initial;
    margin-left: auto;
    padding: 72px 20px 120px 48px;
    box-sizing: border-box;
    background-color: $color-gray-2;

    &:nth-child(1),
    &:nth-child(2) {
      .introduction {
        &__picture {
          width: 64px;
          bottom: 20px;

          &:nth-child(1) {
            top: initial;
            left: 60px;
          }

          &:nth-child(2) {
            top: initial;
            left: 140px;
          }

          &:nth-child(3) {
            display: none;
          }

          &:nth-child(4) {
            display: none;
          }

          &:nth-child(5) {
            top: initial;
            left: 220px;
          }

          &:nth-child(6) {
            display: none;
          }
        }
      }
    }

    &__picture-container {
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
    }

    &__message {
      display: none;
    }

    &__title-en {
      position: relative;
      top: initial;
      left: initial;
      font-size: 16px;
      transform: initial;
    }

    &__title {
      margin-bottom: 32px;
      font-size: 26px;
    }

    &__description {
      width: initial;
      line-height: 2em;
      margin-top: 12px;
      font-size: 14px;
    }

    :deep(.common-button) {
      width: initial;
    }
  }

  .work-container {
    padding: 48px 0;

    &__title-en {
      top: 0;
      right: 20px;
      left: initial;
      font-size: 10px;
      transform: initial;
    }

    &__title {
      top: 20px;
      right: 20px;
      left: initial;
      font-size: 12px;
      writing-mode: vertical-rl;
      -ms-writing-mode: tb-rl;
      text-orientation: upright;
      -webkit-text-orientation: upright;
      transform: initial;
    }
  }

  .work {
    padding-bottom: 32px;

    &:nth-child(1) {
      .work__title-container {
        left: 288px;
        bottom: 32px;
      }
    }

    &:nth-child(2) {
      .work__title-container {
        left: -64px;
        bottom: 56px;
      }
    }

    &__chat-container {
      position: relative;
      top: initial;
      left: initial;
      transform: initial;
      padding: 0 24px;
    }

    &__title {
      padding-left: initial;
      color: $color-black-1;
      font-size: 48px;
    }

    &__title-en {
      top: -24px;
      right: 0;
      left: 4px;
      text-align: center;
      font-size: 18px;
      color: $color-black-1;
      transform: initial;
    }

    &__picture {
      position: relative;
      width: calc(100vw - 112px);
      height: 380px;
      margin-top: initial;
      margin-left: initial;
    }

    &__description {
      width: calc(100% - 40px);
      margin-top: -80px;
      margin-left: auto;
      padding: 132px $padding-1 64px 48px;
      background-color: $color-gray-2;
      font-size: 14px;
      box-sizing: border-box;
    }

    :deep(.common-button) {
      width: calc(100% - 80px);
      margin: 32px auto;
    }

    &:nth-child(2) {
      .work {
        &__picture {
          margin-left: calc(100vw - 263px);
        }

        &__description {
          margin-left: initial;
          padding-right: 48px;
          padding-left: $padding-1;
        }
      }

      :deep(.common-button) {
        margin-left: auto;
      }
    }
  }

  .work-chat {
    margin-top: 48px;

    &__thumbnail {
      width: 64px;
    }

    &__message {
      width: 230px;
      height: 56px;
      padding: 10px 22px;
      font-size: 12px;
    }
  }
}
</style>
