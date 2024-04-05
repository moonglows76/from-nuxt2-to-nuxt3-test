<template>
  <div>
    <div v-for="(list, index) in lists" :key="index" class="list">
      <p class="list__key">
        {{ list.key }}
      </p>
      <p class="list__value" v-html="list.value" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    lists: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
}
</script>

<style scoped lang="scss">
.list {
  position: relative;
  display: flex;
  width: 940px;
  line-height: 2em;
  margin: 0 auto;
  transform: translateX(64px);

  &:first-child {
    &:before {
      position: absolute;
      top: -64px;
      left: 0;
      width: 1px;
      height: 64px;
      background-color: $color-gray-3;
      content: '';
    }
  }

  &__key {
    width: 234px;
    padding: 20px 0 20px 20px;
    box-sizing: border-box;
    border-bottom: solid 1px $color-gray-3;
    border-left: solid 1px $color-gray-3;
  }

  &__value {
    width: calc(100% - 270px);
    margin-left: 36px;
    padding: 20px 0;
    border-bottom: solid 1px $color-gray-3;

    :deep(a) {
      text-decoration: underline;
    }
  }
}

@include smartphone {
  .list {
    display: block;
    width: initial;
    padding: 16px 0;
    border-bottom: solid 1px $color-gray-3;
    transform: initial;

    &:first-child {
      border-top: solid 1px $color-gray-3;

      &:before {
        display: none;
      }
    }

    &__key {
      width: initial;
      padding: initial;
      font-weight: bold;
      border-bottom: initial;
      border-left: initial;
    }

    &__value {
      width: initial;
      margin-left: initial;
      padding: initial;
      font-size: 14px;
      border-bottom: initial;

      :deep(iframe) {
        max-width: 100%;
      }
    }
  }
}
</style>
