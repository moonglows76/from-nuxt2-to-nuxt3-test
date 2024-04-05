<template>
  <nuxt-link
    :to="isExternal ? '' : link"
    class="common-button"
    @click.native="onClick"
  >
    <span
      class="common-button__content"
      :class="`common-button__content--${modifier}`"
      v-html="title"
    />
    <span class="common-button__icon" />
  </nuxt-link>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    link: {
      type: String,
      default: '',
    },
    modifier: {
      type: String,
      default: '',
    },
    isExternal: {
      type: Boolean,
      default: false,
    },
    isPrevent: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onClick(event) {
      if (this.isPrevent) {
        event.preventDefault()
      }

      if (this.isExternal) {
        window.open(this.link)
      }

      this.$emit('click')
    },
  },
}
</script>

<style scoped lang="scss">
.common-button {
  position: relative;
  display: block;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid $color-gray-3;
  @include boxShadow;
  transition-property: box-shadow, transform;
  transition-duration: 0.3s;

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
    background-color: white;
    letter-spacing: 0.1em;

    &--gray {
      background-color: $color-gray-2;
    }
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

@include smartphone {
  .common-button {
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
</style>
