<template>
  <div
    :class="[
      `delayed-show--${modifier}`,
      {
        'delayed-show--show': isShow,
        'delayed-show--finish': isFinished,
      },
    ]"
    class="delayed-show"
    @click="$emit('click')"
  >
    <slot />
  </div>
</template>

<script>
import { gsap, Power2 } from 'gsap'

export default {
  props: {
    delay: {
      type: Number,
      default: 0,
    },
    modifier: {
      type: String,
      default: '',
    },
    isForce: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isShow: false,
      isFinished: false,
    }
  },
  watch: {
    isForce(val) {
      if (val && !this.isShow) {
        setTimeout(() => {
          this.isShow = true
        }, this.delay * 1000)
        window.removeEventListener('scroll', this.updateShow)
      }
    },
    async isShow(val) {
      if (!val) {
        return
      }

      this.$emit('start')

      switch (this.modifier) {
        case 'image':
          await this.showImage()
          break
        default:
          await this.sleep(1500)
          break
      }

      this.$emit('finish')
      this.isFinished = true
    },
  },
  async mounted() {
    window.addEventListener('scroll', this.updateShow)

    await this.sleep(500)
    this.updateShow()
  },
  destroyed() {
    window.removeEventListener('scroll', this.updateShow)
  },
  methods: {
    async showImage() {
      gsap.set(this.$el, {
        x: 100,
        width: 0,
      })

      await new Promise((resolve) => {
        gsap.to(this.$el, {
          duration: 1.5,
          x: 0,
          width: this.$el.scrollWidth,
          ease: Power2.easeOut,
          onComplete: resolve,
        })
      })
    },
    updateShow() {
      const offset = 150
      const isReachToPageBottom =
        window.pageYOffset + window.innerHeight >
        document.body.clientHeight - offset

      if (
        isReachToPageBottom ||
        this.$el.getBoundingClientRect().top + offset < window.innerHeight
      ) {
        this.$emit('trigger')

        setTimeout(() => {
          this.isShow = true
        }, this.delay * 1000)
        window.removeEventListener('scroll', this.updateShow)
      }
    },
  },
}
</script>

<style scoped lang="scss">
.delayed-show {
  opacity: 0;
  transform: translateY(50px);
  transition-property: transform, opacity;
  transition-duration: 1.5s;

  &--show {
    opacity: 1;
    transform: translateY(0px);
  }

  &--no-transform {
    margin-top: 50px;
    transition-property: margin-top, opacity;
    transform: none;

    &.delayed-show--show {
      margin-top: 0px;
    }
  }

  &--no-move {
    transition-property: margin-top, opacity;
    transform: none;
  }

  &--scale {
    transform: scale(0.8);
    transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
    transition-duration: 0.5s;

    &.delayed-show--show {
      transform: scale(1);
    }
  }

  &--image {
    transform: initial;
    transition: initial;
    overflow: hidden;

    &.delayed-show--show {
      transform: initial;
    }

    &.delayed-show--finish {
      overflow: visible;
    }
  }
}
</style>
