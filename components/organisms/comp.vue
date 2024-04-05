<template>
  <div v-if="hasComp">
    <img
      :class="{
        'comp--index': isIndex,
        'comp--dev': isDev,
        'comp--show': isShowComp,
        'comp--transparent': isTransparentComp,
        'comp--unToucheable': isUntoucheableComp,
      }"
      class="comp"
      :src="`/images/comp/${
        $route.path === '/' ? 'index' : $route.path.replace(/^\/|\/$/g, '')
      }${$store.state.imageSuffix}.jpg`"
    />

    <div v-show="isDev" class="comp-controller-container">
      <input type="checkbox" @click="toggleIsShowComp" />
      <input type="checkbox" @click="toggleIsTransparentComp" />
      <input type="checkbox" @click="toggleIsUntoucheableComp" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDev: false,
      isIndex: false,
      hasComp: false,
      isShowComp: false,
      isTransparentComp: false,
      isUntoucheableComp: false,
    }
  },
  async mounted() {
    if (location.href.match(/localhost/) && location.href.match(/comp/)) {
      this.hasComp = true
      this.isDev = true
    }

    await new Promise((resolve) => {
      setTimeout(resolve, 200)
    })

    if (this.$route.path === '/') {
      this.isIndex = true
    }
  },
  methods: {
    toggleIsShowComp() {
      this.isShowComp = !this.isShowComp
    },
    toggleIsTransparentComp() {
      this.isTransparentComp = !this.isTransparentComp
    },
    toggleIsUntoucheableComp() {
      this.isUntoucheableComp = !this.isUntoucheableComp
    },
  },
}
</script>

<style scoped lang="scss">
@import '../../assets/styles/mixins';

.comp {
  margin-left: 50%;
  transform: translateX(-50%);
  visibility: hidden;
  z-index: 1;

  &--dev {
    position: absolute;
    top: 0;
  }

  &--index {
    width: 1920px;
  }

  &--show {
    visibility: visible;
  }

  &--transparent {
    opacity: 0.5;
  }

  &--unToucheable {
    pointer-events: none;
  }
}

.comp-controller-container {
  position: fixed;
  top: 0;
  right: 32px;
  z-index: 1;
}

@include smartphone {
  .comp {
    width: 375px;

    &--index {
      width: 375px;
    }
  }
}
</style>
