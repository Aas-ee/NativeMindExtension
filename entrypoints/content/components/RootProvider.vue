<template>
  <slot />
</template>

<script setup lang="ts">
import { useInjectContext } from '@/composables/useInjectContext'

const props = defineProps<{
  rootElement: HTMLDivElement
}>()

useInjectContext('selectorScrollListenElement').provide([props.rootElement])
useInjectContext('rootElement').provide(props.rootElement)
</script>
