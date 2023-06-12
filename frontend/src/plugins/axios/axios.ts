import axios from 'axios'
import { match } from 'ts-pattern'
import router from '../../router'
import { useErrorStore } from '../../stores/errorStore'

const errorStore = useErrorStore()

const axiosInstance = axios.create({
  // ...your axios configuration
})

axiosInstance.interceptors.response.use(undefined, (error: any) => {
  if (error.response) {
    match(error.response.status)
      .with(400, () => errorStore.setErrorMessage('Bad Request'))
      .with(401, () => errorStore.setErrorMessage('Unauthorized'))
      .with(403, () => errorStore.setErrorMessage('Forbidden'))
      .with(404, () => {
        router.push({ name: '404' })
        errorStore.setErrorMessage('Not Found')
      })
      .with(500, () => errorStore.setErrorMessage('Internal Server Error'))
      .otherwise(() => errorStore.setErrorMessage('Unhandled status code'))
  }
  else if (error.request) {
    errorStore.setErrorMessage('No response was received')
  }
  else {
    errorStore.setErrorMessage(`Error: ${error.message}`)
  }
  throw error
})

export default axiosInstance
