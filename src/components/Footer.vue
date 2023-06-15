<script setup>
import { useUserStore } from "../store/user-store";
import { useRouter } from "vue-router";
const router = useRouter();

const authStore = useUserStore();

const logout = () => {
  authStore.clearUser();
  router.push({ name: "home" });
};
</script>
<template>
  <footer
    class="py-10 mt-0 border-t border-gray-700 text-center text-xs sm:text-sm text-black"
  >
    <div
      class="w-11/12 sm:w-10/12 lg:w-9/12 mx-auto flex space-x-6 justify-center lg:justify-between"
    >
      <div class="text-center space-x-4 lg:space-x-6">
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
        <span
          v-if="authStore.cid"
          @click="logout"
          class="border-b border-red-600 hover:opacity-60 cursor-pointer"
          >Logout</span
        >
      </div>
      <div class="text-gray-600">
        &copy; {{ new Date().getFullYear() }}. All rights reserved.
      </div>
    </div>
  </footer>
</template>
