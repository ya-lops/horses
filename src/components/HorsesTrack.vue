<template>
  <div class="overflow-hidden">
    <div class="horses-line" />
  </div>
</template>

<style scoped>
.horses-line {
  --tile: 1662px;

  width: calc(100% + var(--tile) * 4);
  height: 105px;
  background: url("../assets/img/horses.webp") repeat-x 0 0 / var(--tile) 100%;
  animation: run linear both;
  animation-timeline: scroll(root block);
}

@keyframes run {
  to {
    transform: translateX(calc(var(--tile) * 3));
  }
}
</style>
