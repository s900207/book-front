import { ref } from 'vue'
import { useApi } from '@/composables/axios'
import { useUserStore } from '@/store/user'
import { useRouter } from 'vue-router'
import { useSnackbar } from 'vuetify-use-dialog'

export function useFavorite (bookId) {
  const { apiAuth } = useApi()
  const user = useUserStore()
  const isFavorite = ref(false)
  const createSnackbar = useSnackbar()
  const router = useRouter()

  const checkFavoriteStatus = async () => {
    try {
      const { data } = await apiAuth.get('/users/favorite', {
        params: { bookId }
      })
      isFavorite.value = data.result.includes(bookId)
    } catch (error) {
      console.error(error)
      isFavorite.value = false
    }
  }

  const addFavorite = async () => {
    if (!user.isLogin) {
      router.push('/login')
      return
    }
    isFavorite.value = !isFavorite.value
    try {
      const { data } = await apiAuth.post('/users/favorite', {
        bookId,
        isFavorite: isFavorite.value
      })
      user.favorite = data.result
      createSnackbar({
        text: isFavorite.value ? '已加入我的最愛' : '已移除我的最愛',
        showCloseButton: false,
        snackbarProps: {
          timeout: 2000,
          color: isFavorite.value ? 'green' : 'red',
          location: 'bottom'
        }
      })
    } catch (error) {
      console.error(error)
      if (error.response && error.response.status === 401) {
        router.push('/login')
      } else {
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

  return { isFavorite, checkFavoriteStatus, addFavorite }
}
