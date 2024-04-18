<template>
  <div class="enclosure">
    <div class="nuxt-container">
      <!-- state参照用の要素 -->
      <div style="position: fixed; right: 0; top: 0; z-index: 10;">
        bodyScale: {{ bodyScale }}<br>
        isSmartphone: {{ $store.isSmartphone }}<br>
        imageSuffix: {{ $store.imageSuffix }}<br>
        firstviewColor: {{ $store.firstviewColor }}<br>
        fontReloadCount: {{ $store.fontReloadCount }}<br>
        isOpenModal: {{ $store.isOpenModal }}<br>
      </div>
      <slot />
    </div>

    <MoleculesCommonFooter />

    <MoleculesCommonHeader />

    <OrganismsComp />
  </div>
</template>

<script>
import variables from '~/variables'

export default {
  data() {
    return {
      bodyScale: 'none',
    }
  },
  watch: {
    '$store.isOpenModal'(val) {
      document.body.style.transform = val ? 'none' : this.bodyScale
    },
  },
  mounted() {
    this.onResize()
    this.onScroll()
    window.addEventListener('resize', this.onResize)
    window.addEventListener('scroll', this.onScroll)
  },
  methods: {
    onScroll() {
      if (this.$store.isOpenModal) {
        return
      }

      const windowWidth = window.innerWidth
      if (
        windowWidth >= parseInt(variables['breakpoint-1']) &&
        windowWidth < parseInt(variables['breakpoint-3'])
      ) {
        const scale = windowWidth / parseInt(variables['breakpoint-3'])
        document.body.style.height = `${this.$el.clientHeight * scale}px`
      } else {
        document.body.style.height = 'auto'
      }
    },
    onResize() {
      // TODOlater check other browser
      const windowWidth = window.innerWidth
      if (
        windowWidth >= parseInt(variables['breakpoint-1']) &&
        windowWidth < parseInt(variables['breakpoint-3'])
      ) {
        this.bodyScale = `scale(${
          windowWidth / parseInt(variables['breakpoint-3'])
        })`
      } else {
        this.bodyScale = 'none'
      }

      if (!this.$store.isOpenModal) {
        document.body.style.transform = this.bodyScale
      }

      this.$store.updateIsSmartphone(
        windowWidth < parseInt(variables['breakpoint-1'])
      )
    },
  },
}
</script>

<style scoped lang="scss">
.enclosure {
  position: relative;
  min-width: $width-2;
  min-height: 100vh;
}

@include smartphone {
  .enclosure {
    min-width: initial;
  }
}
</style>
