<template lang="pug">
//- 手機版側欄
VNavigationDrawer(v-model="drawer" temporary location="right" v-if="isMobile" style="background-color:#4d4637;color:#f6eee0;margin-top: 64px" )
  VList(nav)
    template(v-for="item in navItems" :key="item.to")
      VListItem(:to="item.to" v-if="item.show" class="nav-item")
        template(#prepend)
          svgIcon(:href="item.svgIcon" v-if="item.svgIcon" class="nav-icon")
        template(#append)
          VBadge(color="error" :content="user.cart" v-if="item.to === '/cart'" inline)
        VListItemTitle {{ item.text }}
    VListItem(v-if="user.isLogin" @click="logout" class="nav-item")
      template(#prepend)
        svgIcon(:href="'#icon-logout'" class="nav-icon")
      VListItemTitle 登出
//-這邊能補登入註冊，並放在望面，導覽列消去
//- 導覽列
VAppBar(color="#4d4637")
  VContainer.d-flex.align-center
    VBtn(to="/" :active="false")
      VAppBarTitle.text-h5 書評網
    VSpacer
    //- 手機板導覽列
    template(v-if="isMobile")
      VBtn(@click="drawer = true")
        svgIcon(href="#icon-menu")
    //- 電腦版導覽列
    template(v-else)
      template(v-for="item in navItems" :key="item.to")
        VBtn(:to="item.to" :prepend-icon="item.icon" v-if="item.show") {{ item.text }}
          template(v-slot:prepend)
            svgIcon(:href="item.svgIcon" )
          VBadge(color="error" :content="user.cart" v-if="item.to === '/cart'" floating)
      VBtn(v-if="user.isLogin" @click="logout" class="nav-item")
        template(v-slot:prepend)
            svgIcon(href="#icon-logout")
        span 登出
//- 頁面內容
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
// 手機版判斷
const { mobile } = useDisplay()
const isMobile = computed(() => mobile.value)

// 手機版惻欄開關
const drawer = ref(false)

// 導覽列項目
const navItems = computed(() => {
  return [
    { to: '/mybook', text: '我的書籍', svgIcon: '#icon-book-account', show: user.isLogin },
    { to: '/article', text: '文章', svgIcon: '#icon-book', show: false },
    { to: '/admin', text: '管理員管理', svgIcon: '#icon-cog', show: user.isLogin && user.isAdmin },
    { to: '/cart', text: '購物車', svgIcon: '#icon-cart', show: true },
    { to: '/orders', text: '訂單', svgIcon: '#icon-list-box', show: user.isLogin },
    { to: '/register', text: '註冊', svgIcon: '#icon-account-plus', show: !user.isLogin },
    { to: '/login', text: '登入', svgIcon: '#icon-login', show: !user.isLogin }
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

<style scoped>
.nav-item {
  display: flex;
  align-items: center;
}

.nav-icon {
  width: 24px;
  height: 24px;
  margin-right: 8px;
}

.nav-item-title {
  font-size: 16px;
}
</style>
