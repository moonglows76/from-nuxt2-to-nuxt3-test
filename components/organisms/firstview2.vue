<template>
  <section
    class="firstview2"
    :class="{
      'firstview2--large': isLarge,
      'firstview2--no-background': !background,
    }"
  >
    <div
      v-if="background"
      class="firstview2__background"
      :style="`background-image: url(${background})`"
    />
    <figure
      v-if="!background && $store.state.imageSuffix !== null"
      class="firstview2__picture-container"
    >
      <img
        class="firstview2__picture"
        :src="`/images/index/firstview_illust${$store.state.imageSuffix}.jpg`"
        alt=""
      />
    </figure>
    <p class="firstview2__role-en">
      {{ roleEn }}
    </p>

    <div class="firstview2__meta">
      <p class="firstview2__page-title">
        {{ title }}
      </p>
      <p class="firstview2__name">
        {{ name }}
      </p>
      <p class="firstview2__role">
        {{ role }}
      </p>
    </div>

    <h1 class="firstview2__title-container">
      <div v-for="(_title, index) in titles" :key="index">
        <label-animation :has-fadein="!!background" class="firstview2__title">
          {{ _title }}
        </label-animation>
        <br />
      </div>
    </h1>
  </section>
</template>

<script>
import labelAnimation from '@/components/atoms/labelAnimation'

export default {
  components: { labelAnimation },
  props: {
    isLarge: {
      type: Boolean,
      default: false,
    },
    background: {
      type: String,
      default: '',
    },
    roleEn: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    role: {
      type: String,
      default: '',
    },
    titles: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
}
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

.firstview2 {
  position: relative;
  height: 560px;
  color: white;
  overflow: hidden;

  &--large {
    height: 700px;
  }

  &--no-background {
    :deep(.label-animation) {
      transform: translateX(-0.2em);
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

    &:before {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.15);
      content: '';
    }
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

  &__role-en {
    position: absolute;
    top: 288px;
    left: 120px;
    @include fontTsuku;
    font-size: 36px;
    font-weight: bold;
    mix-blend-mode: difference;
    letter-spacing: 0.05em;
  }

  &__meta {
    position: absolute;
    top: 220px;
    left: 120px;
  }

  &__page-title {
    font-size: 12px;
  }

  &__name {
    margin-top: 20px;
    @include fontTsuku;
    font-weight: bold;
    font-size: 32px;
    letter-spacing: 0.1em;
  }

  &__role {
    margin-top: 16px;
    font-weight: bold;
  }

  &__title-container {
    position: absolute;
    bottom: 120px;
    right: 112px;
    left: 112px;
  }

  :deep(.label-animation) {
    margin: 8px 0;
    color: $color-black-1;
    @include fontTsuku;
    font-size: 40px;
    font-weight: bold;

    &__content {
      padding: 12px 16px;
    }
  }
}

@include smartphone {
  .firstview2 {
    height: 410px;

    &--large {
      height: 450px;
    }

    &--no-background {
      height: 410px;

      :deep(.label-animation) {
        transform: initial;
      }
    }

    &__picture {
      top: 0;
      width: 544px;
      transform: translateX(-254px);
    }

    &__role-en {
      display: none;
    }

    &__meta {
      top: 192px;
      right: 0;
      left: 0;
      text-align: center;
    }

    &__page-title {
      display: none;
    }

    &__name {
      margin-top: initial;
      font-size: 24px;
    }

    &__role {
      margin-top: 4px;
      font-size: 12px;
    }

    &__title-container {
      bottom: 104px;
      right: $padding-1;
      left: $padding-1;
    }
    :deep(.label-animation) {
      margin: 2px 0;
      font-size: 18px;

      &__content {
        padding: 8px 8px;
      }
    }
  }
}
</style>
