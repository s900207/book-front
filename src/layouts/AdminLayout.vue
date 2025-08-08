<template lang="pug">
VNavigationDrawer(permanent color="#808080")
  VList
    VListItem(:prepend-avatar :title="user.account")
  VDivider
  VList
    VListItem(
      v-for="item in navItems" :key="item.to"
      :to="item.to" :title="item.text" :prepend-icon="item.icon"
    )
VMain(style="background-color:#D3D3D3")
  RouterView
</template>

<script setup>
import { useUserStore } from '@/store/user'
import { computed } from 'vue'
import svgIcon from '@/components/svgIcon/svgIcon.vue'

const user = useUserStore()

const navItems = [
  { to: '/admin/import', text: '引入書籍', icon: 'mdi-book-arrow-up', show: true },
  { to: '/admin/bookmanagement', text: '書籍管理', icon: 'mdi-book-sync' },
  { to: '/admin/orders', text: '訂單管理', icon: 'mdi-list-box' },
  // { to: '/admin/article', text: '文章管理', icon: 'mdi-book' },
  // { to: '/admin/report', text: '檢舉管理', icon: 'mdi-alert' },
  { to: '/', text: '回首頁', icon: 'mdi-home' }
]

const prependAvatar = computed(() => {
  return `https://source.boringavatars.com/beam/120/${user.account}?colors=4EB3DE,8DE0A6,FCF09F,F27C7C,DE528C`
})
</script>
