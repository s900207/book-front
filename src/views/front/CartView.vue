<template lang="pug">
VContainer
  VCol(cols="12")
    h1 購物車
  VDivider
  VCol(cols="12")
    VDataTable(:items="cart" :headers="headers")
      template(v-slot:[`item.book.image`]="{ item }")
        VImg(:src="item.book.image" alt="Book Image" max-height="100" max-width="60")
      template(#[`item.quantity`]="{ item }")
        VBtn(variant="text" :icon="mdiMinus" color="red" @click="addCart(item.book._id, -1)")
        | {{ item.quantity }}
        VBtn(variant="text" :icon="mdiPlus" color="green" @click="addCart(item.book._id, 1)")
      template(#[`item.action`]="{ item }")
        VBtn(variant="text" :icon="mdiDelete" color="red" @click="addCart(item.book._id, item.quantity * -1)")
  VCol.text-center(cols="12")
    p 總金額: {{ total }}
    VBtn(color="green" :disabled="!canCheckout" :loading="isSubmitting" @click="checkout") 結帳
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import { useUserStore } from '@/store/user'
import { useRouter } from 'vue-router'

import {
  mdiMinus,
  mdiPlus,
  mdiDelete
} from '@mdi/js'

const { apiAuth } = useApi()
const createSnackbar = useSnackbar()
const user = useUserStore()
const router = useRouter()

if (!user.isLogin) {
  createSnackbar({
    text: '請先登入才能查看購物車',
    showCloseButton: false,
    snackbarProps: {
      timeout: 2000,
      color: 'red',
      location: 'bottom'
    }
  })
  router.push('/login')
}

const cart = ref([])
const headers = [
  {
    align: 'center',
    sortable: false,
    value: 'name'
  },
  { title: '書本圖片', key: 'book.image' },
  { title: '書本名稱', key: 'book.title' },
  { title: '單價', key: 'book.retailPrice' },
  { title: '數量', key: 'quantity' },
  { title: '總價', key: 'total', value: item => item.book.retailPrice * item.quantity },
  { title: '操作', key: 'action' }
]

const total = computed(() => {
  return cart.value.reduce((total, current) => {
    return total + current.quantity * current.book.retailPrice
  }, 0)
})

const addCart = async (book, quantity) => {
  if (!user.isLogin) {
    router.push('/login')
    return
  }
  try {
    const { data } = await apiAuth.patch('/users/cart', {
      book,
      quantity
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
    const idx = cart.value.findIndex(item => item.book._id === book)
    cart.value[idx].quantity += quantity
    if (cart.value[idx].quantity <= 0) {
      cart.value.splice(idx, 1)
    }
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
const canCheckout = computed(() => {
  return cart.value.length > 0
})

const isSubmitting = ref(false)
const checkout = async () => {
  isSubmitting.value = true
  try {
    await apiAuth.post('/orders')
    user.cart = 0
    router.push('/orders')
    createSnackbar({
      text: '結帳成功',
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
  isSubmitting.value = false
}

onMounted(async () => {
  if (!user.isLogin) {
    return
  }
  try {
    const { data } = await apiAuth.get('/users/cart')
    cart.value.push(...data.result)
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
})
</script>
