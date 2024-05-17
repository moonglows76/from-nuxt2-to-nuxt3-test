// import Vue from 'vue'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  return {
    provide: {
      sleep(duration) {
        return new Promise((resolve) => {
          setTimeout(resolve, duration)
        })
      },
      fontReload() {
        if (config.wpAccessToken || this.$store.fontReloadCount > 0) {
          window.FONTPLUS.reload()
        }
        this.$store.incrementFontReloadCount()
      },
    }
  }
})
// Vue.mixin({
//   methods: {
//     sleep(duration) {
//       return new Promise((resolve) => {
//         setTimeout(resolve, duration)
//       })
//     },
//     fontReload() {
//       if (process.env.wpAccessToken || this.$store.state.fontReloadCount > 0) {
//         window.FONTPLUS.reload()
//       }
//       this.$store.commit('incrementFontReloadCount')
//     },
//   },
// })
