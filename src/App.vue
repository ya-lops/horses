<script setup>
import { ref } from "vue";
import { periods } from "./data";
import { useMediaQuery } from "./composables";
import HorsesTrack from "./components/HorsesTrack.vue";
import TimelineCard from "./components/TimelineCard.vue";
import MobileSlider from "./components/MobileSlider.vue";
import Lightbox from "./components/Lightbox.vue";

const isMobile = useMediaQuery("(max-width: 767px)");
const lightboxRef = ref(null);
const openLightbox = (period) => lightboxRef.value.open(period);
</script>

<template>
  <main class="min-h-screen overflow-x-clip pb-24 md:pb-40">
    <div class="pt-[74px] max-md:pt-6"><HorsesTrack /></div>

    <h1
      class="mx-auto mt-24 max-w-[1250px] px-6 text-[clamp(30px,6.2vw,80px)] font-extrabold uppercase leading-[1.1] text-white max-md:mt-10 max-md:text-[26px] max-md:text-center"
    >
      История Московского<br />ипподрома
    </h1>

    <MobileSlider
      v-if="isMobile"
      class="mt-8"
      :periods="periods"
      @open="openLightbox"
    />

    <div
      v-else
      class="mx-auto mt-[100px] flex max-w-[900px] flex-col gap-[60px] px-6"
    >
      <TimelineCard
        v-for="period in periods"
        :key="period.id"
        :period="period"
        @open="openLightbox"
      />
    </div>

    <Lightbox ref="lightboxRef" />
  </main>
</template>

<style>
@import "tailwindcss";

@theme {
  --font-sans: "Montserrat Variable", "Montserrat", system-ui, sans-serif;
  --color-sand: #dcb974;
  --color-rust: #a23a1f;
  --color-brown: #5a2a12;
  --color-cream: #f4e6d6;
}

body {
  background: var(--color-sand);
  color: var(--color-brown);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;

  &:has(dialog[open]) {
    overflow: hidden;
  }
}
</style>
