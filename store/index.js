import { defineStore } from 'pinia'
import variables from '@/variables'

export const useMainStore = defineStore('main', {
  // ストアの定義
  state: () => ({
    isSmartphone: false,
    imageSuffix: null,
    firstviewColor: variables['color-black-1'],
    fontReloadCount: 0,
    isOpenModal: false,
  }),

  // ストアの更新用関数
  actions: {
    updateIsSmartphone(bool) {
      this.isSmartphone = bool
      this.imageSuffix = bool ? '.sp' : ''
    },
    updateFirstviewColor(color) {
      this.firstviewColor = color
    },
    incrementFontReloadCount(state) {
      this.fontReloadCount += 1
    },
    updateIsOpenModal(bool) {
      this.isOpenModal = bool
    },
  },
})
