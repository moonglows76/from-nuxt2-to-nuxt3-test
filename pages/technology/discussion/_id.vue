<template>
  <div class="container">
    <section class="firstview" :style="`background-image: url(${thumbnail})`">
      <breadcrumb :contents="breadcrumbContents" />

      <!-- TODOlater add social count -->
      <p class="firstview__category">
        {{ category }}
      </p>
      <h1 class="firstview__title-container">
        <div v-for="(title, index) in titles" :key="index">
          <p class="firstview__title">
            {{ title }}
          </p>
          <br />
        </div>
      </h1>
      <p class="firstview__vol-container">
        <span class="firstview__vol">
          {{ vol }}
        </span>
      </p>
    </section>

    <div class="introduction">
      <div class="introduction__box">
        <p class="introduction__title">Agenda & Member</p>
        <p class="introduction__description">
          {{ introduction }}
        </p>

        <div class="member-container">
          <div v-for="(member, index) in members" :key="index" class="member">
            <div
              class="member__thumbnail"
              :style="`background-image: url(${member.thumbnail})`"
            />
            <div class="member__meta">
              <p class="member__name">
                {{ member.name }}
              </p>
              <p class="member__role">
                {{ member.role }}
              </p>
              <div class="member__description" v-html="member.description" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <background-layer>
      <div class="content-container">
        <div class="content" v-html="content" />
      </div>
      <social-buttons />
    </background-layer>

    <div class="link-container">
      <div
        v-for="(link, index) in links"
        v-show="link"
        :key="index"
        class="link"
      >
        <nuxt-link v-if="link" :to="link.link" class="link__href">
          <p class="link__vol">
            {{ link.vol }}
          </p>
          <div
            class="link__thumbnail"
            :style="`background-image: url(${link.thumbnail})`"
          />
          <div class="link__title-container">
            <div class="link__meta">
              <p class="link__category">
                {{ link.category }}
              </p>
              <p class="link__date">
                {{ link.date }}
              </p>
            </div>
            <p class="link__title">
              {{ link.title }}
            </p>
            <p class="link__description">
              {{ link.description }}
            </p>
          </div>
        </nuxt-link>
      </div>
    </div>

    <other-links />
  </div>
</template>

<script>
import moment from 'moment'
import breadcrumb from '@/components/molecules/breadcrumb'
import otherLinks from '@/components/molecules/otherLinks'
import backgroundLayer from '@/components/atoms/backgroundLayer'
import socialButtons from '@/components/molecules/socialButtons'
import fetchWordpress from '@/plugins/fetchWordpress'
import updateMeta from '@/plugins/updateMeta'

export default {
  components: {
    breadcrumb,
    otherLinks,
    backgroundLayer,
    socialButtons,
  },
  async asyncData({ $axios, params, route }) {
    const [
      { prevLink, nextLink, targetLink, totalCount, targetIndex },
      { data: personData },
      { data: categoryData },
    ] = await Promise.all([
      await fetchWordpress({
        route,
        params,
        $axios,
        base: 'discussion',
      }),
      await $axios.get(`${process.env.apiEndpoint}person?_embed&per_page=100`),
      await $axios.get(`${process.env.apiEndpoint}categories?per_page=100`)
    ])

    const getLinkProps = (link) => {
      return {
        link: `/technology/discussion/${link.slug}/`,
        thumbnail:
          link?._embedded?.['wp:featuredmedia']?.[0]?.source_url || null,
        title: link.title?.rendered?.replace(/<br>/g, ''),
        category: link.categories
          ? categoryData?.find?.((category) => {
              return category.id === link?.categories?.[0]
            })?.name
          : '',
        date: moment(link.date)?.format?.('YYYY.MM.DD'),
        description: link.acf?.introduction,
      }
    }

    const title = targetLink.title?.rendered?.replace(/<br>/g, '')

    return {
      breadcrumbContents: [
        {
          title: 'ホーム',
          link: '/',
        },
        {
          title: 'シナプスの技術',
          link: '/technology/',
        },
        {
          title: '座談会',
          link: '/technology/discussion/',
        },
        {
          title,
          link: `/technology/discussion/${params.id}/`,
        },
      ],
      titles: targetLink.title.rendered.split('<br>'),
      category: targetLink.categories
        ? categoryData.find((category) => {
            return category.id === targetLink.categories[0]
          })?.name
        : '',
      vol: `${totalCount - targetIndex}`.padStart(2, '0'),
      introduction: targetLink.acf.introduction,
      content: targetLink.content.rendered,
      thumbnail:
        targetLink?._embedded?.['wp:featuredmedia']?.[0]?.source_url || null,
      thumbnailMeta:
        targetLink?._embedded?.['wp:featuredmedia']?.[0]?.media_details,
      members:
        targetLink.acf.persons &&
        targetLink.acf.persons.map((person) => {
          const targetPersonData = personData.find((_person) => {
            return _person.id === person.ID
          })

          return {
            thumbnail:
              targetPersonData?._embedded?.['wp:featuredmedia']?.[0]
                ?.source_url || null,
            name: targetPersonData.title.rendered,
            role: targetPersonData.acf.role,
            description: targetPersonData.content.rendered,
          }
        }),
      personData:
        personData &&
        personData.map((_personData) => {
          return {
            nickname: _personData.acf.nickname,
            thumbnail:
              _personData?._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
              null,
          }
        }),
      links: [
        prevLink
          ? Object.assign(getLinkProps(prevLink), {
              vol: `${totalCount - targetIndex + 1}`.padStart(2, '0'),
            })
          : null,
        nextLink
          ? Object.assign(getLinkProps(nextLink), {
              vol: `${totalCount - targetIndex - 1}`.padStart(2, '0'),
            })
          : null,
      ],
    }
  },
  head() {
    return updateMeta({
      title: process.env.titleTemplate.replace(/%s/, this.titles.join('')),
      url: `${process.env.url}${this.$route.path.slice(1)}`,
      image: this.thumbnail
        ? {
            src: this.thumbnail,
            width: this.thumbnailMeta.width,
            height: this.thumbnailMeta.height,
          }
        : null,
    })
  },
  async mounted() {
    this.fontReload()
    this.content = this.convertSpeechShortCodes(this.content)
    this.content = this.convertFootnoteShortCodes(this.content)
    this.content = this.convertFootnote2ShortCodes(this.content)
    this.content = this.convertLinkcardShortCodes(this.content)

    await this.sleep(50)
    this.fontReload()
  },
  methods: {
    parseParams(shortcode, params) {
      const keyValues = shortcode.match(
        /([^ ]*?)=(&#8221;|&#8243;|&#8220;)(.*?)(&#8221;|&#8243;|&#8220;)/g
      )

      if (!keyValues) {
        return
      }

      keyValues.forEach((keyValue) => {
        const _params = keyValue.match(
          /(.*?)=(&#8221;|&#8243;|&#8220;)(.*?)(&#8221;|&#8243;|&#8220;)/
        )
        params[_params[1]] = _params[3]
      })
    },
    convertSpeechShortCodes(content) {
      const speechShortCodes = content.match(/\[吹き出し (.*?)\]/gs)

      if (speechShortCodes) {
        speechShortCodes.forEach((speechShortCode) => {
          const params = {
            名前: '',
            発言文: '',
          }

          this.parseParams(speechShortCode, params)

          content = content.replace(
            speechShortCode,
            `
          <span class="comment">
            <span class="comment__meta">
              <span class="comment__thumbnail" style="background-image: url(${
                this.personData.find((_personData) => {
                  return _personData.nickname === params['名前']
                })?.thumbnail
              })"></span>
              <span class="comment__name">${params['名前']}</span>
            </span>
            <span class="comment__description">
              ${params['発言文']}
            </span>
          </span>
        `
          )
        })
      }

      return content
    },
    convertFootnoteShortCodes(content) {
      const footnoteShortCodes = content.match(/\[注釈（画像つき） (.*?)\]/gs)

      if (footnoteShortCodes) {
        footnoteShortCodes.forEach((footnoteShortCode) => {
          const params = {
            タイトル: '',
            本文: '',
            画像: '',
          }

          this.parseParams(footnoteShortCode, params)

          content = content.replace(
            footnoteShortCode,
            `
          <span class="footnote">
            <span class="footnote__thumbnail" style="background-image: url(${params['画像']})"></span>
            <span class="footnote__title-container">
              <span class="footnote__title">${params['タイトル']}</span>
              <span class="footnote__description">${params['本文']}</span>
            </span>
          </span>
        `
          )
        })
      }

      return content
    },
    convertFootnote2ShortCodes(content) {
      const footnote2ShortCodes = content.match(/\[注釈（画像なし） (.*?)\]/gs)

      if (footnote2ShortCodes) {
        footnote2ShortCodes.forEach((footnoteShortCode) => {
          const params = {
            タイトル: '',
            本文: '',
          }

          this.parseParams(footnoteShortCode, params)

          content = content.replace(
            footnoteShortCode,
            `
          <span class="footnote-2">
            <span class="footnote-2__title">${params['タイトル']}</span>
            <span class="footnote-2__description">${params['本文']}</span>
          </span>
        `
          )
        })
      }

      return content
    },
    convertLinkcardShortCodes(content) {
      const linkcardShortCodes = content.match(/\[リンクカード (.*?)\]/gs)

      if (linkcardShortCodes) {
        linkcardShortCodes.forEach((linkcardShortCode) => {
          const params = {
            タイトル: '',
            本文: '',
            画像: '',
            リンク: '',
          }

          this.parseParams(linkcardShortCode, params)

          content = content.replace(
            linkcardShortCode,
            `
              <span class="recruit">
                <span class="recruit__thumbnail" style="background-image: url(${params['画像']});"></span>
                <span class="recruit__information">
                  <span class="recruit__title">
                    ${params['タイトル']}
                  </span>
                  <span class="recruit__description">
                    ${params['本文']}
                  </span>
                  <a
                    href="${params['リンク']}"
                    target="_blank"
                    class="recruit-link"
                  >
                    <span class="recruit-link__content">
                      さらに詳しく見る
                    </span>
                    <span class="recruit-link__icon">
                    </span>
                  </a>
                </span>
              </span>
        `
          )
        })
      }

      return content
    },
  },
}
</script>

<style scoped lang="scss">
.firstview {
  position: relative;
  height: 540px;
  margin-top: 172px;
  background-size: cover;
  background-position: center;

  &__category {
    display: inline-block;
    position: absolute;
    top: 32px;
    left: 0;
    padding: 12px 20px 12px 48px;
    color: white;
    font-size: 16px;
    font-weight: bold;
    border: 1px solid white;
    border-left: none;
  }

  &__title-container {
    position: absolute;
    bottom: 58px;
    left: 88px;
  }

  &__title {
    display: inline-block;
    line-height: 1.5em;
    padding: 14px 24px;
    margin-top: 12px;
    background-color: white;
    @include fontTsuku;
    font-size: 36px;
    letter-spacing: 0.1em;
  }

  &__vol-container {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 80px;
    height: 140px;
    background-color: white;
  }

  &__vol {
    position: absolute;
    top: 42px;
    left: 68px;
    display: block;
    font-size: 24px;
    font-weight: bold;
    transform-origin: left top;
    transform: rotate(90deg);
    white-space: nowrap;

    &:before {
      font-size: 16px;
      vertical-align: middle;
      content: 'Vol';
    }
  }

  :deep(.breadcrumb) {
    top: initial;
    bottom: 6px;
    right: 88px;
    left: 88px;
    background-color: $color-gray-2;
    border-radius: 0;
  }
}

.introduction {
  position: relative;
  overflow: scroll;

  &__box {
    position: relative;
    padding: 108px 32px;
    min-width: $width-2;
  }

  &__title {
    margin-top: 16px;
    font-size: 11px;
    @include fontTsuku;
  }

  &__description {
    width: 340px;
    line-height: 2em;
    margin-top: 80px;
  }
}

.member-container {
  position: absolute;
  top: 120px;
  left: 50%;
  display: flex;
  transform: translateX(-210px);
}

.member {
  width: 180px;
  margin: 0 10px;

  &__thumbnail {
    position: relative;
    height: 186px;
    border-radius: 50%;
    background-size: cover;
    background-position: center;
    overflow: hidden;

    &:before {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-image: url('~assets/images/common/circle_frame.png');
      background-size: 100% 100%;
      background-position: center;
      background-repeat: no-repeat;
      content: '';
    }
  }

  &__name {
    margin-top: 16px;
    font-weight: bold;
    text-align: center;
  }

  &__role {
    line-height: 1.5em;
    margin-top: 8px;
    font-size: 13px;
    font-weight: bold;
    text-align: center;
  }

  &__description {
    margin-top: 12px;
    line-height: 1.8em;
    font-size: 14px;
  }
}

:deep(.background-layer) {
  padding: 80px 0;
}

.content-container {
  max-width: $width-2;
  margin: 0 auto;
  padding: 80px 40px;
  background-color: white;
}

.content {
  /* >>> { */
  :deep() {
    h2 {
      line-height: 1.5em;
      margin-bottom: 32px;
      padding: 32px 36px;
      font-size: 32px;
      @include fontTsuku;
      background-color: $color-gray-2;
      letter-spacing: 0.1em;
    }

    p {
      line-height: 1.5em;
    }

    strong {
      font-weight: bold;
    }

    a {
      text-decoration: underline;
    }

    figure {
      width: auto !important;
    }

    img {
      display: block;
      width: 100%;
      height: auto;
      margin: 96px 0;
    }

    .comment {
      display: flex;
      padding: 32px 156px;

      &__meta {
        display: block;
        flex-shrink: 0;
        width: 84px;
      }

      &__thumbnail {
        position: relative;
        display: block;
        height: 84px;
        background-size: cover;
        background-position: center;
        border-radius: 50%;
        background-color: $color-gray-3;
        overflow: hidden;

        &:before {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          background-image: url('~assets/images/common/circle_frame.png');
          background-size: 100% 100%;
          background-position: center;
          background-repeat: no-repeat;
          content: '';
        }
      }

      &__name {
        display: block;
        margin-top: 8px;
        text-align: center;
        font-weight: bold;
        font-size: 14px;
      }

      &__description {
        display: block;
        line-height: 2em;
        padding: 0 96px 0 16px;
      }
    }

    .footnote {
      display: flex;
      margin: 96px 0;
      padding: 32px;
      color: white;
      background-color: $color-black-2;

      &__thumbnail {
        display: block;
        flex-shrink: 0;
        width: 340px;
        height: 240px;
        background-size: cover;
        background-position: center;
      }

      &__title-container {
        display: block;
        padding-left: 20px;
      }

      &__title {
        display: inline-block;
        margin-top: 32px;
        padding: 12px 16px;
        font-size: 20px;
        font-weight: bold;
        @include fontTsuku;
        color: $color-black-1;
        background-color: white;
      }

      &__description {
        display: block;
        line-height: 2em;
        margin-top: 8px;
      }
    }

    .footnote-2 {
      display: block;
      margin: 96px 0;
      padding: 32px;
      color: white;
      background-color: $color-black-2;

      &__title {
        display: inline-block;
        padding: 12px 16px;
        font-size: 18px;
        font-weight: bold;
        @include fontTsuku;
        color: $color-black-1;
        background-color: white;
      }

      &__description {
        display: block;
        line-height: 2em;
        margin-top: 16px;
      }
    }

    .recruit {
      display: flex;
      max-width: $width-2;
      margin: 0 auto;
      padding: 40px;
      border: 22px solid $color-gray-2;
      background-color: white;
      box-sizing: border-box;

      &__thumbnail {
        display: block;
        flex-shrink: 0;
        width: 340px;
        height: 240px;
        background-size: cover;
        background-position: center;
        background-image: url('/images/work/picture_2.jpg');
      }

      &__information {
        display: block;
        padding-left: 24px;
      }

      &__title {
        display: block;
        position: relative;
        margin-top: 32px;
        font-size: 20px;
        font-weight: bold;
        letter-spacing: 0.1em;

        &:after {
          position: absolute;
          bottom: -12px;
          left: 0;
          width: 20px;
          height: 1px;
          background-color: $color-gray-3;
          content: '';
        }
      }

      &__description {
        display: block;
        line-height: 2em;
        margin-top: 24px;
        font-size: 13px;
      }
    }

    .recruit-link {
      position: relative;
      display: block;
      width: 280px;
      margin-top: 24px;
      border-radius: 8px;
      overflow: hidden;
      border: 1px solid $color-gray-3;
      @include boxShadow;
      transition-property: box-shadow, transform;
      transition-duration: 0.3s;
      text-decoration: none;

      @include hover {
        transform: translate(-2px, -2px);
        box-shadow: 6px 6px 10px 2px rgba(0, 0, 0, 0.2);

        .common-button__icon {
          &:after {
            transform: translate(3px, -3px);
          }
        }
      }

      &__content {
        display: block;
        height: 80px;
        line-height: 80px;
        padding-right: 80px;
        text-align: center;
        font-weight: bold;
        letter-spacing: 0.1em;
        background-color: $color-gray-2;
      }

      &__icon {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        width: 82px;
        background-color: $color-black-2;

        &:after {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          width: 60px;
          height: 60px;
          margin: auto;
          background-size: contain;
          background-image: url('/images/illust/send.png');
          background-repeat: no-repeat;
          background-position: center;
          transition: transform 0.3s;
          content: '';
        }
      }
    }
  }
}

.link-container {
  padding: 48px 0;
  background-color: $color-black-2;
}

.link {
  position: relative;
  max-width: $width-2;
  margin: 20px auto;
  border-radius: 8px;
  border-top-left-radius: 0;
  border: 1px solid $color-gray-3;
  background-color: white;
  box-sizing: border-box;

  &__href {
    display: flex;
    padding: 20px;
  }

  &__thumbnail {
    width: 160px;
    height: 112px;
    background-color: $color-gray-2;
    background-size: cover;
    background-position: center;
  }

  &__vol {
    position: absolute;
    top: -1px;
    left: 0;
    width: 80px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    transform-origin: left top;
    transform: rotate(90deg);
    background-color: white;
    border: 1px solid $color-gray-3;

    &:before {
      font-size: 13px;
      content: 'Vol';
    }
  }

  &__title-container {
    padding-left: 20px;
  }

  &__meta {
    display: flex;
  }

  &__category {
    padding: 6px 16px;
    font-size: 12px;
    border: 1px solid $color-gray-3;
  }

  &__date {
    line-height: 24px;
    margin-left: 16px;
    font-size: 12px;
    color: $color-gray-3;
  }

  &__title {
    line-height: 2em;
    font-size: 20px;
    font-weight: bold;
  }

  &__description {
    line-height: 2em;
    font-size: 14px;
  }
}

@include smartphone {
  .firstview {
    position: relative;
    width: calc(100% - 40px);
    height: 418px;
    margin: $padding-1 auto;
    overflow: hidden;

    &__category {
      top: 60px;
      right: 0;
      left: initial;
      width: 40px;
      line-height: 40px;
      padding: 8px 0;
      font-size: 11px;
      writing-mode: vertical-rl;
      -ms-writing-mode: tb-rl;
      text-orientation: upright;
      -webkit-text-orientation: upright;
      border-right: none;
      border-left: 1px solid white;
      box-sizing: border-box;
    }

    &__title-container {
      bottom: 80px;
      right: $padding-1;
      left: $padding-1;
    }

    &__title {
      padding: 8px 12px;
      margin-top: 6px;
      font-size: 18px;
    }

    &__vol-container {
      top: 0;
      right: 0;
      bottom: initial;
      left: initial;
      width: 50px;
      height: 50px;
    }

    &__vol {
      top: 20px;
      right: 0;
      left: 0;
      font-size: 20px;
      text-align: center;
      transform: initial;

      &:before {
        position: absolute;
        right: 0;
        left: 0;
        top: -12px;
        text-align: center;
        font-size: 11px;
      }
    }

    :deep(.breadcrumb) {
      top: initial;
      bottom: 16px;
      right: $padding-1;
      left: $padding-1;
      padding: 6px 12px;
    }
  }

  .introduction {
    background-color: $color-gray-2;
    overflow: initial;

    &__box {
      padding: $padding-1;
      min-width: initial;
    }

    &__title {
      margin-top: 16px;
      font-size: 10px;
    }

    &__description {
      width: initial;
      margin-top: 32px;
      font-size: 13px;
    }
  }

  .member-container {
    position: relative;
    flex-wrap: wrap;
    top: initial;
    left: initial;
    padding: 32px 0;
    transform: initial;
  }

  .member {
    display: flex;
    width: 50%;
    margin: 0;
    padding: 8px 8px 8px 0;
    box-sizing: border-box;

    &__thumbnail {
      flex-shrink: 0;
      width: 48px;
      height: 48px;
    }

    &__meta {
      padding-left: 8px;
    }

    &__name {
      margin-top: 0;
      text-align: left;
      font-size: 11px;
    }

    &__role {
      margin-top: 4px;
      text-align: left;
      font-size: 10px;
    }

    &__description {
      line-height: 1.5em;
      margin-top: 4px;
      font-size: 10px;
    }
  }

  .content-container {
    position: relative;
    margin: -32px auto 0;
    padding: 32px $padding-1;
    border-radius: 32px;
    @include boxShadow;
  }

  .content {
    /* >>> { */
    :deep() {
      h2 {
        line-height: 1.5em;
        margin-bottom: 16px;
        padding: 16px;
        font-size: 18px;
        border-radius: 4px;
      }

      img {
        margin: 32px 0;
      }

      .comment {
        display: block;
        padding: 8px 0 16px;

        &__meta {
          display: flex;
          align-items: center;
          width: initial;
        }

        &__thumbnail {
          flex-shrink: 0;
          width: 52px;
          height: 52px;
        }

        &__name {
          margin-top: 0;
          padding-left: 8px;
          font-size: 12px;
        }

        &__description {
          padding: 8px 0;
          font-size: 14px;
        }
      }

      .footnote {
        display: block;
        margin: 32px 0;
        padding: 10px;

        &__thumbnail {
          width: initial;
          height: 224px;
        }

        &__title-container {
          padding-left: 0;
        }

        &__title {
          line-height: 1.5em;
          margin-top: 16px;
          padding: 8px 12px;
          font-size: 14px;
        }

        &__description {
          margin-top: 16px;
          padding: 0 12px 8px;
          font-size: 13px;
        }
      }

      .footnote-2 {
        margin: 16px 0;
        padding: 20px 10px;

        &__title {
          padding: 4px 8px;
          font-size: 14px;
        }

        &__description {
          margin-top: 8px;
          font-size: 13px;
        }
      }

      .recruit {
        display: block;
        width: 100%;
        padding: 0 0 24px;
        margin: 48px auto;
        border: 10px solid $color-gray-2;

        &__thumbnail {
          width: initial;
          height: 240px;
          background-color: black;
        }

        &__information {
          padding: 0 10px;
        }

        &__title {
          margin-top: 20px;
          font-size: 15px;
        }

        &__description {
          margin-top: 24px;
          font-size: 13px;
        }
      }

      .recruit-link {
        width: initial;
        margin-top: 16px;
        border-radius: 4px;

        &__content {
          height: 48px;
          line-height: 48px;
          padding-right: 48px;
          font-size: 14px;
        }

        &__icon {
          width: 48px;

          &:after {
            width: 32px;
            height: 32px;
          }
        }
      }
    }
  }

  .link-container {
    padding: 16px $padding-1 28px;
  }

  .link {
    margin: 40px auto 0;
    border-radius: 8px;
    border-top-left-radius: 0;

    &__link {
      padding: 20px;
    }

    &__thumbnail {
      flex-shrink: 0;
      width: 104px;
      height: 72px;
    }

    &__vol {
      top: -25px;
      left: -1px;
      width: 52px;
      height: 24px;
      line-height: 24px;
      font-size: 11px;
      transform: initial;
      border-bottom: none;

      &:before {
        font-size: 11px;
      }
    }

    &__title-container {
      padding-left: 16px;
    }

    &__meta {
      display: flex;
    }

    &__category {
      padding: 4px 8px;
      font-size: 10px;
    }

    &__date {
      line-height: 20px;
      margin-left: 8px;
      font-size: 10px;
    }

    &__title {
      line-height: 1.5em;
      margin-top: 8px;
      font-size: 16px;
    }

    &__description {
      display: none;
    }
  }
}
</style>
