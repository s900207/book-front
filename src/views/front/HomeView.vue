<template lang="pug">
  VContainer
    VRow
      VCol(cols="9" md="11")
        VTextField(
            class="mx-auto mt-5"
            menu-icon=""
            placeholder="請輸入書籍名稱"
            v-model="searchTerm"
            :prepend-inner-icon="IconSearch"
          )
      VCol(cols="3" md="1" class="d-flex align-center justify-end")
        VSwitch(v-model="showAll" label="18+")
    VRow
      VCol.d-flex.justify-center(cols="12" md="4" xl="2" v-for="books in books" :key="books._id")
        BooksCard(v-bind="books")
  </template>

<script setup>
import { ref, onMounted, nextTick, watch } from 'vue'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import BooksCard from '@/components/BooksCard.vue'
import gsap from 'gsap'
import IconSearch from '~icons/ic/baseline-search'

const { api } = useApi()
const createSnackbar = useSnackbar()

const books = ref([])
const searchTerm = ref('')
const showAll = ref(false)

const fetchBooks = async () => {
  try {
    const { data } = await api.get('/books', {
      params: {
        search: searchTerm.value
      }
    })

    const filteredBooks = data.result.data.reduce((acc, book) => {
      if (showAll.value || book.maturityRating === 'NOT_MATURE') {
        acc.push(book)
      }
      return acc
    }, [])

    books.value = filteredBooks

    await nextTick()
    gsap.to('.books-card', { opacity: 1, duration: 0.5 })
  } catch (error) {
    console.log(error)
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

onMounted(() => {
  fetchBooks()
})

watch([searchTerm, showAll], fetchBooks)

</script>

  <style scoped lang="sass">
  .books-card
    opacity: 0
  </style>
