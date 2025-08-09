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
          @update:items-per-page="tableLoadItems"
          @update:sort-by="tableLoadItems"
          @update:page="tableLoadItems"
          hover
        )
          template(#top)
            VTextField(
              label="搜尋"
              append-icon="mdi-magnify"
              v-model="tableSearch"
              @click:append="tableApplySearch"
              @keydown.enter="tableApplySearch"
            )

            VAlert(
              v-if="cleanupInfo"
              type="warning"
              class="mt-2"
              dismissible
              @click:close="cleanupInfo = null"
            )
              | {{ cleanupInfo }}

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
              )
          template(v-slot:[`item.starRating`]="{ item }")
            VRating(
              :value="getUserRating(item)"
              readonly
              color="#4d4637 darken-3"
              size="20"
            )
</template>

<script setup>
import { ref } from 'vue'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import { useUserStore } from '@/store/user'

const { apiAuth } = useApi()
const user = useUserStore()
const createSnackbar = useSnackbar()
const tableItemsPerPage = ref(10)
const tableSortBy = ref([
  { key: 'createdAt', order: 'desc' }
])
const tablePage = ref(1)
const tableBooks = ref([])
const cleanupInfo = ref(null)
const MAX_CHARS = 55

const bookCache = new Map()
const isCleaningUp = ref(false)

const getImageSrc = (item) => {
  return item?.result?.image || item?.image || ''
}

const getUserRating = (item) => {
  const reviews = item?.result?.reviews || item?.reviews || []
  const userReview = reviews.find(review =>
    review.user.$oid === user.value || review.user === user.value
  )
  return userReview?.rating || 0
}

const tableHeaders = [
  { title: '圖片', align: 'center', sortable: false, key: 'image' },
  { title: '書名', align: 'center', sortable: true, key: 'result.title' },
  { title: '作者', align: 'center', sortable: true, key: 'result.authors' },
  { title: '出版者', align: 'center', sortable: true, key: 'result.publisher' },
  { title: '分類', align: 'center', sortable: true, key: 'result.categories' },
  {
    title: '評分(1-5)',
    align: 'center',
    sortable: true,
    key: 'result.rating'
  },
  {
    title: '書評',
    align: 'center',
    sortable: false,
    key: 'result.review',
    value: book => {
      const reviews = book?.result?.reviews || book?.reviews || []
      const userReview = reviews.find(review =>
        review.user.$oid === user.value || review.user === user.value
      )
      if (userReview) {
        const review = userReview.comment
        const paragraphs = []
        for (let i = 0; i < review.length; i += MAX_CHARS) {
          paragraphs.push(review.substring(i, i + MAX_CHARS))
        }
        return paragraphs.join('\n')
      } else {
        return '未提供書評'
      }
    }
  }
]

const tableLoading = ref(true)
const tableItemsLength = ref(0)
const tableSearch = ref('')

const fetchBookDetails = async (bookId) => {
  // 檢查快取
  if (bookCache.has(bookId)) {
    return bookCache.get(bookId)
  }

  try {
    const response = await apiAuth.get(`/books/${bookId}`)
    const bookData = response.data

    bookCache.set(bookId, bookData)
    return bookData
  } catch (error) {
    if (error.response?.status === 404) {
      bookCache.set(bookId, null)
      return null
    }
    throw error
  }
}

const fetchBooksInBatches = async (bookIds, batchSize = 3) => {
  const results = []
  const invalidIds = []

  for (let i = 0; i < bookIds.length; i += batchSize) {
    const batch = bookIds.slice(i, i + batchSize)

    const batchPromises = batch.map(async (bookId) => {
      try {
        const book = await fetchBookDetails(bookId)
        return { bookId, book, valid: book !== null }
      } catch (error) {
        console.warn(`獲取書籍 ${bookId} 失敗:`, error)
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

    if (i + batchSize < bookIds.length) {
      await new Promise(resolve => setTimeout(resolve, 100))
    }
  }

  return { validBooks: results, invalidIds }
}

const cleanupInvalidFavorites = async (invalidBookIds) => {
  if (!invalidBookIds || invalidBookIds.length === 0 || isCleaningUp.value) return

  isCleaningUp.value = true

  try {
    const cleanupPromises = invalidBookIds.map(async (bookId) => {
      try {
        await apiAuth.delete(`/users/favorite/${bookId}`)
        return { bookId, success: true }
      } catch (error) {
        if (error.response?.status === 404) {
          return { bookId, success: true, alreadyRemoved: true }
        }
        return { bookId, success: false, error }
      }
    })

    await Promise.all(cleanupPromises)
  } catch (error) {
  } finally {
    isCleaningUp.value = false
  }
}
const tableLoadItems = async () => {
  tableLoading.value = true
  cleanupInfo.value = null

  try {
    console.log('開始載入使用者喜愛書籍...')

    const { data: favoriteData } = await apiAuth.get('/users/favorite')
    console.log('獲取 favorite IDs:', favoriteData)

    const favoriteBookIds = favoriteData.result || favoriteData

    if (!favoriteBookIds || favoriteBookIds.length === 0) {
      tableBooks.value = []
      tableItemsLength.value = 0
      return
    }

    console.log(`找到 ${favoriteBookIds.length} 本喜愛書籍`)

    const { validBooks, invalidIds } = await fetchBooksInBatches(favoriteBookIds)

    console.log(`有效書籍: ${validBooks.length}, 無效書籍: ${invalidIds.length}`)

    if (invalidIds.length > 0) {
      setTimeout(() => cleanupInvalidFavorites(invalidIds), 0)
    }

    let filteredBooks = validBooks
    if (tableSearch.value) {
      const searchTerm = tableSearch.value.toLowerCase()
      filteredBooks = validBooks.filter(book => {
        const title = book?.result?.title || book?.title || ''
        const authors = book?.result?.authors || book?.authors || ''
        return title.toLowerCase().includes(searchTerm) ||
               authors.toLowerCase().includes(searchTerm)
      })
    }

    const start = (tablePage.value - 1) * tableItemsPerPage.value
    const end = start + tableItemsPerPage.value
    tableBooks.value = filteredBooks.slice(start, end)
    tableItemsLength.value = filteredBooks.length

    console.log(`最終顯示書籍數量: ${tableBooks.value.length}`)
  } catch (error) {
    console.error('載入失敗:', error)
    const text = error?.response?.data?.message || '載入喜愛書籍失敗'
    createSnackbar({
      text,
      showCloseButton: false,
      snackbarProps: {
        timeout: 3000,
        color: 'red',
        location: 'bottom'
      }
    })

    tableBooks.value = []
    tableItemsLength.value = 0
  } finally {
    tableLoading.value = false
  }
}

const tableApplySearch = () => {
  tablePage.value = 1
  tableLoadItems()
}

tableLoadItems()
</script>
