<template>
  <p
    :style="{
      opacity: currentNumber > 0 ? 1 : 0,
    }"
    class="number"
  >
    <span
      class="number__number"
      :style="{
        fontSize: `${
          (172 - `${number}`.length * 14) *
          ($store.state.isSmartphone ? 0.8 : 1)
        }px`,
      }"
      >{{ commaSeparate(currentNumber) }}</span
    >
    <span class="number__suffix">{{ suffix }}</span>
    <span v-show="false" class="number__dummy">0123456789.</span>
  </p>
</template>

<script>
import { gsap, Power0 } from 'gsap'

export default defineNuxtComponent({
  props: {
    number: {
      type: Number,
      default: 0,
    },
    suffix: {
      type: String,
      default: '',
    },
    delay: {
      type: Number,
      default: 0,
    },
    noComma: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      currentNumber: 0,
      decimalLength: 0,
    }
  },
  async mounted() {
    this.decimalLength = this.getDecimalLength(this.number)
    window.addEventListener('scroll', this.checkStart)

    await this.$sleep(500)
    this.$checkStart()
  },
  destroyed() {
    window.removeEventListener('scroll', this.checkStart)
  },
  methods: {
    commaSeparate(number) {
      return this.noComma
        ? number
        : number.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1,')
    },
    getDecimalLength(number) {
      const decimal = String(number).split('.')[1]
      return decimal ? decimal.length : 0
    },
    checkStart() {
      const offset = 150
      const isReachToPageBottom =
        window.pageYOffset + window.innerHeight >
        document.body.clientHeight - offset

      if (
        isReachToPageBottom ||
        this.$el.getBoundingClientRect().top + offset < window.innerHeight
      ) {
        this.start()
        window.removeEventListener('scroll', this.checkStart)
      }
    },
    async start() {
      await this.$sleep(this.delay * 1000)
      const dummyNumber = {
        number: this.currentNumber,
      }

      gsap.to(dummyNumber, {
        duration: 1,
        number: this.number,
        ease: Power0.easeNone,
        onUpdate: () => {
          this.currentNumber =
            this.decimalLength === 0
              ? parseInt(dummyNumber.number)
              : parseFloat(dummyNumber.number).toFixed(this.decimalLength)
        },
        onComplete: () => {
          this.currentNumber = this.number
          this.$emit('finish')
        },
      })
    },
  },
})
</script>

<style scoped lang="scss">
.number {
  @include fontTsuku;
  text-align: center;

  &__number {
    color: $color-orange-1;
    text-shadow: 4px 4px 0 black;
    -webkit-text-stroke: 0.02em black;
  }

  &__suffix {
    font-size: 32px;
    color: white;
    -webkit-text-stroke: 0.02em black;
  }
}

@include smartphone {
  .number {
    &__suffix {
      font-size: 24px;
    }
  }
}
</style>
