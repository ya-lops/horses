<script setup>
import frameImage from "../assets/img/frame.webp";

defineProps({ period: { type: Object, required: true } });
defineEmits(["open"]);
</script>

<template>
  <div
    class="relative aspect-square w-full rounded-full border border-[#c98a43]"
  >
    <div
      class="absolute left-1/2 top-1/2 aspect-square w-[94%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d57300]/30"
    />

    <img
      class="preview-frame pointer-events-none absolute left-1/2 top-1/2 -ml-[43.5%] -mt-[43.9%] w-[87%] will-change-transform"
      :src="frameImage"
      draggable="false"
      alt=""
    />

    <button
      type="button"
      class="absolute left-1/2 top-1/2 size-[65%] -translate-x-1/2 -translate-y-1/2 cursor-zoom-in overflow-hidden rounded-full"
      @click="$emit('open', period)"
    >
      <img
        class="preview-img size-full object-cover"
        :src="period.thumbImage"
        draggable="false"
        :alt="period.alt"
      />
    </button>
  </div>
</template>
