<template>
  <div class="container">
    <section ref="firstview" class="firstview">
      <div class="firstview-question">
        <p
          v-for="(question, index) in questions"
          :key="index"
          ref="question"
          class="firstview-question__content"
          :style="{
            top: `${question.y}px`,
            left: `${question.x}px`,
          }"
        >
          {{ question.text }}
        </p>
      </div>
      <!-- <figure>
        <img
          v-for="(firstviewIllust, index) in firstviewIllusts"
          v-show="$store.
          imageSuffix !== null"
          :key="index"
          :src="
            require(`~/assets/images/statistics/firstview_illust_${
              index + 1
            }.png`)
          "
          alt=""
          class="firstview__illust"
          :style="{
            width: `${getFirstviewIllustSize(index).width}px`,
            marginLeft: `${getFirstviewIllustSize(index).x}px`,
            marginTop: `${getFirstviewIllustSize(index).y}px`,
          }"
        />
      </figure> -->
      <p class="firstview__title-en">Statistics</p>
      <h1 class="firstview__title" v-html="title" />
      <p class="firstview__description" />
    </section>

    <breadcrumb :contents="breadcrumbContents" />

    <div class="content-container">
      <div v-for="(content, index) in contents" :key="index" class="content">
        <p class="content__index">Data {{ `${index + 1}`.padStart(2, '0') }}</p>
        <p class="content__title" v-html="content.title" />
        <p class="content__title-en" v-html="content.titleEn" />

        <div class="content__statistics-container">
          <div class="content__statistics-box">
            <div
              v-for="(statistics, statisticsIndex) in content.statistics"
              :key="statisticsIndex"
              class="content-statistics"
              :class="{
                'content-statistics--large':
                  statisticsIndex === content.statistics.length - 1 &&
                  content.statistics.length % 2 === 1,
                'content-statistics--show-comment': statistics.showComment,
              }"
            >
              <!-- <figure class="content-statistics__image-container">
                <img
                  v-if="
                    statisticsIndex === content.statistics.length - 1 &&
                    content.statistics.length % 2 === 1
                  "
                  src="/images/illust/kagoshima.png"
                  alt=""
                  class="content-statistics__image-large"
                />
                <div
                  v-for="(image, imageIndex) in statistics.images"
                  :key="imageIndex"
                  class="content-statistics__image"
                >
                  <delayed-show
                    :modifier="statistics.isDelay ? 'scale' : 'no-move'"
                    :is-force="
                      isShowStatistics[index] &&
                      isShowStatistics[index][statisticsIndex]
                    "
                    :delay="statistics.isDelay ? imageIndex * 0.12 : 0"
                    @trigger="updateIsShowStatistics(index, statisticsIndex)"
                  >
                    <img
                      :src="image"
                      alt=""
                      class="content-statistics__image-resource"
                    />
                  </delayed-show>
                </div>
              </figure> -->
              <p class="content-statistics__title" v-html="statistics.title" />
              <p
                class="content-statistics__comment"
                v-html="statistics.comment"
              />
              <!-- <div class="content-statistics__number-container">
                <number
                  v-for="(number, numberIndex) in statistics.numbers"
                  :key="numberIndex"
                  :number="number.number"
                  :suffix="number.suffix"
                  :no-comma="number.noComma"
                  :delay="
                    number.delay ||
                    ($store.isSmartphone
                      ? 0
                      : 0.5 * (statisticsIndex % 2))
                  "
                  @finish="showComment(statistics)"
                />
              </div> -->
              <p
                class="content-statistics__link"
                @click="updateModalDescription(statistics.description)"
              >
                詳しく見る
              </p>
            </div>
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
import { gsap, Power0, Back } from 'gsap'
import breadcrumb from '@/components/molecules/breadcrumb'
import otherLinks from '@/components/molecules/otherLinks'
import number from '@/components/atoms/number'
import modal from '@/components/organisms/modal'
import delayedShow from '@/components/atoms/delayedShow'
import updateMeta from '@/plugins/updateMeta'

export default defineNuxtComponent({
  components: { breadcrumb, otherLinks, number, modal, delayedShow },
  data() {
    return {
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
          title: '数字で見るシナプス',
          link: '/statistics/',
        },
      ],
      title: '数字で見る<br>シナプス',
      isPreventResetQuestions: false,
      questions: [],
      questionTimeline: null,
      questionOffsetWidth: 600,
      questionTexts: [
        'どんな人たちが働いているの？',
        '鹿児島とはどんな関係？',
        'どれくらいの規模の会社なの？',
        '職種の割合は？',
        '男女比はどれくらい？',
        'どれくらいの歴史があるの？',
        '社員の年齢層は？',
        'サービスのユーザー層は？',
        'どんな事業をやっているの？',
        '通勤方法は？',
      ],
      isShowStatistics: [],
      firstviewIllusts: [
        {
          pc: {
            width: 730,
            x: 130,
            y: -20,
          },
          smartphone: {
            width: 360,
            x: 60,
            y: -20,
          },
        },
        {
          pc: {
            width: 100,
            x: -260,
            y: -180,
          },
          smartphone: {
            width: 50,
            x: -120,
            y: -80,
          },
        },
        {
          pc: {
            width: 120,
            x: -180,
            y: 180,
          },
          smartphone: {
            width: 70,
            x: -100,
            y: 85,
          },
        },
        {
          pc: {
            width: 100,
            x: 330,
            y: -100,
          },
          smartphone: {
            width: 50,
            x: 140,
            y: -80,
          },
        },
        {
          pc: {
            width: 70,
            x: 460,
            y: 30,
          },
          smartphone: {
            width: 35,
            x: 130,
            y: 110,
          },
        },
        {
          pc: {
            width: 80,
            x: -400,
            y: -10,
          },
          smartphone: {
            width: 40,
            x: -150,
            y: 10,
          },
        },
      ],
      contents: [
        {
          title: 'シナプスは<br class="only-pc">こんな会社です',
          titleEn: 'About culture',
          statistics: [
            {
              title: '創業年',
              numbers: [
                {
                  number: 2017,
                  noComma: true,
                  suffix: '年',
                },
              ],
              images: ['/images/illust/sakurajima.png'],
              comment: `桐生選手が100m陸上で、日本人初の9秒台（9.98秒）をマークした年です！`,
              description:
                'インターネットサービス「シナプス」の誕生は1995年ですが、実は株式会社シナプスの創業は 2017年です。親会社である株式会社グッドコミュニケーションズより、情報通信事業を継承する形で生まれ変わりました。',
            },
            {
              title: 'スタッフ数',
              numbers: [
                {
                  number: 36,
                  suffix: '人',
                },
              ],
              images: ['/images/illust/meeting.png'],
              comment: `このメンバーでサポート、ネットワーク運用をすべてまかなっています。`,
              description:
                'シナプスのスタッフ数は36名（2023年7月現在）。サービスのユーザー数規模から見ると多めの人数ですが、それはユーザーサポートもネットワーク運用も外部委託せずに、自社スタッフで運営しているからです。',
            },
            {
              title: '全ユーザーにおける<br>鹿児島の割合',
              numbers: [
                {
                  number: 97.9,
                  suffix: '%',
                },
              ],
              comment: `インターネットサービス「シナプス」ご利用ユーザーのほとんどが鹿児島県民…！`,
              description:
                '鹿児島にこだわる地域系プロバイダというだけあって、インターネットサービス「シナプス」ご利用ユーザーのほとんどが鹿児島の方々です。南北600kmの広大な土地をもつ鹿児島の隅から隅まで、地元のみなさまにご愛顧いただいています。',
            },
            {
              title: '平均残業時間',
              numbers: [
                {
                  number: 3.89,
                  suffix: '時間/１人月',
                },
              ],
              images: ['/images/illust/clock.png'],
              caption: '2022年4月～2023年3月まで',
              comment:
                '前期の残業時間5.08時間より、約1.2時間の減少となりました。',
              description:
                '残業時間としては比較的少ないと思いますが、働く時間よりは、どのように生産性を向上させて、かつ価値を創出し続けるか？に着目しています。単にラクな方がいいではなく、どうやってみんなに持てるチカラを存分に発揮してもらえるか？の試行錯誤を続けています。',
            },
            {
              title: '有休取得率',
              numbers: [
                {
                  number: 86.62,
                  suffix: '%',
                },
              ],
              images: [
                '/images/statistics/graph_2.png',
                '/images/illust/ship.png',
                '/images/illust/surf.png',
              ],
              caption: '2022年度',
              comment:
                '前期より約14ポイント増加!2年連続の増加。みんな協力し、計画的な取得ができたかな。',
              description:
                'シナプスが目指すのはワークライフバランスではなく、ワークライフインテグレーション。仕事もプライベートも自分のかけがえのない人生の大切な時間。両方ともに充実させられる会社・制度を目指します。',
            },
          ],
        },
        {
          title: 'シナプスはこんな<br>メンバーが働いています',
          titleEn: 'About member',
          statistics: [
            {
              title: '社員の平均年齢',
              numbers: [
                {
                  number: 41.61,
                  suffix: '歳',
                },
              ],
              images: ['/images/illust/human_3.png'],
              comment: `前期より1.2歳上昇しました。ベテランスタッフの経験とフレッシュな若手のシナジーに期待!`,
              description:
                '前期は厳選採用した、3名のフレッシュな仲間が加わりました。しかもみんな通信業界は未経験、新しいことに果敢にチャレンジする姿勢など、ベテラン側が学ぶことも多いです。仲間になってくれて良かった!',
            },
            {
              title: '男女比率',
              numbers: [
                {
                  number: 36,
                },
                {
                  number: 64,
                },
              ],
              images: ['/images/illust/gender_ratio.png'],
              comment: `女性比率は前期より1ポイント低下。もっと女性が働きやすい職場にしないと!`,
              description:
                '男女比率としては男性がやや多め。会社幹部8名中、女性は執行役員と課長の2名のみであとは男性。多様な考え方から新しい価値を生み出すためにも、ここは課題だよなと思っています。',
            },
            {
              title: '社員の平均勤続年数',
              numbers: [
                {
                  number: 13.89,
                  suffix: '',
                },
              ],
              images: ['/images/illust/work_year.png'],
              comment: `前期より0.4年増加しました。「シナプスで働き続けたい」と思われるように、明るい未来を共有します。`,
              description:
                'どの会社でも通用する人材を育成し、そんな優秀な人材に選んでもらえるシナプスになる…これが一つの理想。シナプス社員には社外交流や研修に積極的に参加してもらい、マンネリ化を防いでいきます。',
            },
            {
              title: '地元出身の社員の比率',
              numbers: [
                {
                  number: 94.0,
                  suffix: '%',
                },
              ],
              images: [
                '/images/statistics/graph_1.png',
                '/images/illust/satsuma.png',
              ],
              comment: `圧倒的な鹿児島出身者率…前期からは3ポイント減少も、それでも多い!`,
              description:
                'シナプスのミッション「インターネットで、鹿児島の毎日を笑顔にします。」のベースにあるものは、鹿児島に対する想いです。自分や家族を育んでくれた地元・鹿児島を、ICTでもっと笑顔あふれるまちにすること。それは鹿児島のためのみならず、グローバル化の進む世界での新しい挑戦として、きっと他の地域にも役立つはず!',
            },
            {
              title: '通勤手段',
              comment: '本社オフィスはアクセス抜群で、通勤手段も豊富です。',
              numbers: [
                {
                  number: 0,
                },
              ],
              isDelay: true,
              images: [
                '/images/statistics/graph_3_1.png',
                '/images/statistics/graph_3_2.png',
                '/images/statistics/graph_3_3.png',
                '/images/statistics/graph_3_4.png',
                '/images/statistics/graph_3_5.png',
                '/images/statistics/graph_3_6.png',
                '/images/statistics/graph_3_7.png',
                '/images/illust/train.png',
                '/images/illust/town.png',
                '/images/illust/bycycle.png',
                '/images/illust/car.png',
                '/images/illust/couple.png',
              ],
              description:
                '地方の通勤手段は自家用車中心のイメージが大きいですが、シナプス社員の通勤手段はバラエティに富んでいます。交通の要である鹿児島中央駅にほど近い立地で、とっても便利！',
            },
          ],
        },
        {
          title: 'シナプスは<br>技術の会社です',
          titleEn: 'About technology',
          statistics: [
            {
              title: 'スタッフの<br>エンジニアの比率',
              numbers: [
                {
                  number: 36.1,
                  suffix: '%',
                },
              ],
              comment: `個性あふれるエンジニア陣が、鹿児島のインターネットを支えています！`,
              images: ['/images/illust/engineer_ratio.png'],
              description:
                'シナプスのスタッフの3割以上はエンジニアです。一口に「エンジニア」といっても、ネットワークインフラからWebのフロントエンドまでその領域はさまざま。広い範囲で高い技術を持ったエンジニアが、安心安全なインターネットサービスの提供支えています。',
            },
            {
              title: 'ネットワーク稼働率',
              numbers: [
                {
                  number: 97.235,
                  suffix: '%',
                },
              ],
              images: ['/images/illust/internet.png'],
              caption:
                '集計期間：2022年4月～2023年3月末まで　自社ネットワークにおいて',
              comment: `申し訳ございません、前年度より大幅に下がりました。`,
              description:
                'シナプスのネットワーク稼働率は、97.235%。ほとんどの区間において冗長化していますが、一部の冗長化していない区間にて長時間のサービス停止を発生させてしまいました。稼働率100%に向けて、設備増強を進めてまいります｡',
            },
            {
              title: 'トラフィック量',
              comment: `右肩上がりでどんどん急増中！`,
              numbers: [
                {
                  number: 36449,
                  delay: 1,
                },
              ],
              isDelay: true,
              images: [
                '/images/statistics/graph_4_base.png',
                '/images/statistics/graph_4_1.png',
                '/images/statistics/graph_4_2.png',
                '/images/statistics/graph_4_3.png',
                '/images/statistics/graph_4_4.png',
                '/images/statistics/graph_4_5.png',
                '/images/illust/effect.png',
              ],
              description:
                'シナプスのバックボーンネットワークのトラフィックは2023年5月現在 28.7 Gbps。前年比1.28倍ほどのペースで増加しておりまして、今後も増加傾向にあります。',
            },
            {
              title: '2022年度に主催・共催<br>／協力したイベント数',
              numbers: [
                {
                  number: 3,
                },
              ],
              images: ['/images/illust/event.png'],
              caption: '2022年度の実績',
              comment: `新しい形のイベント開催を模索中です！`,
              description:
                'コロナ禍の影響もあり、昨年度はイベント開催数が大幅に減りました。この数年間で、イベントのあり方自体が大きく変わってきています。今の時代にあったイベントとはどういうものなのか、鹿児島にはどのようなイベントが合っているのか、あらためて考えていきたいと思います。',
            },
          ],
        },
      ],
      modalDescription: null,
    }
  },
  head({ $config, $updateMeta, _route }) {
    return $updateMeta({
      title: $config.public.titleTemplate.replace(/%s/, '数字で見るシナプス'),
      url: `${$config.public.url}${_route.path.slice(1)}`,
    })
  },
  async mounted() {
    await this.$sleep(50)
    this.resetQuestions()

    if (!this.$store.isSmartphone) {
      window.addEventListener('resize', this.resetQuestions)
    }
  },
  destroyed() {
    this.questionTimeline && this.questionTimeline.kill()
    window.removeEventListener('resize', this.resetQuestions)
  },
  methods: {
    async resetQuestions() {
      if (this.isPreventResetQuestions) {
        return
      }

      this.questionOffsetWidth = this.$store.isSmartphone ? 300 : 600
      this.isPreventResetQuestions = true
      this.questionTimeline && this.questionTimeline.kill()
      await this.setQuestions()
      this.$fontReload()
      await this.$sleep(1000)
      await this.showQuestions()
      this.animateQuestions()
      this.isPreventResetQuestions = false
    },
    async showQuestions() {
      await Promise.all(
        this.$refs.question.map((element) => {
          return new Promise((resolve) => {
            gsap.set(element, {
              opacity: 0,
              scale: 0.6,
            })

            gsap.to(element, {
              duration: 0.5,
              opacity: 1,
              scale: 1,
              delay: Math.random() * 0.5,
              ease: Back.easeOut.config(1.4),
              onComplete: resolve,
            })
          })
        })
      )
    },
    animateQuestions() {
      let prevValue = 0
      const param = {
        value: prevValue,
      }

      this.questionTimeline = gsap.timeline({ repeat: -1 }).to(param, {
        duration: 30,
        value: -this.$refs.firstview.clientWidth,
        ease: Power0.easeNone,
        onUpdate: () => {
          const diff = param.value - prevValue

          this.$refs.question.forEach((element, index) => {
            this.questions[index].diffX += diff

            const targetPosition =
              this.questions[index].x + this.questions[index].diffX

            if (targetPosition < -this.questionOffsetWidth) {
              this.questions[index].diffX +=
                this.$refs.firstview.clientWidth + this.questionOffsetWidth * 2
            }

            gsap.set(element, {
              x: this.questions[index].diffX,
            })
          })

          prevValue = param.value
        },
        onComplete: () => {
          prevValue = 0
        },
      })
    },
    async setQuestions() {
      const questionWidth = this.$store.isSmartphone ? 300 : 600
      const questionHeight = this.$store.isSmartphone ? 80 : 160
      const rowNumber = Math.floor(
        (this.$refs.firstview.clientWidth + this.questionOffsetWidth * 2) /
          questionWidth
      )
      const columnNumber = Math.floor(
        this.$refs.firstview.clientHeight / questionHeight
      )

      // this.$set(this, 'questions', [])
      this.questions = []

      await this.$sleep(50)

      const rowOffset = []

      Array(rowNumber * columnNumber)
        .fill()
        .forEach((value, index) => {
          const columnIndex = index % columnNumber
          const rowIndex = Math.floor(index / columnNumber)
          if (!rowOffset[columnIndex]) {
            rowOffset[columnIndex] =
              (Math.random() - 0.5) * this.questionOffsetWidth
          }

          // this.$set(this.questions, index, {
          //   text: this.questionTexts[index % this.questionTexts.length],
          //   x: rowIndex * questionWidth + rowOffset[columnIndex],
          //   y:
          //     columnIndex * questionHeight +
          //     (Math.random() - 0.5) *
          //       (this.$store.isSmartphone ? 20 : 40),
          //   diffX: 0,
          // })
          this.questions[index] = {
            text: this.questionTexts[index % this.questionTexts.length],
            x: rowIndex * questionWidth + rowOffset[columnIndex],
            y:
              columnIndex * questionHeight +
              (Math.random() - 0.5) *
                (this.$store.isSmartphone ? 20 : 40),
            diffX: 0,
          }
        })
    },
    updateIsShowStatistics(index, statisticsIndex) {
      if (!this.isShowStatistics[index]) {
        // this.$set(this.isShowStatistics, index, [])
        this.isShowStatistics[index] = []
      }
      // this.$set(this.isShowStatistics[index], statisticsIndex, true)
      this.isShowStatistics[index][statisticsIndex] = true
    },
    showComment(statistics) {
      // this.$set(statistics, 'showComment', true)
      statistics.showComment = true
    },
    getFirstviewIllustSize(index) {
      const device = this.$store.isSmartphone ? 'smartphone' : 'pc'
      return this.firstviewIllusts[index][device]
    },
    updateModalDescription(description) {
      this.modalDescription = description
    },
  },
})
</script>

<style scoped lang="scss">
.container {
  position: relative;
  min-width: $width-2;
  overflow: hidden;

  :deep(.breadcrumb) {
    top: 610px;
  }
}

.firstview {
  position: relative;
  height: 690px;
  text-align: center;
  padding-top: 240px;
  box-sizing: border-box;
  overflow: hidden;

  &__illust {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &__title-en {
    position: relative;
    @include fontTsuku;
    font-size: 20px;
  }

  &__title {
    position: relative;
    margin-top: 20px;
    @include fontTsuku;
    font-size: 44px;
    font-weight: bold;
    letter-spacing: 0.1em;
  }
}

.firstview-question {
  position: absolute;
  top: 0;
  left: 0;

  &__content {
    position: absolute;
    line-height: 1em;
    padding: 40px;
    @include fontTsuku;
    color: $color-gray-1;
    font-size: 32px;
    background-color: $color-gray-6;
    border-radius: 32px;
    border-bottom-right-radius: 0;
    white-space: nowrap;
    opacity: 0;
  }
}

.content {
  position: relative;
  max-width: $width-2;
  margin: 0 auto;
  padding: 8px 0 156px;

  &__index {
    padding-left: 24px;
    @include fontTsuku;
  }

  &__title {
    line-height: 1.5em;
    padding-left: 24px;
    @include fontTsuku;
    font-size: 56px;
    white-space: nowrap;
  }

  &__title-en {
    position: absolute;
    top: 48px;
    left: 132px;
    @include fontTsuku;
    font-size: 180px;
    transform-origin: left top;
    transform: rotate(90deg);
    letter-spacing: 0.1em;
    white-space: nowrap;
    opacity: 0.03;
  }

  &__statistics-container {
    position: relative;
    width: 1144px;
    margin-top: 200px;
    margin-left: 140px;
    padding: 1px 0;
    background-color: $color-gray-2;
  }

  &__statistics-box {
    display: flex;
    flex-wrap: wrap;
    margin-top: -160px;
    margin-left: 80px;
  }

  &:nth-child(1) {
    .content-statistics {
      &:nth-child(1) {
        .content-statistics__image {
          width: 480px;
          margin-top: -30px;
          margin-left: -10px;
          opacity: 0.2;
        }
      }

      &:nth-child(2) {
        .content-statistics__image {
          width: 120px;
          margin-top: 90px;
          margin-left: -120px;
        }
      }

      &:nth-child(4) {
        .content-statistics__image {
          width: 90px;
          margin-top: 90px;
          margin-left: -120px;
        }

        :deep(.number__suffix) {
          display: block;
          margin-top: 16px;
        }
      }

      &:nth-child(5) {
        .content-statistics__image-large {
          top: -32px;
          right: -16px;
          width: 640px;
        }

        .content-statistics__image {
          &:nth-child(2) {
            margin-top: -24px;
            margin-left: 220px;
            width: 340px;
          }

          &:nth-child(3) {
            margin-top: 90px;
            margin-left: 40px;
            width: 140px;
          }

          &:nth-child(4) {
            margin-top: 80px;
            margin-left: 350px;
            width: 180px;
          }
        }

        :deep() {
          .number {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(160px, -70px) scale(0.45);

            &__number {
              color: white;
            }
          }
        }
      }
    }
  }

  &:nth-child(2) {
    .content-statistics {
      &:nth-child(1) {
        .content-statistics__image {
          width: 90px;
          margin-top: 60px;
          margin-left: 140px;
        }
      }

      &:nth-child(2) {
        .content-statistics__image {
          margin-top: 20px;
          width: 260px;
        }

        :deep(.number) {
          position: absolute;
          top: 265px;
          left: 50%;
          transform: translateX(-50%) scale(0.4);

          &:nth-child(1) {
            margin-left: -80px;
          }

          &:nth-child(2) {
            margin-left: 80px;

            .number__number {
              color: $color-green-1;
            }
          }
        }

        .content-statistics__comment {
          left: 360px;
        }
      }

      &:nth-child(3) {
        .content-statistics__image {
          width: 280px;
        }

        :deep(.number) {
          position: absolute;
          top: 64px;
          left: 50%;
          transform: translateX(-50%) scale(0.45);
        }

        .content-statistics__comment {
          bottom: 160px;
        }
      }

      &:nth-child(4) {
        .content-statistics__image {
          &:nth-child(1) {
            width: 240px;
            margin-top: -10px;
          }

          &:nth-child(2) {
            width: 200px;
            margin-top: 60px;
            margin-left: -100px;
          }
        }

        :deep() {
          .number {
            transform: translate(50px, 85px) scale(0.4);
            &__number {
              color: white;
            }
          }
        }
      }

      &:nth-child(5) {
        .content-statistics__image {
          &:nth-child(1) {
            width: 240px;
            margin-top: -10px;
          }

          &:nth-child(2) {
            width: 100px;
            margin-top: -99px;
            margin-left: 239px;
          }

          &:nth-child(3) {
            width: 146px;
            margin-top: -42px;
            margin-left: 271px;
          }

          &:nth-child(4) {
            width: 128px;
            margin-top: 44px;
            margin-left: 257px;
          }

          &:nth-child(5) {
            width: 126px;
            margin-top: 56px;
            margin-left: 199px;
          }

          &:nth-child(6) {
            width: 150px;
            margin-top: 49px;
            margin-left: 110px;
          }

          &:nth-child(7) {
            width: 152px;
            margin-top: -100px;
            margin-left: 110px;
          }

          &:nth-child(8) {
            width: 152px;
            margin-top: -41px;
            margin-left: 107px;
          }

          &:nth-child(9) {
            width: 92px;
            margin-top: 90px;
          }

          &:nth-child(10) {
            width: 142px;
            margin-top: 100px;
            margin-left: 360px;
          }

          &:nth-child(11) {
            width: 42px;
            margin-top: 135px;
            margin-left: 90px;
          }

          &:nth-child(12) {
            width: 70px;
            margin-top: 20px;
            margin-left: 400px;
          }

          &:nth-child(13) {
            width: 40px;
            margin-top: 140px;
            margin-left: 260px;
          }
        }

        :deep(.number) {
          transform: translate(50px, 85px) scale(0.4);
        }
      }
    }
  }

  &:nth-child(3) {
    .content-statistics {
      &:nth-child(1) {
        .content-statistics__image {
          width: 250px;
          margin-top: 30px;
        }

        :deep() {
          .number {
            position: absolute;
            top: 120px;
            right: 0;
            left: 0;
            transform: scale(0.6);

            &__number {
              color: $color-green-1;
            }
          }
        }
      }

      &:nth-child(2) {
        .content-statistics__image {
          width: 140px;
          margin-top: 60px;
          margin-left: -120px;
        }
      }

      &:nth-child(3) {
        .content-statistics__title {
          transform: translate(-64px, -12px);
        }

        .content-statistics__image {
          &:nth-child(1) {
            width: 343px;
            margin-top: 137px;
            margin-left: -7px;
          }

          &:nth-child(2) {
            width: 62px;
            margin-top: 60px;
            margin-left: -148px;
          }

          &:nth-child(3) {
            width: 62px;
            margin-top: 48px;
            margin-left: -84px;
          }

          &:nth-child(4) {
            width: 62px;
            margin-top: 39px;
            margin-left: -11px;
          }

          &:nth-child(5) {
            width: 62px;
            margin-top: 23px;
            margin-left: 60px;
          }

          &:nth-child(6) {
            width: 21px;
            margin-top: 24px;
            margin-left: 130px;
          }

          &:nth-child(7) {
            width: 140px;
            margin-top: -110px;
            margin-left: 133px;
          }
        }

        :deep(.number) {
          transform: translate(130px, -30px) scale(0.28);
        }

        .content-statistics__comment {
          width: 200px;
          bottom: 240px;
          left: -100px;
        }
      }

      &:nth-child(4) {
        .content-statistics__image {
          width: 120px;
          margin-left: -80px;
        }

        :deep() {
          .number {
            position: absolute;
            top: 140px;
            left: 50%;
            transform: translateX(0px) scale(0.6);

            &__number {
              display: block;
              width: 1em;
              text-align: center;
            }
          }
        }
      }
    }
  }

  &:nth-child(even) {
    .content {
      &__index {
        padding-left: initial;
        margin-left: calc(50% - 32px);
      }

      &__title {
        padding-left: initial;
        margin-left: calc(50% - 32px);
      }

      &__title-en {
        left: calc(100% + 64px);
      }

      &__statistics-container {
        margin-left: -88px;
      }
    }
  }
}

.content-statistics {
  position: relative;
  width: 410px;
  height: 440px;
  margin: 36px;
  padding-top: 48px;
  border-radius: 32px;
  background-color: white;
  @include boxShadow;
  box-sizing: border-box;

  &--show-comment {
    .content-statistics__comment {
      opacity: 1;
      transform: scale(1);
    }
  }

  &:nth-child(odd) {
    .content-statistics__comment {
      left: -24px;
      border-bottom-right-radius: 0;
    }

    .content-statistics__link {
      border-bottom-right-radius: 0;
    }
  }

  &:nth-child(even) {
    .content-statistics__comment {
      left: 140px;
      border-bottom-left-radius: 0;
    }

    .content-statistics__link {
      border-bottom-left-radius: 0;
    }
  }

  &--large {
    width: 900px;

    .content-statistics__comment {
      left: 680px;
    }

    .content-statistics__title {
      position: absolute;
      top: 128px;
      left: 56px;
      text-align: left;
    }

    .content-statistics__link {
      border-bottom-right-radius: 0;
    }
  }

  &__image-container {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
  }

  &__image {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &__image-resource {
    width: 100%;
  }

  &__image-large {
    position: absolute;
    top: 0;
    right: -64px;
    width: 560px;
    opacity: 0.2;
  }

  &__title {
    position: relative;
    line-height: 1.5em;
    text-align: center;
    font-size: 32px;
    font-weight: bold;
  }

  &__comment {
    position: absolute;
    bottom: 72px;
    width: 260px;
    line-height: 1.8em;
    padding: 20px 24px;
    @include fontTsuku;
    font-size: 13px;
    border-radius: 32px;
    border: 1px solid $color-gray-4;
    background-color: white;
    opacity: 0;
    transform: scale(0.8);
    transition-property: opacity, transform;
    transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
    transition-duration: 0.3s;
  }

  &__link {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 56px;
    line-height: 56px;
    text-align: center;
    color: white;
    font-weight: bold;
    font-size: 18px;
    background-color: $color-black-1;
    border-bottom-right-radius: 32px;
    border-bottom-left-radius: 32px;
    cursor: pointer;
    transition: opacity 0.3s;

    &:before {
      font-family: 'Font Awesome 5 Pro';
      content: '\f067';
    }

    @include hover {
      opacity: 0.6;
    }
  }

  :deep(.number) {
    position: relative;
  }
}

@include smartphone {
  .container {
    min-width: initial;

    :deep(.breadcrumb) {
      top: 380px;
    }
  }

  .firstview {
    height: 410px;
    padding-top: 160px;

    &__title-en {
      position: absolute;
      top: 220px;
      right: 0;
      left: 0;
      font-size: 12px;
    }

    &__title {
      margin-top: initial;
      font-size: 24px;
    }
  }

  .firstview-question {
    &__content {
      padding: 20px;
      font-size: 16px;
      border-radius: 16px;
      border-bottom-right-radius: 0;
    }
  }

  .content-container {
    padding-top: 32px;
  }

  .content {
    padding: 32px 0;

    &__index {
      font-size: 12px;
      padding-left: $padding-1;
    }

    &__title {
      font-size: 22px;
      margin-top: 8px;
      padding-left: $padding-1;
    }

    &__title-en {
      display: none;
    }

    &__statistics-container {
      position: initial;
      width: calc(100% - 40px);
      margin-top: -16px;
      margin-left: initial;
      padding: 1px 0 1px 40px;
      box-sizing: border-box;
    }

    &__statistics-box {
      display: block;
      margin-top: initial;
      margin-left: initial;
    }

    &:nth-child(1) {
      .content-statistics {
        &:nth-child(1) {
          :deep(.number) {
            margin-top: 16px;
          }

          .content-statistics__image {
            width: 400px;
            margin-top: -60px;
          }
        }

        &:nth-child(2) {
          .content-statistics__image {
            width: 70px;
            margin-top: 30px;
            margin-left: -120px;
          }
        }

        &:nth-child(4) {
          .content-statistics__image {
            width: 50px;
            margin-top: 40px;
          }
        }

        &:nth-child(5) {
          .content-statistics__image-large {
            width: 320px;
          }

          .content-statistics__image {
            &:nth-child(2) {
              margin-top: 2px;
              margin-left: 0;
              width: 140px;
            }

            &:nth-child(3) {
              margin-top: 30px;
              margin-left: -100px;
              width: 100px;
            }

            &:nth-child(4) {
              margin-top: 30px;
              margin-left: 90px;
              width: 120px;
            }
          }

          :deep(.number) {
            transform: translate(-82px, -32px) scale(0.25);
            white-space: nowrap;
          }
        }
      }
    }

    &:nth-child(2) {
      .content-statistics {
        &:nth-child(1) {
          .content-statistics__image {
            width: 60px;
            margin-top: 40px;
            margin-left: 130px;
          }

          :deep(.number) {
            margin-top: 20px;
          }
        }

        &:nth-child(2) {
          height: 300px;

          .content-statistics__image {
            margin-top: 0;
            width: 220px;
          }

          :deep(.number) {
            top: 175px;
            transform: translateX(-50%) scale(0.4);

            &:nth-child(1) {
              margin-left: -70px;
            }

            &:nth-child(2) {
              margin-left: 70px;
            }
          }
        }

        &:nth-child(3) {
          height: 300px;

          .content-statistics__image {
            top: 160px;
            width: 200px;
          }

          :deep(.number) {
            top: 38px;
            transform: translateX(-50%) scale(0.45);
          }
        }

        &:nth-child(4) {
          .content-statistics__image {
            &:nth-child(1) {
              width: 140px;
              margin-top: 2px;
            }

            &:nth-child(2) {
              width: 120px;
              margin-top: 40px;
              margin-left: -90px;
            }
          }

          :deep(.number) {
            transform: translate(14px, 50px) scale(0.4);
          }
        }

        &:nth-child(5) {
          .content-statistics__image {
            &:nth-child(2) {
              width: 40px;
              margin-top: -28px;
              margin-left: 29px;
            }

            &:nth-child(3) {
              width: 58px;
              margin-top: -6px;
              margin-left: 43px;
            }

            &:nth-child(4) {
              width: 52px;
              margin-top: 29px;
              margin-left: 37px;
            }

            &:nth-child(5) {
              width: 50px;
              margin-top: 34px;
              margin-left: 13px;
            }

            &:nth-child(6) {
              width: 58px;
              margin-top: 31px;
              margin-left: -23px;
            }

            &:nth-child(7) {
              width: 60px;
              margin-top: -28px;
              margin-left: -23px;
            }

            &:nth-child(8) {
              width: 36px;
              margin-top: 40px;
              margin-left: -80px;
            }

            &:nth-child(9) {
              width: 80px;
              margin-top: 30px;
              margin-left: 110px;
            }

            &:nth-child(10) {
              width: 42px;
              margin-top: -30px;
              margin-left: -90px;
            }

            &:nth-child(11) {
              width: 70px;
              margin-top: -30px;
              margin-left: 110px;
            }

            &:nth-child(12) {
              width: 40px;
              margin-top: 10px;
              margin-left: -130px;
            }
          }

          :deep(.number) {
            transform: translate(50px, 85px) scale(0.4);
          }
        }
      }
    }

    &:nth-child(3) {
      .content-statistics {
        &:nth-child(1) {
          height: 300px;

          .content-statistics__image {
            margin-top: 60px;
          }

          :deep(.number) {
            top: 70px;
            transform: scale(1);
          }
        }

        &:nth-child(2) {
          height: 320px;

          .content-statistics__image {
            width: 140px;
            margin-top: 30px;
            margin-left: 0;
          }
        }

        &:nth-child(3) {
          .content-statistics__title {
            transform: translate(-32px, -6px);
          }

          .content-statistics__image {
            &:nth-child(1) {
              width: 242px;
              margin-top: 65px;
              margin-left: -7px;
            }

            &:nth-child(2) {
              width: 30px;
              margin-top: 34px;
              margin-left: -108px;
            }

            &:nth-child(3) {
              width: 28px;
              margin-top: 30px;
              margin-left: -61px;
            }

            &:nth-child(4) {
              width: 29px;
              margin-top: 18px;
              margin-left: -11px;
            }

            &:nth-child(5) {
              width: 35px;
              margin-top: -9px;
              margin-left: 38px;
            }

            &:nth-child(6) {
              width: 11px;
              margin-top: -11px;
              margin-left: 86px;
            }

            &:nth-child(7) {
              width: 76px;
              margin-top: -85px;
              margin-left: 90px;
            }
          }

          :deep(.number) {
            transform: translate(86px, -56px) scale(0.2);
          }
        }

        &:nth-child(4) {
          height: 300px;

          .content-statistics__image {
            margin-top: 5px;
            margin-left: -60px;
          }

          :deep(.number) {
            top: 90px;
          }
        }
      }
    }

    &:nth-child(even) {
      .content {
        &__index {
          margin-left: 72px;
        }

        &__title {
          margin-left: 72px;
        }

        &__title-en {
          left: initial;
        }

        &__statistics-container {
          margin-left: auto;
          padding-left: 0;
        }
      }

      .content-statistics {
        margin-left: -20px;
      }
    }
  }

  .content-statistics {
    width: 316px;
    max-width: calc(100% + 24px);
    height: 234px;
    margin: 40px 0;
    padding-top: 20px;
    border-top-left-radius: 0;

    &:nth-child(odd) {
      .content-statistics__link {
        border-bottom-right-radius: 16px;
      }
    }

    &:nth-child(even) {
      .content-statistics__link {
        border-bottom-left-radius: 16px;
      }
    }

    &--large {
      width: 316px;

      .content-statistics__title {
        position: relative;
        top: initial;
        left: initial;
        text-align: center;
      }

      .content-statistics__link {
        border-bottom-right-radius: 16px;
      }
    }

    &__title {
      font-size: 16px;
    }

    &__comment {
      display: none;
    }

    &__link {
      height: 40px;
      line-height: 40px;
      font-size: 14px;
    }

    &__image-large {
      right: -32px;
      width: 320px;
    }
  }
}
</style>
