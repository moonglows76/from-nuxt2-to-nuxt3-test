<template>
  <div class="background-layer">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.background-layer {
  position: relative;
  background-color: $color-gray-2;
}
</style>
