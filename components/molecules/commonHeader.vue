<template>
  <div
    :class="{
      'common-header--open': isOpen,
    }"
    class="common-header"
  >
    <div class="menu">
      <div class="menu__box">
        <div class="menu-content menu-content--index js-menu-content">
          <div class="menu-content__main">
            <nuxt-link
              to="/"
              class="menu-content__title-container hover-opacity"
              @click.native="onClickLink"
            >
              <p class="menu-content__title">シナプストップへ</p>
              <p class="menu-content__title-en">Home</p>

              <div
                class="menu-content__title-toggle menu-content__title-toggle--arrow"
              />
            </nuxt-link>
          </div>
        </div>

        <div
          v-for="(link, index) in linksHasChildren"
          :key="index"
          class="menu-content js-menu-content"
          :class="{
            'menu-content--last': index === linksHasChildren.length - 1,
          }"
        >
          <div class="menu-content__main">
            <div class="menu-content__thumbnail-container">
              <div
                class="menu-content__thumbnail"
                :style="{
                  backgroundImage: `url(/images/common/menu_thumbnail_${
                    index + 1
                  }.jpg)`,
                }"
              />
            </div>

            <div class="menu-content__title-container">
              <nuxt-link
                :to="link.path"
                class="menu-content__title hover-opacity"
                :class="`menu-content__title--${link.titleEn}`"
                @click.native="onClickLink"
              >
                {{ link.title }}
              </nuxt-link>
              <p class="menu-content__title-en">
                {{ link.titleEn }}
              </p>

              <div
                class="menu-content__title-toggle"
                :class="{
                  'menu-content__title-toggle--minus': link.childrenHeight > 0,
                }"
                @click="toggleChildrenHeight(link, index)"
              />
            </div>
          </div>

          <div
            class="menu-content__child-container-container"
            :style="{
              height: $store.isSmartphone
                ? `${link.childrenHeight}px`
                : 'auto',
            }"
          >
            <div
              ref="menu-content-child-container"
              class="menu-content__child-container"
            >
              <template v-for="(child, childIndex) in link.children">
                <a
                  v-if="child.path.startsWith('http')"
                  class="menu-content__child hover-opacity"
                  :href="child.path"
                  target="_black"
                >
                  {{ child.title }}
                </a>

                <nuxt-link
                  v-else
                  class="menu-content__child hover-opacity"
                  :to="child.path"
                  @click.native="onClickLink"
                >
                  {{ child.title }}
                </nuxt-link>
              </template>
            </div>
          </div>
        </div>

        <div class="menu-misc js-menu-content">
          <div class="menu-misc__thumbnail" />

          <div class="menu-misc__content-container">
            <nuxt-link
              v-for="(link, index) in miscLinks"
              :key="index"
              :to="link.path"
              class="menu-misc__content hover-opacity"
              :class="`menu-misc__content--${link.titleEn}`"
              @click.native="onClickLink"
            >
              {{ link.title }}
            </nuxt-link>

            <div class="menu-misc__footer">
              <a
                v-for="(social, index) in socials"
                :key="index"
                class="menu-misc__social hover-opacity"
                :class="`menu-misc__social--${social.id}`"
                :href="social.link"
                target="_blank"
              >
                {{ social.title }}
              </a>

              <a
                class="menu-misc__policy hover-opacity"
                href="https://www.synapse.jp/notice/private.html"
                target="_blank"
              >
                プライバシーポリシー
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="hover-opacity hover-opacity--2" @click="onClickButton">
      <img
        class="common-header__button"
        src="~assets/images/common/menu.png"
        alt=""
      />
      <img
        class="common-header__button common-header__button--open"
        src="~assets/images/common/menu_open.png"
        alt=""
      />
    </div>
    <h1
      class="common-header__title"
      :style="{
        color: isOpen ? '#ffffff' : $store.firstviewColor,
      }"
    >
      <nuxt-link to="/" @click.native="onClickLink"> SYNAPSE </nuxt-link>
    </h1>
  </div>
</template>

<script>
import { gsap } from 'gsap'
import links from '@/assets/jsons/links'
import socials from '@/assets/jsons/socials'

export default defineComponent({
  data() {
    return {
      tweens: [],
      isOpen: false,
      links: links.filter((link) => {
        return !link.isDisableOnHeader
      }),
      socials,
    }
  },
  computed: {
    linksHasChildren() {
      return this.links.filter((link) => {
        return link.children
      })
    },
    miscLinks() {
      return this.links.filter((link) => {
        return !link.children
      })
    },
  },
  watch: {
    isOpen(val) {
      this.$store.updateIsOpenModal(val)
      this.preventScroll(val)
      this.animateMenuContents()
    },
  },
  mounted() {
    this.links.forEach((link) => {
      link.childrenHeight = 0
    })
  },
  methods: {
    animateMenuContents() {
      const menuContents = this.$el.querySelectorAll('.js-menu-content')

      this.tweens.forEach((tween) => {
        tween.kill?.()
      })
      this.tweens = []

      menuContents.forEach((menuContent, index) => {
        gsap.set(menuContent, {
          opacity: 0,
          y: 10,
        })

        this.tweens.push(
          gsap.to(menuContent, {
            duration: 0.3,
            opacity: 1,
            y: 0,
            delay: 0.05 * index + 0.3,
          })
        )
      })
    },
    toggleChildrenHeight(link, index) {
      const refKey = 'menu-content-child-container'
      const childContainer = this.$refs[refKey]?.[index]

      if (!childContainer) {
        return
      }

      this.$set(
        link,
        'childrenHeight',
        link.childrenHeight ? 0 : childContainer.clientHeight
      )
    },
    preventScroll(bool) {
      document.body.style.overflow = bool ? 'hidden' : ''
      document.documentElement.style.overflow = bool ? 'hidden' : ''
    },
    onClickLink() {
      this.isOpen = false
    },
    onClickButton() {
      this.isOpen = !this.isOpen
    },
  },
})
</script>

<style scoped lang="scss">
.common-header {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  transition: color 0.3s;
  z-index: 1;

  &__button {
    position: absolute;
    top: 40px;
    left: 40px;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    @include boxShadow;
    cursor: pointer;
    transition: opacity 0.3s;

    &--open {
      opacity: 0;
    }
  }

  &__title {
    position: absolute;
    top: 40px;
    left: 160px;
    line-height: 80px;
    @include fontTsuku;
    font-size: 22px;
    letter-spacing: 0.1em;
    transition: opacity 0.3s;
  }

  &--open {
    color: white;

    .common-header {
      &__button {
        opacity: 0;

        &--open {
          opacity: 1;
        }
      }
    }

    .menu {
      pointer-events: auto;
      opacity: 1;
    }
  }
}

.menu {
  display: flex;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 120px 48px;
  background-color: rgba(52, 52, 52, 0.9);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;

  &__box {
    position: relative;
    display: flex;
    width: 100%;
    max-width: $width-2;
    min-width: 800px;
    margin: auto;
    transform: translateY(48px);
  }
}

.menu-content {
  width: calc((100% - 324px) / 4);

  &:not(:first-child) {
    margin-left: 28px;
  }

  &__thumbnail {
    padding-top: 72%;
    background-size: cover;
    background-position: center;
  }

  &__title-container {
    margin-top: 24px;
    @include fontTsuku;
  }

  &__title {
    line-height: 1.5em;
    font-size: 20px;

    &:before {
      display: inline-block;
      transform: scaleX(0.8);
      font-weight: bold;
      content: '>';
      margin-right: 6px;
    }
  }

  &__title-en {
    margin-top: 8px;
    padding-left: 1.2em;
    font-size: 16px;
    opacity: 0.6;
    letter-spacing: 0.1em;
  }

  &__child-container {
    margin-top: 24px;
  }

  &__child {
    display: block;
    line-height: 1.5em;
    padding: 4px 0;

    &:before {
      content: '・';
      margin-right: 6px;
    }
  }

  &--index {
    position: absolute;
    top: -72px;
    left: 24px;
    width: 100%;

    .menu-content {
      &__title-container {
        display: flex;
        align-items: center;
        margin-top: 0;
      }

      &__title {
        letter-spacing: 0.2em;
      }

      &__title-en {
        margin-top: 0;
      }
    }
  }
}

.menu-misc {
  width: 240px;

  &__thumbnail {
    padding-top: 72%;
  }

  &__content-container {
    padding-left: 24px;
    margin-top: 24px;
    border-left: 1px solid rgba(255, 255, 255, 0.4);
  }

  &__content {
    display: block;
    @include fontTsuku;
    font-size: 20px;
    padding: 12px 0;

    &:first-child {
      padding-top: 0;
    }

    &:before {
      display: inline-block;
      transform: scaleX(0.8);
      font-weight: bold;
      background-position: center;
      background-size: contain;
      background-repeat: no-repeat;
      content: '>';
      margin-right: 6px;
    }

    &--Contact {
      &:before {
        width: 12px;
        height: 12px;
        transform: none;
        background-image: url(/images/common/icon_mail.png);
        content: '';
      }
    }
  }

  &__footer {
    margin-top: 40px;
  }

  &__social {
    display: block;
    padding: 8px 0;
    font-size: 16px;

    &:before {
      display: inline-block;
      width: 18px;
      height: 18px;
      margin-right: 14px;
      background-position: center;
      background-size: contain;
      background-repeat: no-repeat;
      transform: translateY(2px);
      content: '';
    }

    &--twitter {
      &:before {
        background-image: url(/images/common/icon_twitter.png);
      }
    }

    &--facebook {
      &:before {
        background-image: url(/images/common/icon_facebook.png);
      }
    }
  }

  &__policy {
    display: block;
    margin-top: 16px;
  }
}

@include smartphone {
  .common-header {
    &__button {
      top: 30px;
      left: 20px;
      width: 50px;
      height: 50px;
    }

    &__title {
      top: 104px;
      left: 20px;
      line-height: 1em;
      font-size: 12px;
      transform-origin: left top;
      transform: rotate(90deg) translateY(-100%);
    }

    &--open {
      .common-header {
        &__title {
          opacity: 0;
        }
      }
    }
  }

  .menu {
    padding: 90px $padding-1;

    &__box {
      display: block;
      min-width: 0;
      transform: none;
    }
  }

  .menu-content {
    width: 100%;
    padding: $padding-1 0;
    border-top: 1px solid rgba(255, 255, 255, 0.2);

    &:not(:first-child) {
      margin-left: 0;
    }

    &__main {
      display: flex;
    }

    &__thumbnail-container {
      width: 100px;
      flex-shrink: 0;
    }

    &__title-container {
      position: relative;
      flex-grow: 1;
      margin-top: 0;
      padding-left: 16px;
    }

    &__title {
      display: block;
      position: relative;
      margin-top: 20px;
      padding-right: 16px;
      font-size: 20px;
      letter-spacing: 0.2em;

      &--Work {
        margin-top: 6px;
        padding-right: 88px;
      }

      &:before {
        display: none;
      }
    }

    &__title-toggle {
      position: absolute;
      top: 18px;
      right: -8px;
      width: 40px;
      height: 40px;
      background-size: 20px auto;
      background-position: center;
      background-repeat: no-repeat;
      background-image: url(/images/common/icon_plus.png);

      &--minus {
        background-image: url(/images/common/icon_minus.png);
      }

      &--arrow {
        top: 4px;
        right: 0;
        width: 20px;
        height: 20px;
        background-size: contain;
        background-image: url(/images/common/icon_arrow.png);
      }
    }

    &__title-en {
      display: none;
    }

    &__child-container-container {
      position: relative;
      height: 0px;
      overflow: hidden;
      transition: height 0.5s;
    }

    &__child-container {
      margin-top: 8px;
      padding-left: 120px;
    }

    &__child {
      padding: 8px 0;
      font-size: 14px;
    }

    &--index {
      position: relative;
      top: auto;
      left: auto;
      padding: 16px 0;
      border-top: none;

      .menu-content {
        &__title-container {
          display: block;
          padding-left: 0;
        }

        &__title {
          margin-top: 0;
          letter-spacing: 0;
        }
      }
    }

    &--last {
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    }
  }

  .menu-misc {
    width: 100%;

    &__thumbnail {
      display: none;
    }

    &__content-container {
      padding-left: 0;
      margin-top: 0;
      border-left: none;
    }

    &__content {
      padding: $padding-1 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      font-size: 20px;

      &:first-child {
        padding-top: $padding-1;
      }

      &:before {
        width: 16px;
        height: 16px;
        margin-right: 8px;
      }

      &--News {
        &:before {
          transform: none;
          background-image: url(/images/common/icon_arrow.png);
          content: '';
        }
      }
    }

    &__footer {
      margin-top: 28px;
    }

    &__social {
      padding: 8px 0;
      font-size: 16px;

      &:before {
        width: 18px;
        height: 18px;
        margin-right: 8px;
        transform: translateY(2px);
      }
    }

    &__policy {
      margin-top: 16px;
    }
  }
}
</style>
