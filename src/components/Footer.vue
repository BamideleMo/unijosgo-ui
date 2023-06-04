<script setup>
import { useUserStore } from "../store/user-store";

const userStore = useUserStore();

const logout = async () => {
  const API_URL = import.meta.env.VITE_API_URL;
  try {
    let res = await axios.post(API_URL + "logout", "", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userStore.token}`,
      },
    });
    userStore.clearUser();

    router.push({
      name: "cta",
    });
  } catch (error) {
    console.log(error);
  }
};
</script>
<template>
  <footer
    class="py-10 mt-20 border-t border-gray-700 text-center text-sm sm:text-sm text-slate-900"
  >
    <div class="w-11/12 sm:w-10/12 lg:w-9/12 mx-auto flex justify-between">
      <div class="text-center space-x-8 lg:space-x-10">
        <RouterLink to="/" class="border-b border-red-600 hover:opacity-60">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-4 h-4 inline"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
        </RouterLink>
        <RouterLink to="/about" class="border-b border-red-600 hover:opacity-60"
          >About</RouterLink
        >
        <span
          v-if="userStore.uuser_id"
          @click="logout"
          class="border-b border-red-600 hover:opacity-60 cursor-pointer"
          >Logout</span
        >
      </div>
      <div class="text-gray-400">
        &copy; {{ new Date().getFullYear() }}. All rights reserved.
      </div>
    </div>
  </footer>
</template>
