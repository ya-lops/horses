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
  >
    <div class="preview aspect-square w-[383px]">
      <CircledPreview
        v-if="isVisible"
        :period="period"
        @open="$emit('open', $event)"
      />
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

  :deep(.preview-frame) {
    transition:
      transform 1.4s cubic-bezier(0.2, 0.7, 0.2, 1),
      opacity 1s;

    @starting-style {
      opacity: 0;
      transform: rotate(-200deg) scale(0.8);
    }
  }

  :deep(.preview-img) {
    transition:
      transform 1.4s cubic-bezier(0.2, 0.7, 0.2, 1) 0.2s,
      opacity 1.2s 0.2s;

    @starting-style {
      opacity: 0;
      transform: scale(1.5);
    }
  }
}
</style>
