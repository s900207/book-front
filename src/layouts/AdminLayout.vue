<template lang="pug">
  VNavigationDrawer(permanent color="#808080")
    VList
      VListItem(:prepend-avatar="prependAvatar" :title="user.account")
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

import {
  mdiBookArrowUp,
  mdiBookSync,
  mdiListBox,
  mdiHome
} from '@mdi/js'

const user = useUserStore()

const navItems = [
  { to: '/admin/import', text: '引入書籍', icon: mdiBookArrowUp, show: true },
  { to: '/admin/bookmanagement', text: '書籍管理', icon: mdiBookSync },
  { to: '/admin/orders', text: '訂單管理', icon: mdiListBox },
  // { to: '/admin/article', text: '文章管理', icon: 'mdi-book' },
  // { to: '/admin/report', text: '檢舉管理', icon: 'mdi-alert' },
  { to: '/', text: '回首頁', icon: mdiHome }
]

const prependAvatar = computed(() => {
  const hash = btoa(user.account).slice(0, 32)
  return `https://www.gravatar.com/avatar/${hash}?d=identicon&s=120`
})
</script>
