<script setup>
import { ref, computed } from "vue";
import CircledPreview from "./CircledPreview.vue";

const TAP_MAX_SHIFT = 6 // px: сдвиг меньше этого значения считается тапом, а не свайпом
const SWIPE_MIN_SHIFT = 50 // px: минимальный сдвиг для переключения слайда

const props = defineProps({ periods: Array });
const emit = defineEmits(["open"]);

const activeIdx = ref(0);
const dragShift = ref(0);
const isDragging = ref(false);
const wasDragged = ref(false);
let startPosX = 0;

const lastIdx = computed(() => props.periods.length - 1);
const goTo = (idx) =>
  (activeIdx.value = Math.max(0, Math.min(lastIdx.value, idx)));

function onDragStart(event) {
  isDragging.value = true;
  wasDragged.value = false;
  dragShift.value = 0;
  startPosX = event.clientX;
}

function onDragMove(event) {
  if (!isDragging.value) return;
  dragShift.value = event.clientX - startPosX;

  if (!wasDragged.value && Math.abs(dragShift.value) > TAP_MAX_SHIFT) {
    wasDragged.value = true;
    event.currentTarget.setPointerCapture(event.pointerId);
  }
}

function onDragEnd() {
  if (!isDragging.value) return;
  isDragging.value = false;
  
  if (Math.abs(dragShift.value) > SWIPE_MIN_SHIFT)
    goTo(activeIdx.value + (dragShift.value < 0 ? 1 : -1));
  dragShift.value = 0;
}

const openLightbox = (period) => {
  if (!wasDragged.value) emit("open", period);
};
</script>

<template>
  <section class="px-3 pb-10">
    <div class="relative">
      <div class="overflow-hidden">
        <div
          class="flex touch-pan-y select-none"
          :class="
            isDragging ? '' : 'transition-transform duration-500 ease-out'
          "
          :style="{
            transform: `translateX(calc(${-activeIdx * 100}% + ${dragShift}px))`,
          }"
          @pointerdown="onDragStart"
          @pointermove="onDragMove"
          @pointerup="onDragEnd"
          @pointercancel="onDragEnd"
        >
          <article
            v-for="period in periods"
            :key="period.id"
            class="w-full shrink-0 px-[30px]"
          >
            <div class="mx-auto w-full max-w-[291px]">
              <CircledPreview :period="period" @open="openLightbox" />
            </div>
            <h2
              class="mt-6 text-center text-xl font-extrabold uppercase text-rust"
            >
              {{ period.title }}
            </h2>
            <p class="mt-3 text-[14px] leading-relaxed">{{ period.text }}</p>
          </article>
        </div>
      </div>

      <button
        type="button"
        class="absolute left-0 top-[145px] grid size-[33px] -translate-y-1/2 place-items-center rounded-full bg-rust text-cream disabled:opacity-30"
        :disabled="activeIdx === 0"
        @click="goTo(activeIdx - 1)"
      >
        <svg
          width="10"
          height="16"
          viewBox="0 0 10 16"
          fill="none"
          stroke="currentColor"
          stroke-width="2.4"
        >
          <path d="M8 1 2 8l6 7" />
        </svg>
      </button>

      <button
        type="button"
        class="absolute right-0 top-[145px] grid size-[33px] -translate-y-1/2 place-items-center rounded-full bg-rust text-cream disabled:opacity-30"
        :disabled="activeIdx === lastIdx"
        @click="goTo(activeIdx + 1)"
      >
        <svg
          width="10"
          height="16"
          viewBox="0 0 10 16"
          fill="none"
          stroke="currentColor"
          stroke-width="2.4"
        >
          <path d="m2 1 6 7-6 7" />
        </svg>
      </button>
    </div>

    <div class="mt-8 flex justify-center gap-3.5">
      <button
        v-for="(period, idx) in periods"
        :key="period.id"
        type="button"
        class="size-[21px] rounded-full border-2 border-rust transition-colors"
        :class="idx === activeIdx ? 'bg-rust' : 'bg-transparent'"
        @click="goTo(idx)"
      />
    </div>
  </section>
</template>
