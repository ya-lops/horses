<script setup>
import CircledPreview from "./CircledPreview.vue";
import { useInView } from "../composables";

defineProps({ period: Object });
defineEmits(["open"]);
const { targetRef: cardRef, isVisible } = useInView(0.4);
</script>

<template>
  <article
    ref="cardRef"
    class="timeline-card grid items-center gap-x-16 md:grid-cols-[383px_1fr]"
    :class="{ 'is-visible': isVisible }"
  >
    <div class="preview aspect-square w-[383px]">
      <CircledPreview :period="period" @open="$emit('open', $event)" />
    </div>

    <div class="max-w-[440px]">
      <h2 class="text-[28px] font-extrabold uppercase leading-tight text-rust">
        {{ period.title }}
      </h2>
      <p class="mt-4 text-[15px] leading-relaxed">{{ period.text }}</p>
    </div>
  </article>
</template>

<style scoped>
.timeline-card {
  &:nth-child(even) .preview {
    order: 2;
  }

  &:not(.is-visible) {
    :deep(.preview-frame),
    :deep(.preview-img) {
      display: none;
    }
  }
}
</style>