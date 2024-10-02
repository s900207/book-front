<template lang="pug">
VContainer
  VRow
    VCol(cols="12" md="3" style="position: sticky" top="0")
      VImg(:src="books.image")
      VCardActions
        VRow.justify-center.align-center
          VCol(cols="6")
            VBtn(:color="isFavorite ? 'red' : 'blue'" @click="addFavorite")
              template(v-slot:prepend)
                svgIcon(:href="isFavorite ? '#icon-heart-minus' : '#icon-heart-plus'")
              span {{ isFavorite ? '取消最愛' : '加入最愛' }}
          VCol(cols="6")
            VBtn(@click="addCart" color="primary" )
              template(v-slot:prepend)
                svgIcon(href="#icon-cart")
              span 加入購物車
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
          VBtn(:color="showFullDescription ? '#4d4637' : '#4d4637'" @click="showFullDescription = !showFullDescription" icon class="ma-2" rounded width="40" height="40")
            template
              svgIcon(:href="showFullDescription ? '#icon-chevron-up' : '#icon-chevron-down'")
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
                VRow
                  VCol(cols="auto")
                    VListItemTitle(:style="{ fontSize: '30px' }") {{ review.user.account }}
                  VCol(cols="auto")
                    VListItemAction
                      VRating(v-model="review.rating" color="#4d4637 darken-3" size="25" readonly)
                VRow
                  VCol(cols="auto")
                    VListItemSubtitle.mb-5(:style="{ fontSize: '20px' }") {{ review.comment }}
                  VCol.d-flex.justify-end
                    //- VListItemAction
                    //-   VBtn(icon="mdi-pencil" color="#4d4637" @click="() => openDialog(review._id)")
VDialog(v-model="dialog" max-width="290")
  VForm(:disabled="isSubmitting" @submit.prevent="submit")
    VCard
      VCardTitle
        h3 編輯書評
      VCardText
        VRating(v-model="updatedReview.rating" color="#4d4637 darken-3" hover)
        VTextarea(v-model="updatedReview.comment" label="你的書評" required)
      VCardActions
        VBtn(color="#4d4637" @click="editReviews(review)" :loading="isSubmitting") 修正
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useForm } from 'vee-validate'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import { useUserStore } from '@/store/user'
import { useFavorite } from '@/composables/useFavorite'
import svgIcon from '@/components/svgIcon/svgIcon.vue'

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

const updatedReview = ref([])

const { isFavorite, checkFavoriteStatus, addFavorite } = useFavorite(route.params.id)

// const closeDialog = () => {
//   dialog.value = false
// }

const submit = handleSubmit(async (values) => {
  console.log(newReview.value)
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
  try {
    const { data } = await apiAuth.post(`/books/${route.params.id}/reviews`, {
      rating: newReview.value.rating,
      conmment: newReview.value.comment
    })

    if (data && data.result) {
      books.value.reviews.push(data.result)
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
  }
})

// const openDialog = (reviewId) => {
//   if (reviewId) {
//     const review = books.value.reviews.find(review => review._id === reviewId)
//     updatedReview.value.id = review._id
//     updatedReview.value.rating = review.rating
//     updatedReview.value.comment = review.comment
//     updatedReview.value.bookId = books.value._id
//     console.log(updatedReview.value.bookId)
//   }
//   dialog.value = true
// }

// const editReviews = handleSubmit(async (values) => {
//   try {
//     console.log(updatedReview.value)
//     console.log('Form values:', values)
//     const fd = new FormData()
//     for (const key in values) {
//       fd.append(key, updatedReview.value[key] || values[key])
//     }

//     if (dialog.value === '') {
//       await apiAuth.patch(`/books/${updatedReview.value.bookId}/reviews/${updatedReview.value.id}`, fd)
//     }
//     console.log('FormData entries:', ...fd.entries())

//     createSnackbar({
//       text: '編輯成功',
//       showCloseButton: false,
//       snackbarProps: {
//         timeout: 2000,
//         color: 'green',
//         location: 'bottom'
//       }
//     })
//   } catch (error) {
//     console.log(error)
//     const text = error?.response?.data?.message || '發生錯誤，請稍後再試'
//     createSnackbar({
//       text,
//       showCloseButton: false,
//       snackbarProps: {
//         timeout: 2000,
//         color: 'red',
//         location: 'bottom'
//       }
//     })
//   }
//   closeDialog()
// })
// console.log(updatedReview.value)
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
