<template>
  <div class="breadcrumb">
    <div
      v-for="(content, index) in contents"
      :key="index"
      class="breadcrumb__content"
    >
      <nuxt-link
        :to="content.link"
        class="breadcrumb__text"
        v-text="limitMaxLength(content.title)"
      />
      <img
        src="/images/common/icon_arrow_black.png"
        alt=""
        class="breadcrumb__arrow"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    contents: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  methods: {
    limitMaxLength(text) {
      const maxLength = this.$store.state.isSmartphone ? 15 : 9999
      return text.length <= maxLength ? text : `${text.slice(0, maxLength)}…`
    },
  },
}
</script>

<style scoped lang="scss">
.breadcrumb {
  position: absolute;
  top: 0;
  right: 112px;
  left: 112px;
  display: flex;
  flex-wrap: wrap;
  padding: 12px 24px;
  background-color: rgba(220, 220, 220, 0.4);
  border-radius: 60px;

  &__content {
    line-height: 1.8em;
    font-size: 12px;

    &:last-child {
      font-weight: bold;

      .breadcrumb {
        &__text {
          pointer-events: none;
          text-decoration: none;
        }

        &__arrow {
          display: none;
        }
      }
    }
  }

  &__text {
    text-decoration: underline;
  }

  &__arrow {
    width: 6px;
    margin: 0 12px;
    pointer-events: none;
  }
}

@include smartphone {
  .breadcrumb {
    top: 0;
    right: $padding-1;
    left: $padding-1;
    border-radius: 12px;

    &__arrow {
      margin: 0 10px 0 6px;
    }
  }
}
</style>
