<template lang="pug">
  VCard.books-card( width="250px" height="380px" class="hover-card")
    // 成人內容標籤
    .mature-badge(v-if="maturityRating === 'MATURE'")
      span.mature-text 18+
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
          VBtn(:prepend-icon="isFavorite ? 'mdi-heart-minus' : 'mdi-heart-plus'" :color="isFavorite ? 'red' : 'blue'" @click="addFavorite" class="btn") {{ isFavorite ? '取消最愛' : '加入最愛' }}
        VCol(cols="6")
          VBtn(color="primary" prepend-icon="mdi-cart" @click="addCart" class="btn") 加入購物車
  </template>

  <style scoped>
  .hover-card {
    transition: all 1s ease;
    cursor: pointer;
    position: relative;
  }

  .hover-card:hover {
    box-shadow:
      0 0 20px rgba(139, 69, 19, 0.7),
      0 0 40px rgba(160, 82, 45, 0.5);
    transform: translateY(-5px);
    background-color: rgba(128, 128, 128, 0.1);
    color: brown;
    filter: brightness(0.95);
  }

  .btn:hover {
    box-shadow:
      0 0 20px rgba(139, 69, 19, 0.7),
      0 0 40px rgba(160, 82, 45, 0.5);
  }

  .mature-badge {
    position: absolute;
    top: 8px;
    right: 8px;
    background: linear-gradient(135deg, #f44336, #d32f2f);
    color: white;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 10px;
    font-weight: bold;
    z-index: 10;
    box-shadow: 0 2px 8px rgba(244, 67, 54, 0.4);
    border: 1px solid #b71c1c;
    display: flex;
    align-items: center;
    gap: 2px;
    animation: mature-pulse 3s infinite;
  }

  .mature-text {
    font-size: 9px;
    letter-spacing: 0.5px;
    font-weight: 900;
  }

  @keyframes mature-pulse {
    0% {
      box-shadow: 0 2px 8px rgba(244, 67, 54, 0.4);
      transform: scale(1);
    }
    50% {
      box-shadow: 0 2px 12px rgba(244, 67, 54, 0.7);
      transform: scale(1.05);
    }
    100% {
      box-shadow: 0 2px 8px rgba(244, 67, 54, 0.4);
      transform: scale(1);
    }
  }

  .hover-card:hover .mature-badge {
    animation: mature-glow 1.5s infinite;
  }

  @keyframes mature-glow {
    0% {
      box-shadow: 0 2px 8px rgba(244, 67, 54, 0.4);
    }
    50% {
      box-shadow:
        0 2px 12px rgba(244, 67, 54, 0.8),
        0 0 20px rgba(244, 67, 54, 0.6);
    }
    100% {
      box-shadow: 0 2px 8px rgba(244, 67, 54, 0.4);
    }
  }

  .hover-card .v-img {
    position: relative;
  }
  </style>

<script setup>
import { ref, onMounted } from 'vue'
import { useApi } from '@/composables/axios'
import { useUserStore } from '@/store/user'
import { useSnackbar } from 'vuetify-use-dialog'
import { useRouter } from 'vue-router'

const { apiAuth } = useApi()

const props = defineProps([
  '_id',
  'title',
  'authors',
  'publisher',
  'retailPrice',
  'categories',
  'description',
  'image',
  'maturityRating'
])

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
    console.log(data)
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
      router.push('/login')
    } else {
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

onMounted(async () => {
  if (user.isLogin) {
    isFavorite.value = await checkFavoriteStatus()
  }
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
