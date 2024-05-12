<template lang="pug">
VCard.books-card( width="250px" height="350px")
    VImg(:src="image" height="250px")
    VCardTitle
      RouterLink.text-primary.text-decoration-none(:to="'/books/' + _id" :title="title") {{ title}}
    VRow.justify-space-between
      VCol(cols="auto")
        VCardSubtitle.text-left(style="width:170px" v-bind:title="authors") {{ authors }}
      VCol(cols="auto")
        VBtn.text-right(:icon="isFavorite ? 'mdi-heart-minus' : 'mdi-heart-plus'" :color="isFavorite ? 'red' : 'blue'" @click="addFavorite" )
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
  
  onMounted(async () => {
    isFavorite.value = await checkFavoriteStatus()
  })
  const checkFavoriteStatus = async () => {
    try {
      const { data } = await apiAuth.get('/users/favorite', {
        params: {
          bookId: props._id
        }
      })
      return data.result.includes(props._id)
    } catch (error) {
      console.error(error)
      return false
    }
  }
  </script>
  