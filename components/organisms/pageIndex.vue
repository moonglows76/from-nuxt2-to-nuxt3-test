<template>
  <div class="page-index-container">
    <div v-for="(content, index) in contents" :key="index" class="page-index">
      <delayed-show>
        <div class="page-index__information">
          <!-- TODOlater add en title -->
          <p class="page-index__title">
            {{ content.title }}
          </p>
          <p class="page-index__description">
            {{ content.description }}
          </p>
          <common-button
            :link="content.path"
            :is-external="content.isExternal"
            title="詳しく見る"
          />
        </div>
      </delayed-show>
      <delayed-show modifier="image" class="page-index__thumbnail-container">
        <div
          class="page-index__thumbnail"
          :style="`background-image: url(${content.thumbnail})`"
        />
      </delayed-show>
    </div>
  </div>
</template>

<script>
import commonButton from '@/components/atoms/commonButton'
import delayedShow from '@/components/atoms/delayedShow'

export default defineComponent({
  components: { commonButton, delayedShow },
  props: {
    contents: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
})
</script>

<style scoped lang="scss">
.page-index-container {
  min-width: $width-2;
  margin-top: -80px;
}

.page-index {
  position: relative;
  padding: 1px 0;
  overflow: hidden;
  background-color: rgba(244, 244, 244, 0.6);

  &__thumbnail-container {
    position: absolute;
    top: 240px;
    left: 50%;
    margin-left: -908px;
  }

  &__thumbnail {
    width: 1010px;
    height: 540px;
    background-size: cover;
    background-position: center;
  }

  &__information {
    width: 1600px;
    height: 550px;
    margin-top: 500px;
    margin-left: 50%;
    padding-top: 110px;
    padding-right: 240px;
    padding-left: 960px;
    box-sizing: border-box;
    background-color: white;
    transform: translateX(-50%);
  }

  &__title {
    line-height: 1em;
    font-size: 40px;
    @include fontTsuku;
  }

  &__description {
    line-height: 2em;
    margin-top: 56px;
    font-size: 16px;
  }

  :deep(.common-button) {
    width: 393px;
    margin-top: 48px;
  }
}

@include smartphone {
  .page-index-container {
    min-width: initial;
    margin-top: initial;
  }

  .page-index {
    padding: 1px 0 64px;

    &__thumbnail-container {
      top: 0;
      left: 0;
      margin-left: initial;
    }

    &__thumbnail {
      width: 332px;
      height: 180px;
    }

    &__information {
      width: initial;
      height: initial;
      margin-top: 140px;
      margin-left: 40px;
      padding-top: 90px;
      padding-right: 52px;
      padding-bottom: 32px;
      padding-left: 52px;
      transform: initial;
    }

    &__title {
      font-size: 18px;
    }

    &__description {
      margin-top: 24px;
      font-size: 14px;
    }

    :deep(.common-button) {
      width: 244px;
      margin-top: 24px;
    }
  }
}
</style>
