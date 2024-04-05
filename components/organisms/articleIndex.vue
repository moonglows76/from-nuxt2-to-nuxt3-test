<template>
  <div class="article-index">
    <p v-if="title" class="article-index-title">
      <span class="article-index-title__main">{{ title }}</span>
      <span
        v-if="subtitle"
        class="article-index-title__sub"
        v-html="subtitle"
      />
    </p>

    <div class="article-index-contents-container">
      <nuxt-link
        v-for="(content, index) in contents"
        :key="index"
        :to="content.link"
        class="article-index-contents hover-opacity"
      >
        <div class="article-index-contents__circle" />

        <div class="article-index-contents__meta">
          <p class="article-index-contents__date">
            {{ content.date }}
          </p>
          <p v-show="content.category" class="article-index-contents__category">
            {{ content.category }}
          </p>
        </div>
        <div class="article-index-contents__title-container">
          <div
            v-if="content.thumbnail || hasDefaultThumbnail"
            class="article-index-contents__thumbnail"
            :style="`background-image: url(${
              content.thumbnail || '/images/common/default_thumbnail.jpg'
            })`"
          />
          <p class="article-index-contents__title">
            {{ content.title }}
          </p>
        </div>
      </nuxt-link>
    </div>

    <!-- TODOlater add read more link -->
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    subtitle: {
      type: String,
      default: null,
    },
    contents: {
      type: Array,
      default: () => {
        return []
      },
    },
    hasDefaultThumbnail: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style scoped lang="scss">
.article-index {
}

.article-index-title {
  padding: 56px 72px;
  background-color: $color-gray-2;

  &__main {
    @include fontTsuku;
    font-weight: bold;
    font-size: 28px;
    letter-spacing: 0.1em;
  }

  &__sub {
    display: block;
    line-height: 1.8em;
    margin-top: 20px;
    font-size: 13px;

    :deep(a) {
      text-decoration: underline;

      &:hover {
        text-decoration: none;
      }
    }
  }
}

.article-index-contents-container {
  padding: 32px 72px;
}

.article-index-contents {
  position: relative;
  display: flex;
  padding: 36px 0 36px 36px;

  &:before {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 6px;
    width: 1px;
    background-color: $color-gray-3;
    content: '';
  }

  &:first-child {
    &:before {
      top: 40px;
    }
  }

  &:last-child {
    &:before {
      height: 40px;
      bottom: auto;
    }
  }

  &__circle {
    position: absolute;
    top: 28px;
    left: -14px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: $color-gray-5;

    &:after {
      position: absolute;
      top: 10px;
      right: 10px;
      bottom: 10px;
      left: 10px;
      background-color: $color-gray-4;
      border-radius: 50%;
      content: '';
    }
  }

  &__meta {
    width: 128px;
  }

  &__date {
    font-size: 12px;
    color: $color-gray-3;
  }

  &__category {
    display: inline-block;
    margin-top: 12px;
    padding: 8px 16px;
    font-size: 12px;
    border: 1px solid $color-gray-3;
  }

  &__title-container {
    position: relative;
    display: flex;
    align-items: center;
    width: 520px;
    padding-left: 60px;

    &:before {
      position: absolute;
      top: 50%;
      left: 24px;
      width: 36px;
      height: 1px;
      background-color: $color-gray-3;
      content: '';
    }
  }

  &__thumbnail {
    flex-shrink: 0;
    width: 160px;
    height: 112px;
    margin-left: 20px;
    background-size: cover;
    background-position: center;
  }

  &__title {
    line-height: 1.5em;
    padding-left: 20px;
    font-weight: bold;
    font-size: 20px;
  }
}

@include smartphone {
  .article-index-title {
    width: calc(100% - 40px);
    margin: 0 auto;
    padding: 20px $padding-1;
    box-sizing: border-box;

    &__main {
      font-size: 16px;
    }

    &__sub {
      margin-top: 12px;
      font-size: 10px;
    }
  }

  .article-index-contents-container {
    padding: 0 $padding-1 32px;
  }

  .article-index-contents {
    display: block;
    padding: 12px 0;

    &:before {
      left: 20px;
    }

    &__circle {
      top: 28px;
      left: 10px;
      width: 20px;
      height: 20px;

      &:after {
        top: 4px;
        right: 4px;
        bottom: 4px;
        left: 4px;
      }
    }

    &__meta {
      display: flex;
      width: initial;
      margin-top: 16px;
      padding-left: 60px;
    }

    &__date {
      font-size: 10px;
      padding: 4px;
    }

    &__category {
      margin-top: 0;
      padding: 4px;
      font-size: 10px;
    }

    &__title-container {
      width: initial;
      margin-top: 16px;
      padding-left: 64px;

      &:before {
        display: none;
      }
    }

    &__thumbnail {
      width: 100px;
      height: 72px;
      margin-right: 16px;
      margin-left: 0;
    }

    &__title {
      padding-left: 0;
      font-size: 16px;
    }
  }
}
</style>
