import axios from 'axios';
import { defineStore } from 'pinia'
const API_URL = import.meta.env.VITE_API_URL;

export const useUserStore = defineStore('user', {
  state: () => ({
    uuser_id: null,
    token: null,
    role: null,
    name: null,
    phone: null,
    phone_verification: null,
  }),
  actions: {
    async setUserDetails(res) {
      this.$state.uuser_id = res.data.data.user.uuser_id
      this.$state.token = res.data.data.token
      this.$state.role = res.data.data.user.role
      this.$state.name = res.data.data.user.name
      this.$state.phone = res.data.data.user.phone
      this.$state.phone_verification = res.data.data.user.phone_verification
    },
    async fetchUser() {
      let res = await axios.get(API_URL + this.$state.uuser_id)

      this.$state.uuser_id = res.data.data.user.uuser_id
      this.$state.role = res.data.data.user.role
      this.$state.name = res.data.data.user.name
      this.$state.phone = res.data.data.user.phone,
        this.$state.phone_verification = res.data.data.user.phone_verification
    },
    clearUser() {
      this.$state.uuser_id = null
      this.$state.token = null
      this.$state.role = null
      this.$state.name = null
      this.$state.phone = null
      this.$state.phone_verification = null
    }
  },
  persist: true
})