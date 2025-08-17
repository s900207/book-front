<template lang="pug">
  VContainer
    VCol(cols="12")
      h1 購物車
    VDivider
    VCol(cols="12")
      // 載入狀態
      VProgressLinear(v-if="isLoading" indeterminate color="primary")

      // 空購物車提示
      VCard(v-else-if="cart.length === 0" class="text-center pa-8")
        VIcon(size="64" color="grey") {{ mdiCartOutline }}
        h3.mt-4.mb-2 購物車是空的
        p.text-grey 還沒有添加任何商品到購物車
        VBtn(color="primary" to="/") 繼續購物

      // 購物車列表
      VDataTable(v-else :items="cart" :headers="headers" :loading="isLoading")
        template(#[`item.book.image`]="{ item }")
          VImg(:src="item.book.image" alt="Book Image" max-height="100" max-width="60")

        template(#[`item.quantity`]="{ item }")
          .d-flex.align-center.justify-center
            VBtn(
              variant="text"
              :icon="mdiMinus"
              color="red"
              size="small"
              :disabled="isUpdating"
              @click="updateCart(item.book._id, -1)"
            )
            span.mx-3 {{ item.quantity }}
            VBtn(
              variant="text"
              :icon="mdiPlus"
              color="green"
              size="small"
              :disabled="isUpdating"
              @click="updateCart(item.book._id, 1)"
            )

        template(#[`item.action`]="{ item }")
          VBtn(
            variant="text"
            :icon="mdiDelete"
            color="red"
            :disabled="isUpdating"
            @click="removeFromCart(item.book._id, item.quantity)"
          )

        template(#[`item.book.retailPrice`]="{ item }")
          | ${{ item.book.retailPrice }}

        template(#[`item.total`]="{ item }")
          | ${{ item.book.retailPrice * item.quantity }}

    VCol.text-center(cols="12" v-if="cart.length > 0")
      VCard.pa-4
        h3 總金額: ${{ total }}
        VBtn(
          color="green"
          size="large"
          class="mt-4"
          :disabled="!canCheckout || isSubmitting"
          :loading="isSubmitting"
          @click="checkout"
        ) 結帳
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
  mdiDelete,
  mdiCartOutline
} from '@mdi/js'

const { apiAuth } = useApi()
const createSnackbar = useSnackbar()
const user = useUserStore()
const router = useRouter()

// 響應式變量
const cart = ref([])
const isLoading = ref(false)
const isUpdating = ref(false)
const isSubmitting = ref(false)

// 表格標題配置
const headers = [
  { title: '書本圖片', key: 'book.image', align: 'center', sortable: false },
  { title: '書本名稱', key: 'book.title' },
  { title: '單價', key: 'book.retailPrice', align: 'center' },
  { title: '數量', key: 'quantity', align: 'center', sortable: false },
  { title: '小計', key: 'total', align: 'center', sortable: false },
  { title: '操作', key: 'action', align: 'center', sortable: false }
]

// 計算總金額
const total = computed(() => {
  return cart.value.reduce((total, current) => {
    return total + current.quantity * current.book.retailPrice
  }, 0)
})

// 檢查是否可以結帳
const canCheckout = computed(() => {
  return cart.value.length > 0 && !isLoading.value && !isUpdating.value
})

// 統一的錯誤處理函數
const handleError = (error, defaultMessage = '發生錯誤，請稍後再試') => {
  const text = error?.response?.data?.message || defaultMessage
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

// 統一的成功提示函數
const showSuccess = (message) => {
  createSnackbar({
    text: message,
    showCloseButton: false,
    snackbarProps: {
      timeout: 2000,
      color: 'green',
      location: 'bottom'
    }
  })
}

// 更新購物車數量
const updateCart = async (bookId, quantityChange) => {
  if (!user.isLogin) {
    router.push('/login')
    return
  }

  const currentItem = cart.value.find(item => item.book._id === bookId)
  if (!currentItem) {
    handleError(null, '找不到指定的商品')
    return
  }

  // 檢查是否會導致數量小於等於0
  const newQuantity = currentItem.quantity + quantityChange
  if (newQuantity <= 0) {
    await removeFromCart(bookId, currentItem.quantity)
    return
  }

  isUpdating.value = true
  try {
    const { data } = await apiAuth.patch('/users/cart', {
      book: bookId,
      quantity: quantityChange
    })

    user.cart = data.result

    // 更新本地購物車數據
    const idx = cart.value.findIndex(item => item.book._id === bookId)
    if (idx !== -1) {
      cart.value[idx].quantity = newQuantity
    }

    const message = quantityChange > 0 ? '商品數量已增加' : '商品數量已減少'
    showSuccess(message)
  } catch (error) {
    handleError(error, '更新數量失敗')
  } finally {
    isUpdating.value = false
  }
}

// 從購物車移除商品
const removeFromCart = async (bookId, quantity) => {
  if (!user.isLogin) {
    router.push('/login')
    return
  }

  isUpdating.value = true
  try {
    const { data } = await apiAuth.patch('/users/cart', {
      book: bookId,
      quantity: -quantity
    })

    user.cart = data.result

    // 從本地購物車移除商品
    const idx = cart.value.findIndex(item => item.book._id === bookId)
    if (idx !== -1) {
      cart.value.splice(idx, 1)
    }

    showSuccess('商品已從購物車移除')
  } catch (error) {
    handleError(error, '移除商品失敗')
  } finally {
    isUpdating.value = false
  }
}

// 結帳功能
const checkout = async () => {
  if (!canCheckout.value) return

  isSubmitting.value = true
  try {
    await apiAuth.post('/orders')
    user.cart = 0
    cart.value = []

    showSuccess('結帳成功！')
    router.push('/orders')
  } catch (error) {
    handleError(error, '結帳失敗')
  } finally {
    isSubmitting.value = false
  }
}

// 載入購物車數據
const loadCart = async () => {
  if (!user.isLogin) {
    createSnackbar({
      text: '請先登入才能查看購物車',
      showCloseButton: false,
      snackbarProps: {
        timeout: 3000,
        color: 'warning',
        location: 'bottom'
      }
    })
    router.push('/login')
    return
  }

  isLoading.value = true
  try {
    const { data } = await apiAuth.get('/users/cart')
    cart.value = [...data.result]
  } catch (error) {
    handleError(error, '載入購物車失敗')
  } finally {
    isLoading.value = false
  }
}

// 組件掛載時載入數據
onMounted(() => {
  loadCart()
})
</script>

  <style scoped>
  .v-data-table {
    background-color: white;
  }

  .v-img {
    border-radius: 4px;
  }

  h1 {
    color: #000;
    margin-bottom: 16px;
  }
  </style>
