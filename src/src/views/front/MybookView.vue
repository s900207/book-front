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
        template(#[`item.image`]="{ item }")
          VImg(:src="item.result.image")
        template(v-slot:[`item.starRating`]="{ item }")
          VRating(
            :value="item.result.reviews.find(review => review.user.$oid === user.value)?.rating || 0"
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
console.log(tableBooks.value)
const MAX_CHARS = 55

const tableHeaders = [
  { title: '圖片', align: 'center', sortable: false, key: 'image', value: book => book.result.image },
  { title: '書名', align: 'center', sortable: true, key: 'result.title' },
  { title: '作者', align: 'center', sortable: true, key: 'result.authors' },
  { title: '出版者', align: 'center', sortable: true, key: 'result.publisher' },
  { title: '分類', align: 'center', sortable: true, key: 'result.categories' },
  {
    title: '評分(1-5)',
    align: 'center',
    sortable: true,
    key: 'result.rating',
    value: book => {
      const userReview = book.result.reviews.find(review => review.user.$oid === user.value)
      return userReview ? userReview.rating : '未提供評分'
    },
    cellTemplate: (value) => {
      return `<v-rating :value="${value}" readonly color="#4d4637 darken-3" size="20"></v-rating>`
    }
  },
  {
    title: '書評',
    align: 'center',
    sortable: false,
    key: 'result.review',
    value: book => {
      const userReview = book.result.reviews.find(review => review.user.$oid === user.value)
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

const tableLoadItems = async () => {
  tableLoading.value = true
  try {
    // 從 /users/favorite API 端點獲取喜愛的書籍 ID
    const { data: userData } = await apiAuth.get('/users/favorite')
    console.log(userData)
    const favoriteBookIds = userData.result

    // 從 /books API 端點獲取書籍資訊
    const bookPromises = favoriteBookIds.map(bookId =>
      apiAuth.get(`/books/${bookId}`, {
        params: {
          page: tablePage.value,
          itemsPerPage: tableItemsPerPage.value,
          sortBy: tableSortBy.value[0]?.key || 'createdAt',
          sortOrder: tableSortBy.value[0]?.order === 'asc' ? 1 : -1,
          search: tableSearch.value
        }
      })
    )
    const bookResponses = await Promise.all(bookPromises)
    const books = bookResponses.map(response => response.data)

    tableBooks.value.splice(0, tableBooks.value.length, ...books)
    tableItemsLength.value = userData.result.length
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
  tableLoading.value = false
}
tableLoadItems()

const tableApplySearch = () => {
  tablePage.value = 1
  tableLoadItems()
}
</script>
