<template lang="pug">
VContainer
  VRow
    VCol(cols="12")
      VDataTableServer(
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
          VImg(:src="item.image")
        template(#[`item.edit`]="{ item }")
          VBtn(@click="openDialog(item)") 編輯
        template(#[`item.delete`]="{ item }")
          VBtn(@click="deleteBook(item)") 刪除

      VDialog(v-model="dialog" persistent max-width="600px")
        VCard
          VCardTitle 編輯書籍
          VCardText
            VForm(ref="editForm")
              VTextField(v-model="editedBook.title" label="書名" required)
              VTextField(v-model="editedBook.authors" label="作者" required)
              VTextField(v-model="editedBook.publisher" label="出版者" required)
              VTextField(v-model="editedBook.retailPrice" label="價格" required type="number")
              VTextField(v-model="editedBook.categories" label="分類" required)
              VTextarea(v-model="editedBook.description" label="簡介" rows="5")
          VCardActions
            VSpacer
            VBtn(color="blue darken-1" text @click="closeDialog") 取消
            VBtn(color="blue darken-1" text @click="saveEdit") 保存
</template>

<script setup>
import { ref } from 'vue'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'

const { apiAuth } = useApi()
const createSnackbar = useSnackbar()

const tableItemsPerPage = ref(10)
const tableSortBy = ref([
  { key: 'createdAt', order: 'desc' }
])
const tablePage = ref(1)
const tableBooks = ref([])

const tableHeaders = [
  { title: '圖片', align: 'center', sortable: false, key: 'image' },
  { title: '書名', align: 'center', sortable: true, key: 'title' },
  { title: '作者', align: 'center', sortable: true, key: 'authors' },
  { title: '出版者', align: 'center', sortable: true, key: 'publisher' },
  { title: '價格', align: 'center', sortable: true, key: 'retailPrice' },
  { title: '分類', align: 'center', sortable: true, key: 'categories' },
  { title: '編輯', align: 'center', sortable: false, key: 'edit' },
  { title: '刪除', align: 'center', sortable: false, key: 'delete' }
]

const tableLoading = ref(true)

const tableItemsLength = ref(0)

const tableSearch = ref('')

const dialog = ref(false)
const editedBook = ref({
  _id: '',
  title: '',
  authors: '',
  publisher: '',
  retailPrice: '',
  categories: '',
  description: ''
})

const tableLoadItems = async () => {
  tableLoading.value = true
  try {
    const { data } = await apiAuth.get('/books/all', {
      params: {
        page: tablePage.value,
        itemsPerPage: tableItemsPerPage.value,
        sortBy: tableSortBy.value[0]?.key || 'createdAt',
        sortOrder: tableSortBy.value[0]?.order === 'asc' ? 1 : -1,
        search: tableSearch.value
      }
    })
    tableBooks.value.splice(0, tableBooks.value.length, ...data.result.data)
    tableItemsLength.value = data.result.total
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

const deleteBook = async (item) => {
  console.log(item)
  if (!item._id) {
    console.error('沒有書籍 ID')
    return
  }
  try {
    await apiAuth.delete(`/books/${item._id}`)
    createSnackbar({
      text: '書籍已成功刪除',
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'green',
        location: 'bottom'
      }
    })
    tableLoadItems()
  } catch (error) {
    console.log(error)
    const text = error?.response?.data?.message || '刪除書籍時發生錯誤，請稍後再試'
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
const tableApplySearch = () => {
  tablePage.value = 1
  tableLoadItems()
}

const openDialog = (item) => {
  editedBook.value = { ...item }
  dialog.value = true
}

const closeDialog = () => {
  dialog.value = false
}

const saveEdit = async () => {
  try {
    await apiAuth.patch(`/books/${editedBook.value._id}`, editedBook.value)
    createSnackbar({
      text: '書籍已成功更新',
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'green',
        location: 'bottom'
      }
    })
    tableLoadItems()
    closeDialog()
  } catch (error) {
    console.log(error)
    const text = error?.response?.data?.message || '更新書籍時發生錯誤，請稍後再試'
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
</script>
