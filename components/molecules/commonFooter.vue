<template>
  <div class="common-footer">
    <div class="common-footer__box">
      <div class="information">
        <p class="information__name">
          株式会社シナプス<br />
          <span class="information__name-small">(SYNAPSE Co., Ltd.)</span>
        </p>
        <div class="meta">
          <p class="meta__content">
            <img class="meta__icon" src="/images/illust/pin.png" alt="" />
            〒890-0053<br />
            <span class="meta__indent">鹿児島県鹿児島市中央町6-1</span>
          </p>
          <p class="meta__content">
            <img class="meta__icon" src="/images/illust/call.png" alt="" />
            099-813-8690
          </p>
          <p class="meta__content">
            <img class="meta__icon" src="/images/illust/web_2.png" alt="" />
            https://corp.synapse.jp
          </p>
        </div>
      </div>

      <div class="mainlink-container">
        <div
          v-for="(mainLink, index) in mainLinks"
          :key="index"
          class="mainlink"
        >
          <nuxt-link :to="mainLink.path" class="mainlink__title hover-opacity">
            {{ mainLink.title }}
          </nuxt-link>

          <div class="mainlink__childlink-container">
            <div
              v-for="(childLink, childLinkIndex) in mainLink.children"
              :key="childLinkIndex"
            >
              <a
                v-if="childLink.isExternal"
                :href="childLink.path"
                class="mainlink__childlink hover-opacity"
                target="_blank"
              >
                {{ childLink.title }}
              </a>
              <nuxt-link
                v-else
                :to="childLink.path"
                class="mainlink__childlink hover-opacity"
              >
                {{ childLink.title }}
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>

      <div class="sublink-container">
        <template v-for="(subLink, index) in subLinks">
          <a
            v-if="subLink.isExternal"
            :href="subLink.path"
            class="sublink hover-opacity"
            target="_blank"
          >
            {{ subLink.title }}
          </a>
          <nuxt-link
            v-else
            :to="subLink.path"
            class="sublink hover-opacity"
          >
            {{ subLink.title }}
          </nuxt-link>
        </template>

        <a
          v-for="(social, index) in socials"
          :key="`social-${index}`"
          :href="social.link"
          class="sublink hover-opacity"
          :class="`sublink--${social.id}`"
          target="_blank"
        >
          {{ social.title }}
        </a>

        <a
          href="https://www.synapse.jp/notice/private.html"
          class="sublink hover-opacity"
          target="_blank"
        >
          プライバシーポリシー
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import links from '@/assets/jsons/links'
import socials from '@/assets/jsons/socials'

const mainLinks = links.filter((link) => {
  return link.children && !link.isDisableOnFooter
});
const subLinks = links.filter((link) => {
  return !link.children && !link.isDisableOnFooter
});

// export default {
//   data() {
//     return {
//       socials,
//       mainLinks: links.filter((link) => {
//         return link.children && !link.isDisableOnFooter
//       }),
//       subLinks: links.filter((link) => {
//         return !link.children && !link.isDisableOnFooter
//       }),
//     }
//   },
// }
</script>

<style scoped lang="scss">
.common-footer {
  position: relative;
  padding: 64px 0;
  background-color: white;

  &__box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    max-width: $width-2;
    margin: 0 auto;
    padding: 0 16px;
  }
}

.mainlink-container {
  display: flex;
}

.mainlink {
  &__title {
    display: block;
  }

  &__childlink {
    display: block;
  }
}

.information {
  display: flex;

  &__name {
    line-height: 1.5em;
    font-weight: bold;
  }

  &__name-small {
    font-size: 11px;
  }
}

.meta {
  padding-left: 32px;
  font-size: 14px;

  &__icon {
    width: 12px;
    vertical-align: middle;
    transform: translateY(-2px);

    &--mail {
      transform: translateY(-1px);
    }
  }

  &__content {
    line-height: 1.8em;
  }

  &__indent {
    padding-left: 1.2em;
  }
}

.mainlink-container {
  font-size: 13px;
}

.mainlink {
  padding: 0 28px;

  &:first-child {
    padding-left: 0;
  }

  &:last-child {
    padding-right: 0;
  }

  &__title {
    font-weight: bold;
  }

  &__childlink-container {
    margin-top: 16px;
  }

  &__childlink {
    line-height: 1.8em;

    &:before {
      content: '・';
    }
  }
}

.sublink-container {
  display: flex;
  width: 100%;
  margin-top: 32px;
}

.sublink {
  position: relative;
  font-weight: bold;
  font-size: 13px;

  &:before {
    display: none;
    position: absolute;
    top: -3px;
    left: 2px;
    width: 18px;
    height: 18px;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    content: '';
  }

  &:after {
    padding: 0 0.2em;
    content: '/';
  }

  &:last-child {
    &:after {
      display: none;
    }
  }

  &--twitter {
    padding-left: 2em;

    &:before {
      display: block;
      background-image: url(/images/common/icon_twitter_black.png);
    }
  }

  &--facebook {
    padding-left: 2em;

    &:before {
      display: block;
      background-image: url(/images/common/icon_facebook_black.png);
    }
  }
}

@include smartphone {
  .common-footer {
    padding: 48px $padding-1 300px;
    color: white;
    background-color: $color-black-1;

    &__box {
      display: block;
      padding: 0;
    }
  }

  .mainlink-container {
    display: block;
  }

  .information {
    display: block;
    position: absolute;
    right: 0;
    bottom: 32px;
    left: 0;
    padding: 0 $padding-1;

    &__name-small {
      font-size: 11px;
    }
  }

  .meta {
    padding: 24px 0 0;
    font-size: 13px;

    &__icon {
      filter: invert(100%);
    }

    &__content {
      padding: 4px 0;

      :deep(i) {
        margin-right: 6px;
      }
    }

    &__indent {
      padding-left: 1.7em;
    }
  }

  .mainlink-container {
    font-size: 13px;
  }

  .mainlink {
    display: flex;
    padding: 16px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);

    &__title {
      flex-shrink: 0;
      width: 160px;
      padding-top: 8px;
      font-size: 14px;
    }

    &__childlink-container {
      margin-top: 0;
    }

    &__childlink {
      line-height: 2em;
    }
  }

  .sublink-container {
    display: block;
    margin-top: 16px;
  }

  .sublink {
    display: block;
    line-height: 2.8em;
    font-size: 14px;

    &:before {
      top: 10px;
      left: 0;
      width: 16px;
      height: 16px;
    }

    &--twitter {
      padding-left: 1.6em;

      &:before {
        background-image: url(/images/common/icon_twitter.png);
      }
    }

    &--facebook {
      padding-left: 1.6em;

      &:before {
        background-image: url(/images/common/icon_facebook.png);
      }
    }

    &:after {
      display: none;
    }
  }
}
</style>
