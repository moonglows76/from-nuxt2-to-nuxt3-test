<template>
  <article>
    <header class="article">
      <h1 class="article__title">トップページ</h1>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt nostrum corrupti aspernatur repellendus enim a nesciunt quis? Ad repudiandae ducimus quisquam labore tempora reiciendis, ex omnis itaque deleniti, maiores quia.</p>
      <p><a href="dummy" class="hover-opacity" style="border-radius: 10px; background-color: pink; padding: 10px; display: inline-flex;">mixinテスト1</a></p>
      <p><a href="dummy" class="hover-opacity-test" style="border-radius: 10px; background-color: blue; padding: 10px; display: inline-flex; color: white;">mixinテスト2</a></p>
    </header>
  </article>
</template>

<script setup>
const title = 'テスト'
const config = useRuntimeConfig()
const route = useRoute()

useHead({
  title: config.public.titleTemplate.replace(/%s/, title),
  url: `${config.public.url}${route.path.slice(1)}`,
})
</script>

<style scoped lang="scss">
.article {
  &__title {
    font-size: 2rem;
    color: $color-orange-1;
  }
}
.hover-opacity-test {
  transition: opacity 1s;

  @include hover {
    opacity: 0.2;
  }
}
</style>