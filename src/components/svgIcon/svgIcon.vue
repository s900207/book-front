<template>
  <div class="">
    <svg :style="{width, height}">
      <use :xlink:href="href" :fill="fill">
      </use>
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
    default: '30px'
  },
  height: {
    type: String,
    default: '30px'
  }
})
const { href, fill, width, height } = toRefs(props)
</script>
<style>
</style>
