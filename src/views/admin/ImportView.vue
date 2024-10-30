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
          rounded
          theme="light"
          variant="solo"
          :style="{ width: isMobile ? '100%' : '500px' }"
          @click:append="searchBook"
          @keydown.enter="searchBook"
        )
          template(v-slot:prepend-inner)
            svgIcon(href="#icon-magnify")

  VRow
    VCol.d-flex.justify-center(cols="12")
      VForm(:disabled="isSubmitting" @submit.prevent="submit")
        VCard
          VRow.flex.justify-center.align-center
            VCol
              VCard(
              outlined
              class="d-flex justify-center align-center"
            )
              VImg(
                :src="image.value.value"
                width="300px"
                cover
                readonly
              )
            VCol(class="me-2" )
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
              VTextarea(
          label="簡介"
          v-model="description.value.value"
          :error-messages="description.errorMessage.value"
        )
              VCardActions
        VRow.text-center.mb-5(cols="12")
          VCol
            VSpacer
            VBtn(color="green" type="submit" :loading="isSubmitting") 新增
  </template>

<script setup>
import { ref } from 'vue'
import * as yup from 'yup'
import { useField, useForm } from 'vee-validate'
import axios from 'axios'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import svgIcon from '@/components/svgIcon/svgIcon.vue'

const { apiAuth } = useApi()
const createSnackbar = useSnackbar()

const isMobile = ref(false)
const isSubmitting = ref(false)
const isbn = ref('')

const schema = yup.object({
  title: yup
    .string()
    .required('缺少商品名稱'),
  publisher: yup
    .string()
    .required('缺少出版者'),
  retailPrice: yup
    .number()
    .typeError('商品價格格式錯誤')
    .required('缺少商品價格')
    .min(0, '商品價格不能小於 0'),
  description: yup
    .string()
    .required('缺少簡介')

})

const { handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    title: '',
    authors: '',
    publisher: '',
    retailPrice: '',
    categories: '',
    description: '',
    image: '',
    maturityRating: '',
    buyLink: ''
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
const buyLink = useField('buyLink')

const submit = handleSubmit(async (values) => {
  console.log(values)
  try {
    const fd = new FormData()
    for (const key in values) {
      fd.append(key, values[key])
    }
    if (image.value) {
      const imageBlob = await fetch(image.value).then(res => res.blob())
      fd.append('image', imageBlob, 'image.jpg')
    }
    await apiAuth.post('/books', fd)
    createSnackbar({
      text: '新增成功',
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'green',
        location: 'bottom'
      }
    })
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
})

const searchBook = async () => {
  if (!isbn.value.trim()) {
    return
  }
  try {
    const isIsbn = /^\d{10}(\d{3})?$/.test(isbn.value)
    const encodedInput = encodeURIComponent(isbn.value.trim())

    const { data } = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${isIsbn ? 'isbn' : 'intitle'}:${encodedInput}`)
    console.log(data)
    if (data && data.items && data.items.length > 0) {
      title.value.value = data.items[0].volumeInfo.title
      authors.value.value = data.items[0].volumeInfo.authors
      publisher.value.value = data.items[0].volumeInfo.publisher
      retailPrice.value.value = data.items[0].saleInfo.retailPrice ? data.items[0].saleInfo.retailPrice.amount : null
      categories.value.value = data.items[0].volumeInfo.categories
      description.value.value = data.items[0].volumeInfo.description
      image.value.value = data.items[0].volumeInfo.imageLinks.thumbnail
        .replace('http://', 'https://')
        .replace('img=1&zoom=1', 'img=1&zoom=2')
        .replace('edge=curl', '')
      maturityRating.value.value = data.items[0].volumeInfo.maturityRating
      buyLink.value.value = data.items[0].saleInfo.buyLink

      createSnackbar({
        text: '引入成功',
        showCloseButton: false,
        snackbarProps: {
          timeout: 2000,
          color: 'green',
          location: 'bottom'
        }
      })
    }
  } catch (error) {
    console.error(error)
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
    title.value.value = ''
    authors.value.value = ''
    publisher.value.value = ''
    retailPrice.value.value = ''
    categories.value.value = ''
    description.value.value = ''
    image.value.value = ''
  }
}
</script>
