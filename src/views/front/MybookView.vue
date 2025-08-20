<template lang="pug">
  VContainer
    VRow
      VCol(cols="12")
        VDataTable(
          v-model:items-per-page="tableItemsPerPage"
          v-model:sort-by="tableSortBy"
          v-model:page="tablePage"
          :items="tableBooks"
          :headers="tableHeaders"
          :loading="tableLoading"
          :items-length="tableItemsLength"
          :search="tableSearch"
          @update:items-per-page="handleItemsPerPageChange"
          @update:sort-by="handleSortChange"
          @update:page="handlePageChange"
          hover
        )
          template(#top)
            VTextField(
              label="搜尋"
              :append-icon="mdiMagnify"
              v-model="tableSearch"
              @click:append="tableApplySearch"
              @keydown.enter="tableApplySearch"
              class="mr-3"
            )

            VAlert(
              v-if="errorMessage"
              type="error"
              class="mt-2"
              dismissible
              @click:close="errorMessage = null"
            )
              | {{ errorMessage }}

          template(#[`item.image`]="{ item }")
            RouterLink.text-primary.text-decoration-none(
              :to="'/books/' + (item?.result?._id || item?._id || item?.result?.id || item?.id)"
              :title="item?.result?.title || item?.title || ''"
            )
              VImg(
                :src="getImageSrc(item)"
                width="80"
                height="80"
                cover
                :alt="item?.result?.title || item?.title || '書籍圖片'"
              )
                template(v-slot:placeholder)
                  VSkeletonLoader(type="image")

          template(v-slot:[`item.starRating`]="{ item }")
            VRating(
              :model-value="getUserRating(item)"
              readonly
              color="#4d4637 darken-3"
              size="20"
            )

          template(v-slot:[`item.userReview`]="{ item }")
            .text-left.pa-2(style="max-width: 300px;")
              p.text-body-2.mb-0 {{ getUserReview(item) }}
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useApi } from '@/composables/axios'
import { useUserStore } from '@/store/user'

import {
  mdiMagnify
} from '@mdi/js'

const { apiAuth } = useApi()
const user = useUserStore()

// 響應式數據
const tableItemsPerPage = ref(10)
const tableSortBy = ref([
  { key: 'createdAt', order: 'desc' }
])
const tablePage = ref(1)
const tableBooks = ref([])
const allValidBooks = ref([]) // 存儲所有有效的書籍
const errorMessage = ref(null)
const tableLoading = ref(false)
const tableSearch = ref('')

// 常量
const MAX_CHARS = 100
const BATCH_SIZE = 3
const RETRY_DELAY = 100

// 緩存
const bookCache = new Map()
const isCleaningUp = ref(false)

// 計算屬性
const tableItemsLength = computed(() => {
  if (!tableSearch.value) {
    return allValidBooks.value.length
  }
  return getFilteredBooks().length
})

// 輔助函數
const getImageSrc = (item) => {
  return item?.result?.image || item?.image || '/placeholder-book.jpg'
}

const getCurrentUserId = () => {
  try {
    if (!user.token) return null

    const tokenParts = user.token.split('.')
    if (tokenParts.length !== 3) return null

    const payload = JSON.parse(atob(tokenParts[1]))
    return payload._id || payload.id || payload.userId
  } catch (error) {
    return null
  }
}

const getUserRating = (item) => {
  const reviews = item?.result?.reviews || item?.reviews || []
  const currentUserId = getCurrentUserId()

  if (!currentUserId || !reviews.length) return 0

  const userReview = reviews.find(review => {
    const reviewUserId = review.user?.$oid || review.user?._id || review.user?.id || review.user
    return String(reviewUserId) === String(currentUserId)
  })

  return userReview?.rating || 0
}

const getUserReview = (item) => {
  const reviews = item?.result?.reviews || item?.reviews || []
  const currentUserId = getCurrentUserId()

  if (!currentUserId || !reviews.length) return '尚未撰寫書評'

  const userReview = reviews.find(review => {
    const reviewUserId = review.user?.$oid || review.user?._id || review.user?.id || review.user
    return String(reviewUserId) === String(currentUserId)
  })

  if (userReview?.comment) {
    const comment = userReview.comment.toString()
    if (comment.length > MAX_CHARS) {
      return comment.substring(0, MAX_CHARS) + '...'
    }
    return comment
  }
  return '尚未撰寫書評'
}
// 表格標題
const tableHeaders = [
  { title: '圖片', align: 'center', sortable: false, key: 'image' },
  { title: '書名', align: 'center', sortable: true, key: 'result.title' },
  { title: '作者', align: 'center', sortable: true, key: 'result.authors' },
  { title: '出版者', align: 'center', sortable: true, key: 'result.publisher' },
  { title: '分類', align: 'center', sortable: true, key: 'result.categories' },
  {
    title: '我的評分',
    align: 'center',
    sortable: false,
    key: 'starRating'
  },
  {
    title: '我的書評',
    align: 'center',
    sortable: false,
    key: 'userReview'
  }
]

// API 函數
const fetchBookDetails = async (bookId, retries = 2) => {
  // 檢查緩存
  if (bookCache.has(bookId)) {
    return bookCache.get(bookId)
  }

  let lastError = null

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await apiAuth.get(`/books/${bookId}`)
      const bookData = response.data

      // 緩存結果
      bookCache.set(bookId, bookData)
      return bookData
    } catch (error) {
      lastError = error

      if (error.response?.status === 404) {
        // 404 錯誤不需要重試
        bookCache.set(bookId, null)
        return null
      }

      // 其他錯誤才重試
      if (attempt < retries) {
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * (attempt + 1)))
      }
    }
  }

  console.warn(`獲取書籍 ${bookId} 失敗 (已重試 ${retries} 次):`, lastError)
  bookCache.set(bookId, null)
  return null
}

const fetchBooksInBatches = async (bookIds) => {
  const results = []
  const invalidIds = []

  try {
    for (let i = 0; i < bookIds.length; i += BATCH_SIZE) {
      const batch = bookIds.slice(i, i + BATCH_SIZE)

      const batchPromises = batch.map(async (bookId) => {
        try {
          const book = await fetchBookDetails(bookId)
          return { bookId, book, valid: book !== null }
        } catch (error) {
          console.warn(`批次處理書籍 ${bookId} 失敗:`, error)
          return { bookId, book: null, valid: false }
        }
      })

      const batchResults = await Promise.all(batchPromises)

      for (const result of batchResults) {
        if (result.valid && result.book) {
          results.push(result.book)
        } else {
          invalidIds.push(result.bookId)
        }
      }

      // 批次間延遲，避免過度請求
      if (i + BATCH_SIZE < bookIds.length) {
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY))
      }
    }
  } catch (error) {
    console.error('批次獲取書籍時發生錯誤:', error)
    errorMessage.value = '載入書籍時發生錯誤，請稍後重試'
  }

  return { validBooks: results, invalidIds }
}

const cleanupInvalidFavorites = async (invalidBookIds) => {
  if (!invalidBookIds?.length || isCleaningUp.value) return

  isCleaningUp.value = true

  try {
    const cleanupPromises = invalidBookIds.map(async (bookId) => {
      try {
        await apiAuth.delete(`/users/favorite/${bookId}`)
        return { bookId, success: true }
      } catch (error) {
        if (error.response?.status === 404) {
          // 404 表示已經不存在，視為成功
          return { bookId, success: true, alreadyRemoved: true }
        }
        console.warn(`清理收藏 ${bookId} 失敗:`, error)
        return { bookId, success: false, error }
      }
    })

    await Promise.all(cleanupPromises)
  } catch (error) {
    console.error('清理無效收藏時發生錯誤:', error)
  } finally {
    isCleaningUp.value = false
  }
}

const getFilteredBooks = () => {
  if (!tableSearch.value) {
    return allValidBooks.value
  }

  const searchTerm = tableSearch.value.toLowerCase()
  return allValidBooks.value.filter(book => {
    const title = book?.result?.title || book?.title || ''
    const authors = book?.result?.authors || book?.authors || ''
    const publisher = book?.result?.publisher || book?.publisher || ''
    const categories = book?.result?.categories || book?.categories || ''

    return title.toLowerCase().includes(searchTerm) ||
           authors.toLowerCase().includes(searchTerm) ||
           publisher.toLowerCase().includes(searchTerm) ||
           categories.toLowerCase().includes(searchTerm)
  })
}

const updateDisplayedBooks = () => {
  const filteredBooks = getFilteredBooks()
  const start = (tablePage.value - 1) * tableItemsPerPage.value
  const end = start + tableItemsPerPage.value
  tableBooks.value = filteredBooks.slice(start, end)
}

const tableLoadItems = async () => {
  if (tableLoading.value) return

  tableLoading.value = true
  errorMessage.value = null

  try {
    // 獲取收藏列表
    const { data: favoriteData } = await apiAuth.get('/users/favorite')
    const favoriteBookIds = favoriteData?.result || favoriteData || []

    if (!favoriteBookIds.length) {
      allValidBooks.value = []
      tableBooks.value = []
      return
    }

    // 批量獲取書籍詳情
    const { validBooks, invalidIds } = await fetchBooksInBatches(favoriteBookIds)

    // 更新數據
    allValidBooks.value = validBooks
    updateDisplayedBooks()

    // 異步清理無效項目（靜默執行）
    if (invalidIds.length > 0) {
      setTimeout(() => cleanupInvalidFavorites(invalidIds), 0)
    }
  } catch (error) {
    console.error('載入收藏失敗:', error)
    errorMessage.value = error?.response?.data?.message || '載入喜愛書籍失敗'

    allValidBooks.value = []
    tableBooks.value = []
  } finally {
    tableLoading.value = false
  }
}

const tableApplySearch = () => {
  tablePage.value = 1
  updateDisplayedBooks()
}

// 處理分頁和排序變化的函數
const handlePageChange = () => {
  updateDisplayedBooks()
}

const handleItemsPerPageChange = () => {
  tablePage.value = 1 // 重置到第一頁
  updateDisplayedBooks()
}

const handleSortChange = () => {
  tablePage.value = 1 // 重置到第一頁
  updateDisplayedBooks()
}

// 生命周期
onMounted(() => {
  tableLoadItems()
})

// 導出給模板使用
defineExpose({
  tableLoadItems,
  tableApplySearch
})
</script>

<style scoped>
.v-data-table {
  background: white;
}

.v-skeleton-loader {
  background: #f5f5f5;
}

.text-body-2 {
  word-break: break-word;
}
</style>
