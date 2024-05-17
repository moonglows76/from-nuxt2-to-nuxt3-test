<template>
  <div v-if="pageMax > 1" class="pagination">
    <a
      v-if="pageCurrent > 1"
      :href="`${basePath}/?page=${pageCurrent - 1}`"
      class="pagination__arrow pagination__arrow--prev"
    >
      前へ
    </a>

    <template v-if="pageCurrent - pageRange > 1">
      <a :href="`${basePath}/?page=1`" class="pagination__number"> 1 </a>
      <p v-if="pageCurrent - pageRange > 2" class="pagination__dot">…</p>
    </template>

    <a
      v-for="(value, index) in Array(pageRange * 2 + 1).fill()"
      v-show="
        pageCurrent - pageRange + index > 0 &&
        pageCurrent - pageRange + index <= pageMax
      "
      :key="index"
      class="pagination__number"
      :class="{
        'pagination__number--current': index === pageRange,
      }"
      :href="`${basePath}/?page=${pageCurrent - pageRange + index}`"
    >
      {{ pageCurrent - pageRange + index }}
    </a>

    <template v-if="pageCurrent + pageRange < pageMax">
      <p v-if="pageCurrent + pageRange < pageMax - 1" class="pagination__dot">
        …
      </p>
      <a :href="`${basePath}/?page=${pageMax}`" class="pagination__number">
        {{ pageMax }}
      </a>
    </template>

    <a
      v-if="pageCurrent < pageMax"
      :href="`${basePath}/?page=${pageCurrent + 1}`"
      class="pagination__arrow pagination__arrow--next"
    >
      次へ
    </a>
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    pageCurrent: {
      type: Number,
      default: 1,
    },
    pageMax: {
      type: Number,
      default: 1,
    },
    basePath: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      pageRange: 2,
    }
  },
  async mounted() {
    await this.$sleep(100)
    this.pageRange = this.$store.isSmartphone ? 1 : 2
  },
})
</script>

<style scoped lang="scss">
.pagination {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
  font-weight: bold;

  &__arrow {
    transition: opacity 0.3s;

    &--prev {
      margin-right: 24px;
    }

    &--next {
      margin-left: 24px;
    }

    @include hover {
      opacity: 0.6;
    }
  }

  &__number {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    width: 48px;
    height: 48px;
    margin: 0 12px;
    border-radius: 50%;
    background-color: white;
    transition: opacity 0.3s;

    &--current {
      color: white;
      background-color: black;
      pointer-events: none;
    }

    @include hover {
      opacity: 0.6;
    }
  }
}

@include smartphone {
  .pagination {
    &__arrow {
      display: none;
    }

    &__number {
      width: 36px;
      height: 36px;
      margin: 0 8px;
      font-size: 13px;
    }
  }
}
</style>
