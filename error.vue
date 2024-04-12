<template>
  <NuxtLayout name="default">
    <div class="enclosure">
      <div class="content">
        <p class="content__title">404 Not Found</p>
        <p class="content__description">お探しのページは見つかりません。</p>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
</script>

<style scoped lang="scss">
.content {
  max-width: 800px;
  margin: 0 auto;
  padding: 188px 96px;

  &__title {
    font-size: 36px;
    font-weight: bold;
    @include fontTsuku;
  }

  &__description {
    margin-top: 32px;
  }
}
</style>
