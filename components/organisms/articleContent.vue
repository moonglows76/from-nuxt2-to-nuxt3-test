<template>
  <div class="article-content">
    <p v-if="date" class="article-content__date">
      {{ date }}
    </p>
    <div v-show="false" class="article-content__category-container">
      <p
        v-for="(category, index) in categories"
        :key="index"
        class="article-content__category"
      >
        {{ category }}
      </p>
    </div>
    <div class="article-content__content" v-html="content" />
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    content: {
      type: String,
      default: '',
    },
    date: {
      type: String,
      default: '',
    },
    categories: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
})
</script>

<style scoped lang="scss">
.article-content {
  position: relative;
  line-height: 2em;
  max-width: 800px;
  margin: 0 auto;
  padding: 64px 120px;
  background-color: white;
  overflow: hidden;

  &__date {
    font-size: 14px;
    font-weight: bold;
  }

  &__category-container {
    display: flex;
    margin: 16px 0 32px;
  }

  &__category {
    line-height: 2em;
    padding: 0 8px;
    margin-right: 12px;
    font-size: 12px;
    background-color: $color-gray-4;
  }

  &__content {
    /* >>> { */
    :deep() {
      figure {
        width: auto !important;
      }

      img {
        max-width: 800px;
        height: auto;
        margin-left: 50%;
        transform: translateX(-50%);
      }

      figcaption {
        text-align: center;
        color: $color-black-2;
        font-size: 12px;
      }

      h2 {
        line-height: 2em;
        margin: 56px 0 28px;
        font-size: 32px;
        font-weight: bold;
        @include fontTsuku;
        letter-spacing: 0.1em;
      }

      h3 {
        position: relative;
        line-height: 2em;
        margin: 36px 0 24px;
        font-size: 20px;
        font-weight: bold;

        &:before {
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 16px;
          height: 1px;
          background-color: $color-gray-1;
          content: '';
        }
      }

      h4 {
        position: relative;
        line-height: 2em;
        margin: 36px 0 0;
        padding-left: 16px;
        font-size: 18px;
        font-weight: bold;

        &:before {
          position: absolute;
          top: 8px;
          bottom: 8px;
          left: 0;
          width: 8px;
          background-color: $color-gray-1;
          content: '';
        }
      }

      h5 {
        display: inline-block;
        line-height: 2em;
        margin: 36px 0 0;
        padding: 0 12px;
        font-size: 16px;
        font-weight: bold;
        background-color: $color-gray-2;
      }

      div,
      p {
        padding: 16px 0;
      }

      strong {
        font-weight: bold;
      }

      a {
        color: $color-blue-1;
        text-decoration: underline;
      }

      ul {
        margin: 64px 0;
        padding: 48px 32px 48px 64px;
        border: 1px solid $color-gray-3;
      }

      li {
        line-height: 2em;
        margin: 4px 0;
        list-style-type: disc;
        font-size: 15px;
      }

      blockquote {
        position: relative;
        padding: 32px;
        line-height: 2em;
        font-size: 13px;
        border: solid 20px $color-gray-2;

        &:before,
        &:after {
          position: absolute;
          width: 24px;
          height: 24px;
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
          background-image: url('/images/illust/quote.png');
          content: '';
        }

        &:before {
          top: 8px;
          left: 8px;
          transform: rotate(180deg);
        }

        &:after {
          right: 8px;
          bottom: 8px;
        }
      }

      .strong {
        line-height: 1.6em;
        padding: 64px 0;
        font-size: 32px;
        font-weight: bold;
        @include fontTsuku;
        text-align: center;
      }
    }
  }
}
@include smartphone {
  .article-content {
    position: relative;
    max-width: initial;
    margin-top: -32px;
    padding: 40px $padding-1;
    border-radius: 32px;
    background-color: white;

    &__content {
      /* >>> { */
      :deep() {
        img {
          width: 100%;
          margin-left: initial;
          transform: initial;
        }

        h2 {
          margin: 16px 0 8px;
          font-size: 24px;
        }

        h3 {
          margin: 16px 0 8px;
          font-size: 16px;

          &:before {
            width: 24px;
          }
        }

        h4 {
          margin: 16px 0 8px;
          padding-left: 12px;
          font-size: 15px;

          &:before {
            width: 6px;
          }
        }

        h5 {
          margin: 16px 0 8px;
          padding: 0 8px;
          font-size: 14px;
        }

        div,
        p {
          padding: 8px 0;
          font-size: 14px;
        }

        ul {
          margin: 16px 0;
          padding: 16px 16px 16px 32px;
        }

        li {
          margin: 4px 0;
          font-size: 13px;
        }

        blockquote {
          margin: 48px 0;
          padding: 16px;
          font-size: 12px;
          border: solid 10px $color-gray-2;

          &:before,
          &:after {
            width: 14px;
            height: 14px;
          }

          &:before {
            top: 6px;
            left: 6px;
          }

          &:after {
            right: 6px;
            bottom: 6px;
          }
        }

        .strong {
          font-size: 20px;
        }
      }
    }
  }
}
</style>
<style>
.philosophy h2 {
  border-bottom: 1px solid #666666;
}
.philosophy h2 span {
  display: block;
  margin-top: -1rem;
  font-size: 1.25rem;
  color: #666666;
}
.philosophy .ten-text {
  margin-top: -1rem;
  margin-left: 1.5rem;
  font-size: 1.25rem;
  line-height: 2;
}
.philosophy .comp-detail {
  margin-left: 1.5rem;
}
.philosophy .ul-del {
  margin: 0 !important;
  margin-left: 2rem !important;
  padding: 0 !important;
  border: none !important;
}
</style>
