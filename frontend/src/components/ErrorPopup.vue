<script setup lang="ts">
import { useErrorStore } from '../stores/errorStore'

const errorStore = useErrorStore()
const snackbar = computed(() => errorStore.snackbar)
const errorMessage = computed(() => errorStore.errorMessage)

// const clearErrorMessage = () => {
//   errorStore.clearErrorMessage()
// }
</script>

<template>
  <div>
    <VSnackbar
      v-model="snackbar"
      color="error"
    >
      {{ errorMessage }}
    </VSnackbar>
  </div>
</template>
