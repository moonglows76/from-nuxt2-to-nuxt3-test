import Vue from 'vue'

Vue.mixin({
  methods: {
    sleep(duration) {
      return new Promise((resolve) => {
        setTimeout(resolve, duration)
      })
    },
    fontReload() {
      if (process.env.wpAccessToken || this.$store.state.fontReloadCount > 0) {
        window.FONTPLUS.reload()
      }
      this.$store.commit('incrementFontReloadCount')
    },
  },
})
