<template lang="pug">
VCard.books-card( width="250px" height="350px")
  VImg(:src="image" height="250px")
  VCardTitle
    RouterLink.text-primary.text-decoration-none(:to="'/books/' + _id" :title="title") {{ title}}
  VRow.justify-space-between
    VCol(cols="auto")
      VCardSubtitle.text-left(style="width:170px" v-bind:title="authors") {{ authors }}
    VCol(cols="auto")
      VBtn.text-right(:icon="isFavorite ? 'mdi-heart-minus' : 'mdi-heart-plus'" @click="toggleFavoriteBook(_id)" )
</template>

<script setup>
// 元件接受哪些資料
import { ref } from 'vue'
import axios from 'axios'

const props = defineProps(['_id', 'title', 'authors', 'publisher', 'retailPrice', 'categories', 'description', 'image'])
const isFavorite = ref(false)
const showError = ref(false)
const errorMessage = ref('')

const toggleFavoriteBook = async (bookId) => {
  try {
    if (isFavorite.value) {
      const response = await axios.delete(`/users/favoriteBooks/${bookId}`)
      if (response.data.success) {
        isFavorite.value = false
      } else {
        throw new Error('Failed to remove book from favorites')
      }
    } else {
      const response = await axios.post('/users/favoriteBooks', { bookId })
      if (response.data.success) {
        isFavorite.value = true
      } else {
        throw new Error('Failed to add book to favorites')
      }
    }
  } catch (error) {
    errorMessage.value = error.message
    showError.value = true
  }
}

</script>
