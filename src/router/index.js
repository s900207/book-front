// Composables
import { createRouter, createWebHashHistory, START_LOCATION } from 'vue-router'
import { useUserStore } from '@/store/user'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/FrontLayout.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/front/HomeView.vue'),
        meta: {
          title: '書評網',
          login: false,
          admin: false
        }
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('@/views/front/RegisterView.vue'),
        meta: {
          title: '書評網 | 註冊',
          login: false,
          admin: false
        }
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/front/LoginView.vue'),
        meta: {
          title: '書評網 | 登入',
          login: false,
          admin: false
        }
      },
      {
        path: 'books/:id',
        name: 'Book',
        component: () => import('@/views/front/BookView.vue'),
        meta: {
          title: '書評網 | 書籍',
          login: false,
          admin: false
        }
      },
      {
        path: 'article',
        name: 'Article',
        component: () => import('@/views/front/ArticleView.vue'),
        meta: {
          title: '書評網 | 文章',
          login: false,
          admin: false
        }
      },
      {
        path: 'import',
        name: 'Import',
        component: () => import('@/views/front/ImportView.vue'),
        meta: {
          title: '書評網 | 引入書籍',
          login: true,
          admin: false
        }
      }
    ]
  },
  {
    path: '/admin',
    component: () => import('@/layouts/AdminLayout.vue'),
    children: [
      {
        path: '',
        name: 'AdminHome',
        component: () => import('@/views/admin/HomeView.vue'),
        meta: {
          title: '購物網 | 管理',
          login: true,
          admin: true
        }
      },
      {
        path: 'bookmanagement',
        name: 'AdminBookmanagement',
        component: () => import('@/views/admin/BookmanagementView.vue'),
        meta: {
          title: '購物網 | 書本管理',
          login: true,
          admin: true
        }
      },
      {
        path: 'article',
        name: 'AdminProducts',
        component: () => import('@/views/admin/ArticleView.vue'),
        meta: {
          title: '購物網 | 文章管理',
          login: true,
          admin: true
        }
      },
      {
        path: 'report',
        name: 'AdminReport',
        component: () => import('@/views/admin/ReportView.vue'),
        meta: {
          title: '購物網 | 檢舉管理',
          login: true,
          admin: true
        }
      }
    ]
  },
  {
    path: '/member',
    component: () => import('@/layouts/MemberLayout.vue'),
    children: [
      {
        path: '',
        name: 'MemberHome',
        component: () => import('@/views/member/HomeView.vue'),
        meta: {
          title: '購物網 | 會員管理',
          login: true,
          admin: false
        }
      },
      {
        path: 'book',
        name: 'Bookreview',
        component: () => import('@/views/member/BookreviewView.vue'),
        meta: {
          title: '購物網 | 書籍管理',
          login: true,
          admin: false
        }
      },
      {
        path: 'follow',
        name: 'FollowReport',
        component: () => import('@/views/member/FollowView.vue'),
        meta: {
          title: '購物網 | 追隨者管理',
          login: true,
          admin: false
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

router.afterEach((to, from) => {
  document.title = to.meta.title
})

router.beforeEach(async (to, from, next) => {
  const user = useUserStore()

  if (from === START_LOCATION) {
    await user.getProfile()
  }

  if (user.isLogin && ['/register', '/login'].includes(to.path)) {
    next('/')
  } else if (to.meta.login && !user.isLogin) {
    next('/login')
  } else if (to.meta.admin && !user.isAdmin) {
    next('/')
  } else {
    next()
  }
})

export default router
