<template>
  <delayed-show class="recruit-banner">
    <figure>
      <img
        class="recruit-banner__picture recruit-banner__picture--1"
        src="~/assets/images/common/recruit_picture_1.png"
        alt=""
      />
      <img
        class="recruit-banner__picture recruit-banner__picture--2"
        src="~/assets/images/common/recruit_picture_2.png"
        alt=""
      />
      <img
        class="recruit-banner__picture recruit-banner__picture--2"
        src="~/assets/images/common/recruit_picture_3.png"
        alt=""
      />
    </figure>
    <p class="recruit-banner__title">
      シナプスでは、<br />魅力的な鹿児島を一緒につくる<br />仲間を求めています！
    </p>
    <common-button title="採用情報を見る" link="/work/recruit/" />
  </delayed-show>
</template>

<script>
import delayedShow from '@/components/atoms/delayedShow'
import commonButton from '@/components/atoms/commonButton'

export default defineNuxtComponent({　　
  components: { commonButton, delayedShow },
})
</script>

<style scoped lang="scss">
.recruit-banner {
  position: relative;
  height: 400px;
  background-color: $color-gray-4;
  overflow: hidden;

  &__picture {
    position: absolute;
    left: 50%;
    opacity: 0.5;

    &--1 {
      top: -32px;
      width: 495px;
      transform: translateX(-960px);
    }

    &--2 {
      top: 29px;
      width: 419px;
      transform: translateX(-111px);
    }

    &--3 {
      top: -30px;
      width: 521px;
      transform: translateX(478px);
    }
  }

  &__title {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 600px;
    line-height: 1.5em;
    padding: 32px 56px;
    @include fontTsuku;
    font-size: 32px;
    background-color: white;
    transform: translate(-600px, -50%);
    box-sizing: border-box;
  }

  :deep(.common-button) {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 420px;
    transform: translate(180px, 30px);
  }
}

@include smartphone {
  .recruit-banner {
    height: initial;
    padding: 100px 0;

    &__picture {
      &--1 {
        top: initial;
        bottom: -18px;
        left: -28px;
        width: 495px;
        transform: initial;
      }

      &--2,
      &--3 {
        display: none;
      }
    }

    &__title {
      position: relative;
      top: initial;
      left: initial;
      width: calc(100% - 20px);
      padding: 32px 24px;
      font-size: 22px;
      transform: initial;
    }

    :deep(.common-button) {
      position: relative;
      top: initial;
      left: initial;
      width: 264px;
      margin: 44px auto 0;
      transform: initial;
    }
  }
}
</style>
