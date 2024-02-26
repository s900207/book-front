<template lang="pug">
VCard.books-card( width="250px" height="350px")
  VImg(:src="image" height="250px")
  VCardTitle
    RouterLink.text-primary.text-decoration-none(:to="'/books/' + _id" :title="title") {{ title}}
  VRow.justify-space-between
    VCol(cols="auto")
      VCardSubtitle.text-left(style="width:170px" v-bind:title="authors") {{ authors }}
    VCol(cols="auto")
      VBtn.text-right(:icon="isFavorite ? 'mdi-heart-minus' : 'mdi-heart-plus'" @click="addFavorite" )
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const props = defineProps(['_id', 'title', 'authors', 'publisher', 'retailPrice', 'categories', 'description', 'image'])

const isFavorite = ref(false)

const addFavorite = async () => {
  isFavorite.value = !isFavorite.value

  try {
    const response = await axios.post('/users/favorite', {
      bookId: props._id,
      isFavorite: isFavorite.value
    })

    console.log(response.data)
  } catch (error) {
    console.error(error)
  }
}

</script>
