<template>
  <nuxt-link
    :to="link"
    class="common-sidebar"
    :style="{
      color: $store.state.firstviewColor,
    }"
  >
    <p class="common-sidebar__date">
      {{ date }}
    </p>
    <p class="common-sidebar__title">お知らせ</p>
    <p class="common-sidebar__content">
      {{ title }}
    </p>
  </nuxt-link>
</template>

<script>
import moment from 'moment'

export default {
  data() {
    return {
      link: '',
      title: '',
      date: '',
    }
  },
  async mounted() {
    const { data } = await this.$axios.get(
      `${process.env.apiEndpoint}news?_embed`
    )
    const _data = data[0]
    this.link = `/news/${_data.slug}`
    this.title = _data.title.rendered.replace(/<br>/g, '')
    this.date = moment(_data.date).format('M/D')
  },
}
</script>

<style scoped lang="scss">
.common-sidebar {
  display: block;
  position: absolute;
  top: 188px;
  left: 40px;
  width: 54px;

  &__date {
    color: $color-gray-1;
    font-size: 20px;
    text-align: center;
  }

  &__title {
    line-height: 1.8em;
    margin-top: 8px;
    font-size: 13px;
    font-weight: bold;
    text-align: center;
  }

  &__content {
    line-height: 54px;
    margin-top: 24px;
    writing-mode: vertical-rl;
    -ms-writing-mode: tb-rl;
    text-orientation: upright;
    -webkit-text-orientation: upright;
    font-feature-settings: initial;
    white-space: nowrap;
    letter-spacing: 0.1em;
  }
}

@include smartphone {
  .common-sidebar {
    display: none;
    /* border: 1px solid purple;*/

    top: 420px;
    width: 90%;

    &__date {
      text-align: left;
      /* border: 1px solid red;*/
    }
    &__title {
      margin-top: 2px;
      text-align: left;
      /* border: 1px solid blue;*/
    }
    &__content {
      width: 100%;
      margin-top: 6px;
      line-height: normal;
      writing-mode: horizontal-tb;
      -ms-writing-mode: lr-tb;
      white-space: normal;
      letter-spacing: normal;
      /* border: 1px solid green;*/
    }
  }
}
</style>
