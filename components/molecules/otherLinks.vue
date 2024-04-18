<template>
  <div class="other-links">
    <p class="other-links__title-en">More <br />About <br />Synapse</p>
    <p class="other-links__title">シナプスについてもっと知る</p>

    <div class="other-links__box">
      <delayed-show
        v-for="(link, index) in links"
        :key="index"
        :delay="$store.isSmartphone ? 0 : 0.2 * index"
        class="other-links-content"
      >
        <nuxt-link :to="link.path" class="other-links-content__href">
          <div
            class="other-links-content__background"
            :style="`background-image: url(${link.picture})`"
          />
          <span class="other-links-content__title">
            {{ link.title }}
          </span>
        </nuxt-link>
      </delayed-show>
    </div>
  </div>
</template>

<script>
import links from '@/assets/jsons/links'
import delayedShow from '@/components/atoms/delayedShow'

export default defineComponent({
  components: { delayedShow },
  data() {
    return {
      links: links.filter((link) => {
        return link.isOnOtherLink
      }),
    }
  },
})
</script>

<style scoped lang="scss">
.other-links {
  position: relative;
  max-width: $width-2;
  padding: 88px 0 240px;
  margin: 0 auto;

  &__title-en {
    position: absolute;
    top: 84px;
    left: -96px;
    line-height: 1.2em;
    @include fontTsuku;
    font-size: 15px;
    color: $color-gray-1;
    text-align: right;
  }

  &__title {
    position: absolute;
    top: 160px;
    left: -40px;
    @include fontTsuku;
    font-size: 18px;
    transform-origin: left top;
    transform: rotate(90deg);
    letter-spacing: 0.1em;
  }

  &__box {
    display: flex;
  }
}

.other-links-content {
  position: relative;
  width: 33.3%;
  height: 420px;
  margin: 0 16px;
  border-radius: 8px;
  background-color: $color-gray-1;
  @include boxShadow;
  overflow: hidden;

  @include hover {
    .other-links-content__background {
      transform: scale(1.05);
    }
  }

  &:first-child {
    margin-left: 0;
  }

  &:last-child {
    margin-right: 0;
  }

  &__href {
    display: block;
    height: 100%;
  }

  &__background {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-size: cover;
    background-position: center;
    transition: transform 1s;
  }

  &__title {
    display: block;
    position: absolute;
    bottom: 32px;
    left: 0;
    padding: 8px 12px;
    font-weight: bold;
    font-size: 24px;
    background-color: white;
  }
}

@include smartphone {
  .other-links {
    padding: 80px $padding-1;

    &__title-en {
      display: none;
    }

    &__title {
      position: relative;
      top: initial;
      left: initial;
      font-size: 20px;
      transform: initial;
      text-align: center;
    }

    &__box {
      display: block;
      margin-top: 32px;
    }
  }

  .other-links-content {
    width: initial;
    height: 120px;
    margin: 20px 0;

    &__title {
      bottom: 42px;
      right: 0;
      left: initial;
      width: 148px;
      padding: 8px 12px;
      font-size: 16px;
    }
  }
}
</style>
