<template>
  <div>
    <svg :style="{ width, height }">
      <use :xlink:href="href" :fill="fill"></use>
    </svg>
  </div>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue'

const props = defineProps({
  href: {
    type: String,
    default: '#icon-account'
  },
  fill: {
    type: String,
    default: '#icon-phone'
  },
  width: {
    type: String,
    default: '20px'
  },
  height: {
    type: String,
    default: '20px'
  }
})

const { href, fill, width, height } = toRefs(props)
</script>

<style scoped>
/* 添加一些基本的樣式 */
div {
  display: inline-block;
}
svg {
  display: block;
  fill: currentColor;
}
</style>
