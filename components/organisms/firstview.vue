<template>
  <div
    class="firstview"
    :class="{
      'firstview--no-background': !background,
    }"
  >
    <div
      v-if="background"
      class="firstview__background"
      :style="`background-image: url(${background})`"
    />
    <figure
      v-if="!background && $store.imageSuffix !== null"
      class="firstview__picture-container"
    >
      <img
        class="firstview__picture"
        :src="`/images/index/firstview_illust${$store.imageSuffix}.jpg`"
        alt=""
      />
    </figure>
    <p class="firstview__title-en">
      {{ titleEn }}
    </p>
    <label-animation :has-fadein="!!background" class="firstview__title">
      {{ title }}
    </label-animation>
    <br />
    <p class="firstview__description" v-html="description" />
  </div>
</template>

<script>
import labelAnimation from '@/components/atoms/labelAnimation'

export default defineComponent({
  components: { labelAnimation },
  props: {
    titleEn: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    background: {
      type: String,
      default: '',
    },
  },
})
</script>

<style scoped lang="scss">
@keyframes background-scale {
  from {
    transform: scale(1.2);
  }
  to {
    transform: scale(1);
  }
}

.firstview {
  position: relative;
  padding: 172px 0 210px 120px;
  margin: 0 auto;
  overflow: hidden;

  &--no-background {
    :deep(.label-animation),
    .firstview__description {
      transform: translateX(-0.4em);
    }
  }

  &__background {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-size: cover;
    background-position: center;
    animation: background-scale 8s;
  }

  &__picture-container {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    height: 1400px;
    overflow: hidden;
    pointer-events: none;
  }

  &__picture {
    position: absolute;
    top: 70px;
    left: 50%;
    width: 1541px;
    transform: translateX(-467px);
    opacity: 0.1;
  }

  &__title-en {
    position: relative;
    @include fontTsuku;
    font-size: 20px;
    color: $color-gray-1;
  }

  &__title {
    position: relative;
    margin-top: 36px;
    font-size: 44px;
    @include fontTsuku;
    letter-spacing: 0.1em;
  }

  &__description {
    display: inline-block;
    position: relative;
    line-height: 1.8em;
    margin-top: 28px;
    padding: 0;
    font-size: 14px;
    background-color: white;
  }
}

@include smartphone {
  .firstview {
    padding: 108px $padding-1 160px 40px;

    &--no-background {
      :deep(.label-animation),
      .firstview__description {
        transform: initial;
      }
    }

    &__picture {
      top: 0;
      width: 544px;
      transform: translateX(-254px);
    }

    &__title-en {
      position: absolute;
      top: 148px;
      left: 56px;
      font-size: 11px;
    }

    &__title {
      margin-top: 0;
      font-size: 20px;
      text-align: center;
    }

    &__description {
      display: none;
    }
  }
}
</style>
