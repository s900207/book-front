<template>
  <div>
    <input v-model="searchTerm" placeholder="Search books..." />
    <button @click="showAll = !showAll">Toggle Show All</button>
    <div v-for="book in books" :key="book.id" class="books-card">
      <BooksCard :book="book" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick, defineAsyncComponent } from 'vue'
import { useApi } from '@/composables/useApi'
import { useSnackbar } from 'vuetify-use-dialog'
// import gsap from 'gsap'
import { debounce } from 'lodash'

const api = useApi()
const createSnackbar = useSnackbar()
const BooksCard = defineAsyncComponent(() =>
  import('@/components/BooksCard.vue')
)

const books = ref([])
const searchTerm = ref('')
const showAll = ref(false)

const fetchBooks = debounce(async () => {
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
    document.querySelectorAll('.books-card').forEach(card => {
      card.classList.add('visible')
    })
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
}, 300) // 300ms debounce

onMounted(() => {
  fetchBooks()
})

watch([searchTerm, showAll], fetchBooks)
</script>

<style scoped lang="sass">
.books-card
  opacity: 0
  transition: opacity 0.5s

.books-card.visible
  opacity: 1
</style>
