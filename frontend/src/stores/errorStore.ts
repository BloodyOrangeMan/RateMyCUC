export const useErrorStore = defineStore({
  id: 'global',
  state: () => ({
    errorMessage: '',
    snackbar: false,
  }),
  actions: {
    setErrorMessage(message: string) {
      this.errorMessage = message
      this.snackbar = true

      setTimeout(() => {
        this.snackbar = false
      }, 3000)
    },
    clearErrorMessage() {
      this.errorMessage = ''
      this.snackbar = false
    },
  },
})
