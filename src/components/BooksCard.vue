<template lang="pug">
VCard.books-card( width="250px" height="370px")
  RouterLink(:to="'/books/' + _id")
    VImg(:src="image" height="250px")
  VCardTitle
    RouterLink.text-primary.text-decoration-none(:to="'/books/' + _id" :title="title" :style="{fontWeight: 'bold'}") {{ title}}
  VRow.justify-space-between
    VCol(cols="6")
      VCardSubtitle.text-left(style="width:170px" v-bind:title="authors") {{ authors }}
    VCol.text-right(cols="6")
      VCardSubtitle
        | $
        span(:style="{ fontSize: '1.5em', color: '#750000' ,fontWeight: 'bold'}") {{ retailPrice }}
  VCardActions
    VRow.justify-center.align-center
      VCol(cols="6")
        VBtn(:prepend-icon="isFavorite ? 'mdi-heart-minus' : 'mdi-heart-plus'" :color="isFavorite ? 'red' : 'blue'" @click="addFavorite") {{ isFavorite ? '取消最愛' : '加入最愛' }}
      VCol(cols="6")
        VBtn(color="primary" prepend-icon="mdi-cart" @click="addCart") 加入購物車
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useApi } from '@/composables/axios'
import { useUserStore } from '@/store/user'
import { useSnackbar } from 'vuetify-use-dialog'
import { useRouter } from 'vue-router'

const { apiAuth } = useApi()

const props = defineProps(['_id', 'title', 'authors', 'publisher', 'retailPrice', 'categories', 'description', 'image'])
const user = useUserStore()
const isFavorite = ref(false)
const createSnackbar = useSnackbar()
const router = useRouter()

const addFavorite = async () => {
  if (!user.isLogin) {
    router.push('/login')
    return
  }
  isFavorite.value = !isFavorite.value
  try {
    const { data } = await apiAuth.post('/users/favorite', {
      bookId: props._id,
      isFavorite: isFavorite.value
    })
    console.log(data) // 我拿到資料了
    user.favorite = data.result
    if (isFavorite.value) {
      createSnackbar({
        text: '已加入我的最愛',
        showCloseButton: false,
        snackbarProps: {
          timeout: 2000,
          color: 'green',
          location: 'bottom'
        }
      })
    } else {
      createSnackbar({
        text: '已移除我的最愛',
        showCloseButton: false,
        snackbarProps: {
          timeout: 2000,
          color: 'red',
          location: 'bottom'
        }
      })
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // 如果出现401错误，重定向到登录页面
      router.push('/login')
    } else {
      // 其他错误，输出错误信息并显示Snackbar
      console.error(error)
      createSnackbar({
        text: '發生錯誤，請稍後再試',
        showCloseButton: false,
        snackbarProps: {
          timeout: 2000,
          color: 'red',
          location: 'bottom'
        }
      })
    }
  }
}
const addCart = async () => {
  if (!user.isLogin) {
    router.push('/login')
    return
  }
  try {
    const { data } = await apiAuth.patch('/users/cart', {
      book: props._id,
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

const checkFavoriteStatus = async () => {
  try {
    const { data } = await apiAuth.get('/users/favorite', {
      params: {
        bookId: props._id
      }
    })
    return data.result.includes(props._id)
  } catch (error) {
    // 如果發生錯誤，可能是用戶未登錄或其他原因
    console.error(error)
    return false
  }
}
onMounted(async () => {
  if (user.isLogin) { // 確保用戶已登錄
    isFavorite.value = await checkFavoriteStatus()
  }
})

</script>
