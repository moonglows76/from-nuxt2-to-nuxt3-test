import variables from '@/variables'

export const state = () => ({
  isSmartphone: false,
  imageSuffix: null,
  firstviewColor: variables['color-black-1'],
  fontReloadCount: 0,
  isOpenModal: false,
})

export const mutations = {
  updateIsSmartphone(state, bool) {
    state.isSmartphone = bool
    state.imageSuffix = bool ? '.sp' : ''
  },
  updateFirstviewColor(state, color) {
    state.firstviewColor = color
  },
  incrementFontReloadCount(state) {
    state.fontReloadCount += 1
  },
  updateIsOpenModal(state, bool) {
    state.isOpenModal = bool
  },
}
