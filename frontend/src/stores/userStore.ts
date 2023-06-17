import { reactive } from 'vue'
import axios from 'axios'
import avatar1 from '@images/avatars/avatar-1.png'

const userStore = {
  avatarImg: avatar1,
  userName: '',
  email: '',
}

async function fetchUser() {
  try {
    const response = await axios.get('/api/user/profile')
    if (response && response.data) {
      userStore.userName = response.data.userName
      userStore.email = response.data.email
    }
  }
  catch (error) {
    console.error('Error fetching user data:', error)
  }
}

export { userStore, fetchUser }