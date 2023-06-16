import axios from "axios";
import { defineStore } from "pinia";
const API_URL = import.meta.env.VITE_API_URL;

export const useUserStore = defineStore("ujgo_user", {
  state: () => ({
    cid: null,
    token: null,
    user_category: null,
    name: null,
    username: null,
  }),
  actions: {
    async setUserDetails(res) {
      this.$state.cid = res.data.user.cid;
      this.$state.token = res.data.token;
      this.$state.user_category = res.data.user.user_category;
      this.$state.name = res.data.user.name;
      this.$state.username = res.data.user.username;
    },
    async fetchUser() {
      let res = await axios.get(API_URL + this.$state.cid);

      this.$state.cid = res.data.data.user.cid;
      this.$state.user_category = res.data.data.user.user_category;
      this.$state.name = res.data.data.user.name;
      this.$state.username = res.data.data.user.username;
    },
    clearUser() {
      this.$state.cid = null;
      this.$state.token = null;
      this.$state.user_category = null;
      this.$state.name = null;
      this.$state.username = null;
    },
  },
  persist: true,
});
