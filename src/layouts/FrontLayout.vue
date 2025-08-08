<template lang="pug">
//- 手機版側欄
VNavigationDrawer(v-model="drawer" temporary location="right" v-if="isMobile" style="background-color:#4d4637;color:#f6eee0;margin-top: 64px" )
  VList(nav)
    template(v-for="item in navItems" :key="item.to")
      VListItem(:to="item.to" v-if="item.show")
        template(#prepend)
          VIcon(:icon="item.icon")
        template(#append)
          VBadge(color="error" :content="user.cart" v-if="item.to === '/cart'" inline)
        VListItemTitle {{ item.text }}
    VListItem(v-if="user.isLogin" @click="logout")
      template(#prepend)
        VIcon(icon="mdi-logout")
      VListItemTitle 登出
VAppBar(color="#4d4637")
  VContainer.d-flex.align-center
    VBtn(to="/" :active="false")
      VAppBarTitle.text-h5 書評網
    VSpacer
    template(v-if="isMobile")
      VAppBarNavIcon(@click="drawer = true")
    template(v-else)
      template(v-for="item in navItems" :key="item.to")
        VBtn(:to="item.to" :prepend-icon="item.icon" v-if="item.show") {{ item.text }}
          VBadge(color="error" :content="user.cart" v-if="item.to === '/cart'" floating)
      VBtn(prepend-icon="mdi-logout" v-if="user.isLogin" @click="logout") 登出
VMain(style="background-color:#f6eee0")
  RouterView
</template>

<script setup>
import { useDisplay } from 'vuetify'
import { ref, computed } from 'vue'
import { useUserStore } from '@/store/user'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import { useRouter } from 'vue-router'
import svgIcon from '@/components/svgIcon/svgIcon.vue'

const { apiAuth } = useApi()
const router = useRouter()
const createSnackbar = useSnackbar()
const user = useUserStore()
const { mobile } = useDisplay()
const isMobile = computed(() => mobile.value)

const drawer = ref(false)

const navItems = computed(() => {
  return [
    { to: '/mybook', text: '我的最愛書籍', icon: 'mdi-book-account', show: user.isLogin },
    { to: '/article', text: '文章', icon: 'mdi-book', show: false },
    { to: '/admin', text: '管理員管理', icon: 'mdi-cog', show: user.isLogin && user.isAdmin },
    { to: '/cart', text: '購物車', icon: 'mdi-cart', show: true },
    { to: '/orders', text: '訂單', icon: 'mdi-list-box', show: user.isLogin },
    { to: '/register', text: '註冊', icon: 'mdi-account-plus', show: !user.isLogin },
    { to: '/login', text: '登入', icon: 'mdi-login', show: !user.isLogin }
  ]
})

const logout = async () => {
  try {
    await apiAuth.delete('/users/logout')
    user.logout()
    createSnackbar({
      text: '登出成功',
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'green',
        location: 'bottom'
      }
    })
    router.push('/')
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
