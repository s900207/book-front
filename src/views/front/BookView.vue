<template lang="pug">
  VContainer
    VRow
      VCol(cols="12" md="3" style="position: sticky" top="0")
        VImg(:src="books.image")
        VCardActions
          VRow.justify-center.align-center
            VCol(cols="6")
              VBtn(:prepend-icon="isFavorite ? mdiHeartMinus : mdiHeartPlus" :color="isFavorite ? 'red' : 'blue'" @click="addFavorite") {{ isFavorite ? '取消最愛' : '加入最愛' }}
            VCol(cols="6")
              VBtn(color="primary" :prepend-icon="mdiCart" @click="addCart") 加入購物車
      VCol(cols="12" md="9")
        h1 {{ books.title }}
        h2 {{ books.authors }}
        VRow
          VCol(cols="auto")
            h3 出版者:
          VCol
            p {{ books.publisher }}
        VRow
          VCol(cols="auto")
            h3 價格:
          VCol
            p ${{ books.retailPrice }}
        VRow
          VCol(cols="auto")
            h3 分類:
          VCol
            p {{ books.categories }}
        VRow
          VCol(cols="auto")
            h3 簡介:
            template(v-if="showFullDescription")
              p(v-html="books.description")
            template(v-else)
              p {{ books.description.substring(0, 500) }}
          VCol.text-center
            VBtn(v-if="books.description.length > 100")(color="#4d4637" @click="showFullDescription = !showFullDescription" :icon="showFullDescription ? mdiChevronUp : mdiChevronDown")
        VRow
          VCol(cols="12")
            h3 新增書評:
            VForm(:disabled="isSubmitting" @submit.prevent="submit")
              VRating(v-model="newReview.rating" color="#4d4637 darken-3" hover)
              VTextarea(v-model="newReview.comment" label="你的書評" required)
              VBtn(color="#4d4637" type="submit" :loading="isSubmitting") 提交
        VRow
          VCol(cols="12")
            h3 書評:
            VList
              VListItem(v-for="review in books.reviews" :key="review._id")
                VCard
                  VRow.align-center
                    VCol(cols="auto")
                      VAvatar(:image="getGravatarUrl(review.user.account)" size="60")
                    VCol
                      VRow
                        VCol(cols="auto")
                          VListItemTitle(:style="{ fontSize: '24px', fontWeight: 'bold' }") {{ review.user.account }}
                        VCol(cols="auto")
                          VListItemAction
                            VRating(v-model="review.rating" color="#4d4637 darken-3" size="20" readonly)
                      VRow
                        VCol(cols="12")
                          p.mb-3(:style="{ fontSize: '16px', lineHeight: '1.5', color: '#333' }") {{ review.comment }}
                    VCol.d-flex.justify-end(cols="auto")
                      VListItemAction(v-if="canEditReview(review.user._id)")
                        VBtn(:icon="mdiPencil" color="#4d4637" size="small" @click="() => openDialog(review._id)")

  VDialog(v-model="dialog" max-width="400")
    VForm(:disabled="isSubmitting" @submit.prevent="editReviews")
      VCard
        VCardTitle.text-center.py-4
          h3 編輯書評
        VCardText
          VRating(v-model="updatedReview.rating" color="#4d4637 darken-3" hover class="mb-4")
          VTextarea(v-model="updatedReview.comment" label="你的書評" required rows="4")
        VCardActions.justify-center.pb-4
          VBtn(color="grey" variant="outlined" @click="closeDialog" class="mr-2") 取消
          VBtn(color="#4d4637" @click="editReviews" :loading="isSubmitting") 修正
  </template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useForm } from 'vee-validate'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import { useUserStore } from '@/store/user'
import { useFavorite } from '@/composables/useFavorite'

import {
  mdiHeartPlus,
  mdiHeartMinus,
  mdiCart,
  mdiPencil,
  mdiChevronUp,
  mdiChevronDown
} from '@mdi/js'

const getGravatarUrl = (userAccount) => {
  if (!userAccount) {
    return 'https://www.gravatar.com/avatar/default?d=identicon&s=120'
  }
  const hash = btoa(userAccount).slice(0, 32)
  return `https://www.gravatar.com/avatar/${hash}?d=identicon&s=120`
}

const canEditReview = (reviewUserId) => {
  if (!user.isLogin || !user._id) return false
  return reviewUserId?.toString() === user._id.toString()
}

const route = useRoute()
const router = useRouter()
const { api, apiAuth } = useApi()
const isSubmitting = ref(false)
const showFullDescription = ref(false)
const createSnackbar = useSnackbar()
const user = useUserStore()
const newReview = ref({
  usersId: '',
  rating: 0,
  comment: ''
})
const dialog = ref(false)
const { handleSubmit } = useForm({
  initialValues: {
    usersId: '',
    rating: 0,
    comment: ''
  }
})

const books = ref({
  _id: '',
  image: '',
  title: '',
  authors: '',
  publisher: '',
  retailPrice: '',
  categories: '',
  buyLink: '',
  description: '',
  reviews: []
})

const updatedReview = ref({
  id: '',
  rating: 0,
  comment: '',
  bookId: ''
})

const { isFavorite, checkFavoriteStatus, addFavorite } = useFavorite(route.params.id)

const closeDialog = () => {
  dialog.value = false
  // 重置表單
  updatedReview.value = {
    id: '',
    rating: 0,
    comment: '',
    bookId: ''
  }
}

const submit = handleSubmit(async (values) => {
  if (!user.isLogin) {
    router.push('/login')
    createSnackbar({
      text: '請先登入',
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'red',
        location: 'bottom'
      }
    })
    return
  }

  isSubmitting.value = true
  try {
    const { data } = await apiAuth.post(`/books/${route.params.id}/reviews`, {
      rating: newReview.value.rating,
      comment: newReview.value.comment
    })

    if (data && data.result) {
      books.value.reviews.push(data.result)
      // 重置表單
      newReview.value = {
        usersId: '',
        rating: 0,
        comment: ''
      }
    }
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
  } finally {
    isSubmitting.value = false
  }
})

const openDialog = (reviewId) => {
  if (reviewId) {
    const review = books.value.reviews.find(review => review._id === reviewId)
    if (review) {
      updatedReview.value.id = review._id
      updatedReview.value.rating = review.rating
      updatedReview.value.comment = review.comment
      updatedReview.value.bookId = books.value._id
    }
  }
  dialog.value = true
}

const editReviews = handleSubmit(async (values) => {
  isSubmitting.value = true
  try {
    await apiAuth.patch(`/books/${updatedReview.value.bookId}/reviews/${updatedReview.value.id}`, {
      rating: updatedReview.value.rating,
      comment: updatedReview.value.comment
    })

    const reviewIndex = books.value.reviews.findIndex(review => review._id === updatedReview.value.id)
    if (reviewIndex !== -1) {
      books.value.reviews[reviewIndex].rating = updatedReview.value.rating
      books.value.reviews[reviewIndex].comment = updatedReview.value.comment
    }

    createSnackbar({
      text: '編輯成功',
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'green',
        location: 'bottom'
      }
    })
    closeDialog()
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
  } finally {
    isSubmitting.value = false
  }
})

onMounted(async () => {
  try {
    const { data } = await api.get(`/books/${route.params.id}`)
    books.value._id = data.result._id
    books.value.image = data.result.image
    books.value.title = data.result.title
    books.value.authors = data.result.authors
    books.value.publisher = data.result.publisher
    books.value.retailPrice = data.result.retailPrice
    books.value.categories = data.result.categories
    books.value.buyLink = data.result.buyLink
    let formattedDescription = data.result.description.replace(/(※|★|◆|✓|●|▓|▌|￭|──|【)/g, '<br>$1')
    formattedDescription = formattedDescription.replace(/(】)/g, '$1<br>')
    formattedDescription = formattedDescription.replace(/(?<=──[^,]*?)(?=,)/g, '<br>$1')
    books.value.description = formattedDescription
    books.value.reviews = data.result.reviews

    document.title = `書評網 | ${books.value.title}`
    await checkFavoriteStatus()
  } catch (error) {
    console.log(error)
  }
})

const addCart = async () => {
  if (!user.isLogin) {
    router.push('/login')
    return
  }
  try {
    const { data } = await apiAuth.patch('/users/cart', {
      book: books.value._id,
      quantity: 1
    })
    user.cart = data.result
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
</script>

  <style scoped>
  .v-avatar {
    border: 2px solid #e0e0e0;
  }

  .v-card {
    margin-bottom: 16px;
    padding: 16px;
  }

  .v-list-item {
    padding: 0;
  }
  </style>
