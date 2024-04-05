<template>
  <div
    class="label-animation"
    :class="{
      'label-animation--show': isShow,
      'label-animation--no-animation': noAnimation,
    }"
  >
    <div class="label-animation__content">
      <slot />
    </div>
    <div ref="cover" class="label-animation__cover" />
  </div>
</template>

<script>
import { gsap, Power2 } from 'gsap'

export default {
  props: {
    hasFadein: {
      type: Boolean,
      default: true,
    },
    isStart: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      isShow: false,
      noAnimation: false,
      originalWidth: 0,
    }
  },
  watch: {
    isStart(val) {
      val && this.$emit('start')
    },
  },
  async mounted() {
    await this.sleep(200)

    this.originalWidth = this.$el.clientWidth

    const widthThreshold = this.$store.state.isSmartphone
      ? 280
      : window.innerWidth - 224
    if (this.originalWidth >= widthThreshold) {
      this.isShow = true
      this.noAnimation = true
    } else {
      gsap.set(this.$el, {
        width: 0,
      })

      await new Promise((resolve) => {
        this.isStart ? resolve() : this.$once('start', resolve)
      })

      this.show()
    }
  },
  methods: {
    async show() {
      this.isShow = true

      await this.sleep(500)

      await new Promise((resolve) => {
        gsap.to(this.$el, {
          duration: this.hasFadein ? 0.5 : 0,
          width: this.originalWidth,
          ease: Power2.easeIn,
          onComplete: resolve,
        })
      })

      gsap.to(this.$refs.cover, {
        duration: 0.5,
        left: this.originalWidth,
        ease: Power2.easeOut,
      })
    },
  },
}
</script>

<style scoped lang="scss">
.label-animation {
  visibility: hidden;
  position: relative;
  display: inline-block;
  background-color: white;
  overflow: hidden;

  &--show {
    visibility: visible;
  }

  &--no-animation {
    overflow: visible;

    .label-animation {
      &__content {
        padding: 0 8px;
        line-height: 1.6em;
        white-space: initial;
      }

      &__cover {
        display: none;
      }
    }
  }

  &__content {
    padding: 4px 8px;
    white-space: nowrap;
  }

  &__cover {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: white;
  }
}
</style>
