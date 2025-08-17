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
              :append-icon="mdiMagnify"
              v-model="tableSearch"
              @click:append="tableApplySearch"
              @keydown.enter="tableApplySearch"
            )
          template(#[`item.image`]="{ item }")
            VImg(:src="item.image" width="80" height="80" cover)
          template(#[`item.edit`]="{ item }")
            VBtn(@click="openDialog(item)") 編輯
          template(#[`item.delete`]="{ item }")
            VBtn(@click="deleteBook(item)") 刪除

        VDialog(v-model="dialog" persistent max-width="700px")
          VCard
            VCardTitle 編輯書籍
            VCardText
              VForm(ref="editForm")
                VRow
                  VCol(cols="12" md="6")
                    VTextField(v-model="editedBook.title" label="書名" required)
                    VTextField(v-model="editedBook.authors" label="作者" required)
                    VTextField(v-model="editedBook.publisher" label="出版者" required)
                    VTextField(v-model="editedBook.retailPrice" label="價格" required type="number")
                    VTextField(v-model="editedBook.categories" label="分類" required)
                  VCol(cols="12" md="6")
                    VCard(outlined)
                      VCardTitle 書籍圖片
                      VCardText
                        // 當前圖片預覽 - 點擊可上傳
                        VCard(
                          v-if="getCurrentImageSrc()"
                          @click="triggerFileInput"
                          class="image-upload-area mb-3 d-flex align-center justify-center"
                          hover
                        )
                          VImg(
                            :src="getCurrentImageSrc()"
                            max-height="200"
                            max-width="100%"
                            contain
                            class="mx-auto"
                          )
                          VOverlay(
                            :model-value="false"
                            class="align-center justify-center hover-overlay"
                            style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); opacity: 0; transition: opacity 0.3s;"
                          )
                            VIcon(color="white" size="48" :icon="mdiCamera")
                            div(style="color: white; margin-top: 8px;") 點擊更換圖片

                        // 沒有圖片時的上傳區域
                        VCard(
                          v-else
                          @click="triggerFileInput"
                          class="image-upload-area mb-3 d-flex align-center justify-center"
                          hover
                        )
                          div(class="text-center")
                            VIcon(size="64" color="grey" :icon="mdiCameraPlus")
                            div(class="mt-2 text-grey") 點擊上傳圖片

                        // 隱藏的檔案輸入
                        input(
                          ref="fileInput"
                          type="file"
                          accept="image/*"
                          style="display: none;"
                          @change="handleFileSelect"
                        )

                        // 顯示已選擇的檔案名稱
                        VAlert(
                          v-if="selectedFile"
                          type="info"
                          variant="tonal"
                          class="mt-3"
                        )
                          VIcon(class="mr-2" :icon="mdiFileImage")
                          | 已選擇: {{ selectedFile.name }}

                VCol(cols="12")
                  VTextarea(v-model="editedBook.description" label="簡介" rows="5")
            VCardActions
              VSpacer
              VBtn(color="blue darken-1" variant="text" @click="closeDialog") 取消
              VBtn(
                color="blue darken-1"
                variant="text"
                @click="saveEdit"
                :loading="saveLoading"
              ) 保存
</template>

<script setup>
import { ref } from 'vue'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'

import {
  mdiMagnify,
  mdiCameraPlus,
  mdiCamera,
  mdiFileImage
} from '@mdi/js'

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

// 編輯對話框相關
const dialog = ref(false)
const editedBook = ref({
  _id: '',
  title: '',
  authors: '',
  publisher: '',
  retailPrice: '',
  categories: '',
  description: '',
  image: ''
})

const selectedFile = ref(null)
const previewImageUrl = ref('')
const saveLoading = ref(false)

const getCurrentImageSrc = () => {
  // 如果有選擇新的圖片，顯示預覽圖片
  if (previewImageUrl.value) {
    return previewImageUrl.value
  }
  // 否則顯示原始圖片
  return editedBook.value.image || ''
}

const triggerFileInput = () => {
  const fileInputElement = document.querySelector('input[type="file"]')
  if (fileInputElement) {
    fileInputElement.click()
  }
}

const handleFileSelect = (event) => {
  const file = event.target.files[0]
  if (file) {
    selectedFile.value = file

    // 創建預覽URL
    if (previewImageUrl.value) {
      URL.revokeObjectURL(previewImageUrl.value)
    }
    previewImageUrl.value = URL.createObjectURL(file)
  }
}

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
  editedBook.value = {
    ...item,
    image: item.image || ''
  }
  dialog.value = true
  selectedFile.value = null
  previewImageUrl.value = ''
}

const closeDialog = () => {
  dialog.value = false
  selectedFile.value = null

  // 清理預覽URL
  if (previewImageUrl.value) {
    URL.revokeObjectURL(previewImageUrl.value)
    previewImageUrl.value = ''
  }

  const fileInput = document.querySelector('input[type="file"]')
  if (fileInput) {
    fileInput.value = ''
  }
}

const saveEdit = async () => {
  saveLoading.value = true

  try {
    // 如果有選擇新圖片，使用 FormData
    if (selectedFile.value) {
      const formData = new FormData()
      formData.append('image', selectedFile.value)
      formData.append('title', editedBook.value.title)
      formData.append('authors', editedBook.value.authors)
      formData.append('publisher', editedBook.value.publisher)
      formData.append('retailPrice', editedBook.value.retailPrice)
      formData.append('categories', editedBook.value.categories)
      formData.append('description', editedBook.value.description)

      await apiAuth.patch(`/books/${editedBook.value._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    } else {
      // 沒有新圖片，只更新其他資料
      const bookData = {
        title: editedBook.value.title,
        authors: editedBook.value.authors,
        publisher: editedBook.value.publisher,
        retailPrice: parseFloat(editedBook.value.retailPrice) || 0,
        categories: editedBook.value.categories,
        description: editedBook.value.description
      }

      await apiAuth.patch(`/books/${editedBook.value._id}`, bookData)
    }

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
    console.error('更新書籍失敗:', error)
    let text = '更新書籍時發生錯誤，請稍後再試'

    if (error?.response?.status === 404) {
      text = '找不到書籍'
    } else if (error?.response?.status === 400) {
      text = error?.response?.data?.message || 'ID 格式錯誤'
    } else if (error?.response?.data?.message) {
      text = error.response.data.message
    }

    createSnackbar({
      text,
      showCloseButton: false,
      snackbarProps: {
        timeout: 3000,
        color: 'red',
        location: 'bottom'
      }
    })
  }

  saveLoading.value = false
}
</script>

<style scoped>
.image-upload-area:hover .hover-overlay {
  opacity: 1 !important;
}
</style>
