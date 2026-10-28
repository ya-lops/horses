import { ref, onMounted, onBeforeUnmount } from 'vue'

// проверка на мобилу
export function useMediaQuery(query) {
  const mediaQuery = window.matchMedia(query)
  const isMatch = ref(mediaQuery.matches)
  const onChange = (event) => (isMatch.value = event.matches)

  onMounted(() => mediaQuery.addEventListener('change', onChange))
  
  onBeforeUnmount(() => mediaQuery.removeEventListener('change', onChange))

  return isMatch
}

// проверка на фьюпорт
export function useInView(threshold = 0.35) {
  const targetRef = ref(null)
  const isVisible = ref(false)
  let observer

  onMounted(() => {
    observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      isVisible.value = true
      observer.disconnect()
    }, { threshold })
    observer.observe(targetRef.value)
  })

  onBeforeUnmount(() => observer?.disconnect())

  return { targetRef, isVisible }
}
