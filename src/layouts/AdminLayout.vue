<template lang="pug">
VNavigationDrawer(permanent color="#808080")
  VList
    VListItem(:prepend-avatar :title="user.account")
  VDivider
  VList
    VListItem(
      v-for="item in navItems" :key="item.to"
      :to="item.to" :title="item.text"
    )
      template(v-slot:prepend)
        svgIcon(:href="item.svgIcon" class="icon-with-space")
VMain(style="background-color:#D3D3D3")
  RouterView
</template>

<script setup>
import { useUserStore } from '@/store/user'
import { computed } from 'vue'
import svgIcon from '@/components/svgIcon/svgIcon.vue'
const user = useUserStore()

const navItems = [
  { to: '/admin/import', text: '引入書籍', svgIcon: '#icon-book-arrow-up', show: true },
  { to: '/admin/bookmanagement', text: '書籍管理', svgIcon: '#icon-book-sync' },
  { to: '/admin/orders', text: '訂單管理', svgIcon: '#icon-list-box' },
  { to: '/admin/article', text: '文章管理', svgIcon: '#icon-book', show: false },
  { to: '/admin/report', text: '檢舉管理', svgIcon: '#icon-alert', show: false },
  { to: '/', text: '回首頁', svgIcon: '#icon-home' }
]

const prependAvatar = computed(() => {
  return `https://source.boringavatars.com/beam/120/${user.account}?colors=4EB3DE,8DE0A6,FCF09F,F27C7C,DE528C`
})
</script>
<style scoped>
.icon-with-space {
  margin-right: 10px;
}
</style>
