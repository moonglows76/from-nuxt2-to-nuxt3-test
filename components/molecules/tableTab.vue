<template>
  <div ref="tab" class="tab">
    <nuxt-link
      v-for="(tab, index) in tabs"
      :key="index"
      :to="`/${base}/#${tab.slug}`"
      class="tab__content hover-opacity"
      :class="{
        'tab__content--on': tab.slug === slug,
      }"
    >
      {{ tab.name }}
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    tabs: {
      type: Array,
      default: () => {
        return []
      },
    },
    slug: {
      type: String,
      default: '',
    },
    base: {
      type: String,
      default: '',
    },
  },
}
</script>

<style scoped lang="scss">
.tab {
  display: flex;
  max-width: $width-2;
  margin: 0 auto;

  &__content {
    flex-grow: 1;
    position: relative;
    height: 120px;
    line-height: 120px;
    text-align: center;
    font-size: 24px;
    font-weight: bold;

    &:after {
      position: absolute;
      bottom: 20px;
      right: 0;
      left: 0;
      width: 16px;
      height: 16px;
      margin: auto;
      background-image: url('/images/illust/arrow.png');
      background-position: center;
      background-size: contain;
      background-repeat: no-repeat;
      transform: rotate(92deg);
      content: '';
    }

    &--on {
      background-color: white;
      pointer-events: none;

      &:after {
        display: none;
      }
    }
  }
}

@include smartphone {
  .tab {
    &__content {
      height: 50px;
      line-height: 50px;
      font-size: 13px;

      &:after {
        bottom: 6px;
        width: 8px;
        height: 8px;
      }
    }
  }
}
</style>
