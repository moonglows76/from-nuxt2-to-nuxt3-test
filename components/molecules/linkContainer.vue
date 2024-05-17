<template>
  <delayed-show v-if="getHasLink()" class="link-container">
    <div class="link-container__box">
      <div
        v-for="(link, index) in links"
        v-show="link"
        :key="index"
        class="link hover-opacity"
        :class="`link--${link ? link.position : ''}`"
      >
        <nuxt-link v-if="link" :to="link.path" class="link__href">
          <div
            v-if="link.thumbnail"
            :style="`background-image: url(${link.thumbnail})`"
            class="link__thumbnail"
          />
          <div class="link__information">
            <p class="link__role">
              {{ link.role }}
            </p>
            <p class="link__name">
              {{ link.name }}
            </p>
          </div>
        </nuxt-link>
      </div>
    </div>
  </delayed-show>
</template>

<script>
import delayedShow from '@/components/atoms/delayedShow'

export default defineNuxtComponent({
  components: { delayedShow },
  props: {
    links: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  methods: {
    getHasLink() {
      return this.links.find((link) => {
        return link !== null
      })
    },
  },
})
</script>

<style scoped lang="scss">
.link-container {
  position: relative;
  margin-top: 160px;
  padding: 48px 0;
  background-color: $color-black-2;
  overflow: hidden;

  &__box {
    display: flex;
    max-width: $width-2;
    margin: 0 auto;
  }
}

.link {
  width: calc(50% - 20px);
  border-radius: 8px;
  background-color: white;
  box-sizing: border-box;

  &:first-child {
    margin-right: 40px;
  }

  &__href {
    display: flex;
    width: 100%;
    padding: 20px;
  }

  &__thumbnail {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-size: cover;
    background-position: center;
  }

  &__information {
    padding-top: 16px;
    padding-right: 20px;
    padding-bottom: 16px;
    padding-left: 20px;
  }

  &__role {
    font-size: 14px;
  }

  &__name {
    position: relative;
    margin-top: 12px;
    font-weight: bold;
    font-size: 18px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

@include smartphone {
  .link-container {
    margin-top: 0;
    padding: 12px $padding-1;

    &__box {
      display: block;
    }
  }

  .link {
    width: initial;
    margin: 16px 0;
    border-radius: 8px;

    &:first-child {
      margin-right: initial;
    }

    &__href {
      width: initial;
      padding: 16px;
    }

    &__thumbnail {
      width: 80px;
      height: 80px;
    }

    &__information {
      padding-top: 20px;
      padding-left: 12px;
    }

    &__role {
      font-size: 13px;
    }

    &__name {
      line-height: 1.5em;
      margin-top: 12px;
      font-size: 20px;
      text-overflow: initial;
      white-space: initial;
    }
  }
}
</style>
