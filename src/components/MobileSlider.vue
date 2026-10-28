<script setup>
import { ref, computed } from "vue";
import CircledPreview from "./CircledPreview.vue";

const TAP_MAX_SHIFT = 6; // px: сдвиг меньше этого значения считается тапом, а не свайпом
const SWIPE_MIN_SHIFT = 50; // px: минимальный сдвиг для переключения слайда

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
        :disabled="activeIdx === 0"
        class="absolute left-0 top-[237px] text-[#9e4123] disabled:opacity-30"
        @click="goTo(activeIdx - 1)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="31"
          height="33"
          viewBox="0 0 31 33"
        >
          <path
            fill="currentColor"
            d="M27.91 31.29 29.64 29.85 21.72 16.24 29.21 3.35 27.41 1.98 15.24 16.74ZM17.04 31.43 18.91 29.92 8.47 16.31 18.48 3.28 16.61 1.84 1.27 16.74Z"
          />
        </svg>
      </button>
      
      <button
        type="button"
        :disabled="activeIdx === lastIdx"
        class="absolute right-0 top-[237px] text-[#9e4123] disabled:opacity-30"
        @click="goTo(activeIdx + 1)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="33"
          viewBox="0 0 32 33"
        >
          <path
            fill="currentColor"
            d="M3.69 1.15 1.99 2.61 9.81 16.41 2.41 29.47 4.19 30.86 16.21 15.9ZM14.44 1.01 12.59 2.54 22.9 16.33 13.01 29.54 14.86 31 30.01 15.9Z"
          />
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
