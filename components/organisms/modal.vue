<template>
  <div
    class="modal"
    :class="{
      'modal--show': description,
    }"
  >
    <div class="modal__background" @click="$emit('close')" />
    <div class="modal__box">
      <p class="modal__description" v-html="description" />
      <div class="modal__close hover-opacity" @click="$emit('close')" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    description: {
      type: String,
      default: '',
    },
  },
  watch: {
    description(val) {
      this.$store.commit('updateIsOpenModal', !!val)
    },
  },
}
</script>

<style scoped lang="scss">
.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(52, 52, 52, 0.9);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;
  z-index: 1;

  &--show {
    opacity: 1;
    pointer-events: auto;

    .modal__box {
      transform: translate(-50%, -50%);
    }
  }

  &__background {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  &__box {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 640px;
    padding: 48px 64px;
    border-radius: 16px;
    background-color: white;
    @include boxShadow;
    box-sizing: border-box;
    transform: translate(-50%, -50%) scale(0.8);
    transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
    transition-duration: 0.3s;
  }

  &__description {
    line-height: 2em;
    font-size: 18px;
  }

  &__close {
    position: absolute;
    top: -32px;
    right: -32px;
    width: 64px;
    height: 64px;
    background-color: white;
    border-radius: 50%;
    cursor: pointer;
    @include boxShadow;

    &:after {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 32px;
      height: 32px;
      margin: auto;
      background-image: url('/images/illust/close.png');
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
      content: '';
    }
  }
}

@include smartphone {
  .modal {
    &__box {
      width: calc(100% - 64px);
      padding: 24px;
    }

    &__description {
      font-size: 14px;
    }

    &__close {
      top: -16px;
      right: -16px;
      width: 48px;
      height: 48px;

      &:after {
        width: 20px;
        height: 20px;
      }
    }
  }
}
</style>
