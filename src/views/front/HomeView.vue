<template lang="pug">
  VOverlay(v-model="shouldShowLoading" class="loading-overlay" persistent)
    .loading-container
      .loading-content
        .loading-text {{ loadingProgress }}% Loading...

  VContainer
    VRow
      VCol(cols="10" md="11")
        VTextField(
            class="mx-auto mt-5"
            menu-icon=""
            placeholder="請輸入書籍名稱"
            :prepend-inner-icon="mdiMagnify"
            v-model="searchTerm"
            :disabled="shouldShowLoading"
          )
      VCol(cols="2" md="1" class="d-flex mt-2 justify-end")
        .adult-switch-container.mt-5.d-flex.align-center
          VSwitch(
            v-model="showAll"
            class="adult-switch"
            :color="showAll ? 'red' : 'green'"
            hide-details
            density="compact"
            :disabled="shouldShowLoading"
          )
          .switch-indicators.ml-2
            VIcon(v-if="!showAll" color="green" size="small" :icon="mdiShieldCheck")
            .adult-badge(v-if="showAll")
              span.adult-text 18+
    VRow
      VCol.d-flex.justify-center(cols="12" md="4" xl="2" v-for="(book, index) in books" :key="book._id")
        .book-wrapper(:class="{ 'animate-in': booksLoaded }" :style="{ animationDelay: `${index * 0.1}s` }")
          BooksCard(v-bind="book")
</template>

<style scoped>
.loading-overlay {
  z-index: 9999 !important;
  background: rgba(255, 255, 255, 0.95) !important;
  backdrop-filter: blur(8px);
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #4d4637;
}

.loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.loading-text {
  font-size: 2rem;
  font-weight: 600;
  color: #f6eee0;
}

.adult-switch-container {
  position: relative;
  display: flex;
  align-items: center;
  height: 40px;
}

.adult-switch {
  margin: 0;
  flex-shrink: 0;
}

.adult-switch :deep(.v-switch__track) {
  transition: all 0.3s ease;
}

.adult-switch :deep(.v-switch__thumb) {
  transition: all 0.3s ease;
}

.adult-switch:not(.v-switch--inset) :deep(.v-switch__track) {
  background-color: rgba(76, 175, 80, 0.3) !important;
}

.adult-switch.v-input--is-dirty:deep(.v-switch__track) {
  background-color: rgba(244, 67, 54, 0.3) !important;
}

.switch-indicators {
  display: flex;
  align-items: center;
  min-width: 45px;
  justify-content: center;
}

.adult-badge {
  display: flex;
  align-items: center;
  gap: 2px;
  background: linear-gradient(45deg, #f44336, #d32f2f);
  color: white;
  padding: 2px 6px;
  border-radius: 12px;
  font-size: 10px;
  font-weight: bold;
  border: 1px solid #b71c1c;
  box-shadow: 0 2px 4px rgba(244, 67, 54, 0.3);
  animation: pulse-red 2s infinite;
}

.adult-text {
  font-size: 9px;
  letter-spacing: 0.5px;
}

.adult-switch-container::after {
  content: attr(data-tooltip);
  position: absolute;
  bottom: -25px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 10px;
  color: #666;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.adult-switch-container:hover::after {
  opacity: 1;
}

.adult-switch-container[data-tooltip="顯示成人內容"]::after {
  color: #f44336;
}

.adult-switch-container[data-tooltip="隱藏成人內容"]::after {
  color: #4CAF50;
}

.book-wrapper {
  opacity: 0;
  transform: translateY(20px);
  transition: all 2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.book-wrapper.animate-in {
  opacity: 1;
  transform: translateY(0);
}
</style>

<script setup>
import { ref, onMounted, nextTick, watch } from 'vue'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import BooksCard from '@/components/BooksCard.vue'

import {
  mdiShieldCheck,
  mdiMagnify
} from '@mdi/js'

const { api } = useApi()
const createSnackbar = useSnackbar()

if (!window.hasShownInitialLoading) {
  window.hasShownInitialLoading = false
}

const books = ref([])
const searchTerm = ref('')
const showAll = ref(false)
const booksLoaded = ref(false)
const shouldShowLoading = ref(!window.hasShownInitialLoading)
const loadingProgress = ref(0)
let progressTimer = null

// 模擬載入進度
const simulateLoading = () => {
  loadingProgress.value = 0
  const increment = 1
  const speed = 30

  progressTimer = setInterval(() => {
    if (loadingProgress.value < 100) {
      loadingProgress.value += increment
    } else {
      clearInterval(progressTimer)
      setTimeout(() => {
        window.hasShownInitialLoading = true
        shouldShowLoading.value = false
        fetchBooks()
      }, 500)
    }
  }, speed)
}

const fetchBooks = async () => {
  try {
    const { data } = await api.get('/books', {
      params: {
        search: searchTerm.value
      }
    })

    const filteredBooks = data.result.data.reduce((acc, book) => {
      if (showAll.value || book.maturityRating === 'NOT_MATURE') {
        acc.push(book)
      }
      return acc
    }, [])

    books.value = filteredBooks

    await nextTick()

    setTimeout(() => {
      booksLoaded.value = true
    }, 100)
  } catch (error) {
    console.log(error)
    const text = error?.response?.data?.message || '發生錯誤，請稍後再試'

    createSnackbar({
      text,
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'red',
        location: 'bottom'
      }
    })
  }
}

onMounted(() => {
  if (!window.hasShownInitialLoading) {
    simulateLoading()
  } else {
    fetchBooks()
  }
})

watch([searchTerm, showAll], () => {
  if (!shouldShowLoading.value) {
    booksLoaded.value = false
    fetchBooks()
  }
})
</script>
