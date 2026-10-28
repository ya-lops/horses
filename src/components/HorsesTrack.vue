<template>
  <div class="overflow-hidden">
    <div class="horses-line" />
  </div>
</template>

<style scoped>
.horses-line {
  --frame-width: 238px;
  --frame-count: 7; 
  --cycle-count: 30;

  height: 105px;
  background: url("../assets/img/horses.webp") repeat-x 0 0 /
    calc(var(--frame-width) * var(--frame-count)) 100%;

  animation: run steps(210) both;
  animation-timeline: scroll(root block);
}

@keyframes run {
  to {
    background-position-x: calc(
      var(--frame-width) * var(--frame-count) * var(--cycle-count) * -1
    );
  }
}
</style>
