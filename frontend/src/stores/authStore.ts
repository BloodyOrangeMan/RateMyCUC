import axiosInstance from '../plugins/axios/axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as any,
  }),
  getters: {
    isLoggedIn: state => !!state.user,
  },
  actions: {
    async login(email: string, password: string) {
      try {
        const response = await axiosInstance.post('api/auth/login', {
          withCredentials: true,
          email,
          password,
        })

        // Assuming the API responds with a token and user information
        if (response && response.data)
          this.user = response.data.passport.user 
      }
      catch (err) {
        console.error(err)
        this.logout()
      }
    },
    async register(username: string, email: string, password: string) {
      try {
        const response = await axiosInstance.post('/api/auth/register', {
          withCredentials: true,
          username,
          email,
          password,
        })

        // Assuming the API responds with a token and user information
        if (response && response.data)
          this.user = response.data.passport.user
      }
      catch (err) {
        console.error(err)
        this.logout()
      }
    },
    logout() {
      this.user = null
    },
  },
})
