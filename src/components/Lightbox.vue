<script setup>
import { ref, nextTick } from "vue";

const dialogRef = ref(null);
const currentPeriod = ref(null);

async function open(period) {
  currentPeriod.value = period;
  await nextTick();
  dialogRef.value.showModal();
}

defineExpose({ open });
</script>

<template>
  <dialog ref="dialogRef" class="lightbox">
    <img
      v-if="currentPeriod"
      :src="currentPeriod.fullImage"
      :alt="currentPeriod.alt"
    />

    <button type="button" @click="dialogRef.close()">
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        stroke="currentColor"
        stroke-width="2.4"
        stroke-linecap="round"
      >
        <path d="m2 2 12 12M14 2 2 14" />
      </svg>
    </button>
  </dialog>
</template>

<style scoped>
.lightbox {
  position: fixed;
  inset: 0;
  margin: auto;
  padding: 0;
  border: 0;
  background: transparent;
  max-width: 94vw;
  max-height: 94vh;
  overflow: visible;

  &:not([open]) {
    display: none;
  }

  &::backdrop {
    background: rgb(30 15 5 / 0.88);
  }

  img {
    display: block;
    max-width: 94vw;
    max-height: 94vh;
    object-fit: contain;
  }

  button {
    position: absolute;
    top: 12px;
    right: 12px;
    display: grid;
    place-items: center;
    width: 40px;
    height: 40px;
    border-radius: 9999px;
    background: var(--color-cream);
    color: var(--color-rust);
    cursor: pointer;
  }
}
</style>
