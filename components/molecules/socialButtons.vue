<template>
  <div class="social-buttons">
    <div
      v-for="(content, index) in contents"
      :key="index"
      class="social-buttons__content hover-opacity"
      @click="share(content.name)"
    >
      <img
        :src="`/images/illust/${content.name}_white.png`"
        class="social-buttons__picture"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      contents: [
        {
          name: 'facebook',
        },
        {
          name: 'twitter',
        },
      ],
    }
  },
  methods: {
    share(type) {
      const url = encodeURIComponent(
        `${process.env.url}${this.$route.path.slice(1)}`
      )
      const text = document.documentElement?.querySelector('title')?.textContent

      switch (type) {
        case 'facebook':
          window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`)
          break
        case 'twitter':
          window.open(
            `https://twitter.com/intent/tweet?url=${url}&text=${text}`
          )
          break
      }
    },
  },
}
</script>

<style scoped lang="scss">
.social-buttons {
  display: flex;
  justify-content: center;
  padding-top: 80px;

  &__content {
    position: relative;
    width: 60px;
    height: 60px;
    margin: 0 24px;
    background-color: $color-black-1;
    border-radius: 4px;
    cursor: pointer;
  }

  &__picture {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 36px;
    transform: translate(-50%, -50%);
  }
}

@include smartphone {
  .social-buttons {
    padding-top: 64px;

    &__content {
      width: 40px;
      height: 40px;
      margin: 0 16px;
    }

    &__picture {
      width: 24px;
    }
  }
}
</style>
