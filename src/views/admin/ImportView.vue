<template lang="pug">
  VContainer
    VRow
      VCol(cols="12")
          h1.text-center 引入書籍
    VSpacer
      VRow
        VCol
          VTextField(
            v-model="isbn"
            class="mx-auto mt-5"
            density="comfortable"
            menu-icon=""
            placeholder="請輸入書籍名稱或13碼的isbn進行搜尋"
            :prepend-inner-icon="mdiMagnify"
            rounded
            theme="light"
            variant="solo"
            :style="{ width: isMobile ? '100%' : '500px' }"
            @click:append="searchBook"
            @keydown.enter="searchBook"
          )
    VRow
      VCol.d-flex.justify-center(cols="12")
        VForm(:disabled="isSubmitting" @submit.prevent="submit")
          VCard
            VRow.flex.justify-center.align-center
                VCol
                  VCard(
                    outlined
                    class="d-flex justify-center align-center flex-column ml-4"
                    style="min-height: 500px;min-width:400px"
                  )
                    VImg(
                      v-if="displayImage"
                      :src="displayImage"
                      width="350px"
                      height="500px"
                      cover
                    )
                    VIcon(
                      v-else
                      size="100"
                      color="grey-lighten-2"
                      class="mb-3"
                      :icon=" mdiImageOutline"
                    )
                    VChip(
                      v-if="imageSource === 'upload'"
                      color="green"
                      size="small"
                      class="mb-3"
                    ) 上傳圖片
                    VBtn(
                      color="primary"
                      :prepend-icon="mdiUpload"
                      @click="$refs.fileInput.click()"
                      :disabled="isSubmitting"
                      class="mt-1"
                    ) 上傳自己的圖片
                    input(
                      ref="fileInput"
                      type="file"
                      accept="image/*"
                      style="display: none;"
                      @change="handleFileUpload"
                    )
                    VBtn(
                      v-if="displayImage"
                      color="error"
                      variant="text"
                      size="small"
                      class="mt-2"
                      @click="clearImage"
                    ) 清除圖片

                VCol(class="me-5 mt-5")
                  VCardTitle
                  VTextField(
                    label="書本名稱"
                    v-model="title.value.value"
                    :width="300"
                    :error-messages="title.errorMessage.value"
                  )
                  VTextField(
                    label="作者"
                    v-model="authors.value.value"
                    :error-messages="authors.errorMessage.value"
                  )
                  VTextField(
                    label="出版者"
                    v-model="publisher.value.value"
                    :error-messages="publisher.errorMessage.value"
                  )
                  VTextField(
                    label="價格"
                    v-model="retailPrice.value.value"
                    :error-messages="retailPrice.errorMessage.value"
                  )
                  VTextField(
                    label="分類"
                    v-model="categories.value.value"
                  )
                  VCard(
                   outlined
                   class="pa-1 mb-6"
                   style="background-color: rgba(0,0,0,0.04) "
                   )
                     VCheckbox(
                        label="成人內容 (18+)"
                        v-model="isMature"
                        hide-details
                        )
                  VTextarea(
                    label="簡介"
                    v-model="description.value.value"
                    :error-messages="description.errorMessage.value"
                  )
                  VCardActions
            VRow.text-center.mb-5(cols="12")
              VCol
                VSpacer
                VBtn(color="green" type="submit" :loading="isSubmitting") 送出
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import * as yup from 'yup'
import { useField, useForm } from 'vee-validate'
import axios from 'axios'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'

import {
  mdiUpload,
  mdiMagnify,
  mdiImageOutline

} from '@mdi/js'

const { apiAuth } = useApi()
const createSnackbar = useSnackbar()

const isMobile = ref(false)
const isSubmitting = ref(false)
const isbn = ref('')

const apiImageUrl = ref('')
const uploadedFile = ref(null)
const imageSource = ref('')
const isMature = ref(false)

const displayImage = computed(() => {
  if (imageSource.value === 'upload' && uploadedFile.value) {
    return URL.createObjectURL(uploadedFile.value)
  }
  if (imageSource.value === 'api' && apiImageUrl.value) {
    return apiImageUrl.value
  }
  return null
})

const schema = yup.object({
  title: yup
    .string()
    .required('缺少商品名稱'),
  publisher: yup
    .string()
    .required('缺少出版者'),
  retailPrice: yup
    .number()
    .typeError('書籍價格格式錯誤')
    .required('缺少書籍價格')
    .min(0, '書籍價格不能小於 0'),
  description: yup
    .string()
    .required('缺少簡介')
})

const { handleSubmit, resetForm } = useForm({
  validationSchema: schema,
  initialValues: {
    title: '',
    authors: '',
    publisher: '',
    retailPrice: '',
    categories: '',
    description: '',
    image: '',
    maturityRating: ''
  }
})

const title = useField('title')
const authors = useField('authors')
const publisher = useField('publisher')
const retailPrice = useField('retailPrice')
const categories = useField('categories')
const description = useField('description')
const image = useField('image')
const maturityRating = useField('maturityRating')

// 監聽 isMature 變化，同步更新 maturityRating 欄位
watch(isMature, (newValue) => {
  maturityRating.value.value = newValue ? 'MATURE' : 'NOT_MATURE'
})

// 處理檔案上傳
const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    // 驗證檔案類型
    if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
      createSnackbar({
        text: '只支援 JPG 和 PNG 格式',
        showCloseButton: false,
        snackbarProps: {
          timeout: 2000,
          color: 'red',
          location: 'bottom'
        }
      })
      // 清空 input
      event.target.value = ''
      return
    }

    // 驗證檔案大小 (1MB)
    if (file.size > 1024 * 1024) {
      createSnackbar({
        text: '檔案大小不能超過 1MB',
        showCloseButton: false,
        snackbarProps: {
          timeout: 2000,
          color: 'red',
          location: 'bottom'
        }
      })
      // 清空 input
      event.target.value = ''
      return
    }

    uploadedFile.value = file
    imageSource.value = 'upload'

    createSnackbar({
      text: '圖片選取成功',
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'green',
        location: 'bottom'
      }
    })
  }
}

// 清除圖片
const clearImage = () => {
  uploadedFile.value = null
  apiImageUrl.value = ''
  imageSource.value = ''
  image.value.value = ''

  // 清空檔案 input
  if (document.querySelector('input[type="file"]')) {
    document.querySelector('input[type="file"]').value = ''
  }
}

// 完整重置表單
const resetAllForm = () => {
  resetForm()
  clearImage()
  isbn.value = ''
  isMature.value = false
}

// 創建包含圖片的 FormData
const createFormDataWithImage = (values, imageFile = null) => {
  const formData = new FormData()

  // 添加所有文字欄位
  Object.keys(values).forEach(key => {
    if (values[key] !== null && values[key] !== undefined && values[key] !== '') {
      formData.append(key, values[key])
    }
  })

  // 添加圖片檔案
  if (imageFile) {
    formData.append('image', imageFile)
  }

  return formData
}

const submit = handleSubmit(async (values) => {
  isSubmitting.value = true

  try {
    let submitData
    const headers = {}

    if (imageSource.value === 'upload' && uploadedFile.value) {
      // 用戶上傳了自己的圖片，使用 FormData
      console.log('準備提交含用戶圖片的資料...')
      submitData = createFormDataWithImage(values, uploadedFile.value)
      headers['Content-Type'] = 'multipart/form-data'
    } else {
      // 使用 API 圖片或沒有圖片，使用 JSON
      console.log('準備提交 JSON 資料...')
      submitData = {
        ...values,
        image: imageSource.value === 'api' && apiImageUrl.value ? apiImageUrl.value : ''
      }
      headers['Content-Type'] = 'application/json'
    }

    console.log('準備提交數據:', submitData)

    const response = await apiAuth.post('/books', submitData, { headers })
    console.log('書籍創建成功:', response.data)

    createSnackbar({
      text: '新增成功',
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'green',
        location: 'bottom'
      }
    })

    // 重置整個表單
    resetAllForm()
  } catch (error) {
    console.error('提交失敗:', error)
    console.error('錯誤詳情:', error.response?.data)

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
  } finally {
    isSubmitting.value = false
  }
})

const searchBook = async () => {
  if (!isbn.value.trim()) {
    return
  }

  try {
    const isIsbn = /^\d{10}(\d{3})?$/.test(isbn.value)
    const encodedInput = encodeURIComponent(isbn.value.trim())

    const { data } = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${isIsbn ? 'isbn' : 'intitle'}:${encodedInput}`)
    console.log('Google Books API 回應:', data)

    if (data && data.items && data.items.length > 0) {
      const bookData = data.items[0].volumeInfo
      const saleData = data.items[0].saleInfo

      // 填入表單資料
      title.value.value = bookData.title || ''
      authors.value.value = bookData.authors ? bookData.authors.join(', ') : ''
      publisher.value.value = bookData.publisher || ''
      retailPrice.value.value = saleData.retailPrice ? saleData.retailPrice.amount : ''
      categories.value.value = bookData.categories ? bookData.categories.join(', ') : ''
      description.value.value = bookData.description || ''

      // 設定成人內容狀態
      const apiMaturityRating = bookData.maturityRating || ''
      isMature.value = apiMaturityRating === 'MATURE'

      // 處理圖片
      if (bookData.imageLinks && bookData.imageLinks.thumbnail) {
        apiImageUrl.value = bookData.imageLinks.thumbnail
          .replace('http://', 'https://')
          .replace('img=1&zoom=1', 'img=2')
          .replace('edge=curl', '')

        imageSource.value = 'api'
        image.value.value = apiImageUrl.value

        // 清除用戶上傳的圖片
        uploadedFile.value = null
        if (document.querySelector('input[type="file"]')) {
          document.querySelector('input[type="file"]').value = ''
        }
      } else {
        // 如果 API 沒有圖片，清除圖片狀態
        clearImage()
      }

      createSnackbar({
        text: '引入成功',
        showCloseButton: false,
        snackbarProps: {
          timeout: 2000,
          color: 'green',
          location: 'bottom'
        }
      })
    } else {
      createSnackbar({
        text: '查無此書',
        showCloseButton: false,
        snackbarProps: {
          timeout: 2000,
          color: 'red',
          location: 'bottom'
        }
      })
    }
  } catch (error) {
    console.error('搜尋書籍錯誤:', error)
    const text = error?.response?.data?.message || '查無此書'
    createSnackbar({
      text,
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'red',
        location: 'bottom'
      }
    })

    resetForm()
    clearImage()
  }
}
</script>
