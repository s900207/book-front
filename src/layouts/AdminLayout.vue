<template lang="pug">
VNavigationDrawer(permanent)
  VList
    VListItem(:prepend-avatar :title="user.account")
  VDivider
  VList
    VListItem(
      v-for="item in navItems" :key="item.to"
      :to="item.to" :title="item.text" :prepend-icon="item.icon"
    )
VMain
  RouterView
</template>

<script setup>
import { useUserStore } from '@/store/user'
import { computed } from 'vue'

const user = useUserStore()

const navItems = [
  { to: '/admin/bookmanagement', text: '書籍管理', icon: 'mdi-book-sync' },
  { to: '/admin/article', text: '文章管理', icon: 'mdi-book' },
  { to: '/admin/report', text: '檢舉管理', icon: 'mdi-alert' },
  { to: '/', text: '回首頁', icon: 'mdi-home' }
]

const prependAvatar = computed(() => {
  return `https://source.boringavatars.com/beam/120/${user.account}?colors=4EB3DE,8DE0A6,FCF09F,F27C7C,DE528C`
})
</script>
