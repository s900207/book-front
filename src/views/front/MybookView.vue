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

            // 清理提示
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

// 輔助函數
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

// 導航到書本詳細頁面的函數已移除，改用 RouterLink

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

// 清理無效的 favorite 記錄
const cleanupInvalidFavorites = async (invalidBookIds) => {
  if (!invalidBookIds || invalidBookIds.length === 0) return

  try {
    console.log('準備清理無效的 favorite 記錄:', invalidBookIds)

    // 批量刪除無效的 favorite 記錄
    const cleanupPromises = invalidBookIds.map(bookId =>
      apiAuth.delete(`/users/favorite/${bookId}`).catch(error => {
        console.warn(`清理 favorite ${bookId} 失敗:`, error)
        return null
      })
    )

    await Promise.all(cleanupPromises)
  } catch (error) {
    console.error('清理 favorite 記錄時發生錯誤:', error)
  }
}

const tableLoadItems = async () => {
  tableLoading.value = true
  cleanupInfo.value = null

  try {
    console.log('開始載入使用者喜愛書籍...')

    // 獲取 favorite IDs
    const { data: favoriteData } = await apiAuth.get('/users/favorite')
    console.log('獲取 favorite IDs:', favoriteData)

    const favoriteBookIds = favoriteData.result || favoriteData

    if (!favoriteBookIds || favoriteBookIds.length === 0) {
      tableBooks.value = []
      tableItemsLength.value = 0
      return
    }

    console.log(`找到 ${favoriteBookIds.length} 本喜愛書籍`)

    // 獲取書籍詳情並記錄無效的 ID
    const validBooks = []
    const invalidBookIds = []

    for (const bookId of favoriteBookIds) {
      console.log(`嘗試獲取書籍 ID: ${bookId}`)

      // 嘗試多種可能的 API 端點
      const possibleEndpoints = [
          `/books/${bookId}`,
          `/book/${bookId}`,
          `/books/detail/${bookId}`,
          `/api/books/${bookId}`
      ]

      let bookData = null
      let bookFound = false

      for (const endpoint of possibleEndpoints) {
        try {
          const response = await apiAuth.get(endpoint)
          console.log(`成功使用端點 ${endpoint}:`, response.data)
          bookData = response.data
          bookFound = true
          break
        } catch (endpointError) {
          // 如果是 404，表示書籍不存在
          if (endpointError.response?.status === 404) {
            console.log(`書籍 ${bookId} 不存在 (404)`)
            continue
          }
          console.log(`端點 ${endpoint} 失敗:`, endpointError.response?.status)
        }
      }

      if (bookFound && bookData) {
        validBooks.push(bookData)
      } else {
        console.warn(`書籍 ${bookId} 不存在，加入清理列表`)
        invalidBookIds.push(bookId)
      }
    }

    console.log(`有效書籍: ${validBooks.length}, 無效書籍: ${invalidBookIds.length}`)

    // 清理無效的 favorite 記錄
    if (invalidBookIds.length > 0) {
      await cleanupInvalidFavorites(invalidBookIds)
    }

    // 應用搜尋過濾
    let filteredBooks = validBooks
    if (tableSearch.value) {
      filteredBooks = validBooks.filter(book => {
        const title = book?.result?.title || book?.title || ''
        const authors = book?.result?.authors || book?.authors || ''
        const searchTerm = tableSearch.value.toLowerCase()
        return title.toLowerCase().includes(searchTerm) ||
                 authors.toLowerCase().includes(searchTerm)
      })
    }

    // 應用分頁
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
  }

  tableLoading.value = false
}

// 初始載入
tableLoadItems()

const tableApplySearch = () => {
  tablePage.value = 1
  tableLoadItems()
}
</script>
