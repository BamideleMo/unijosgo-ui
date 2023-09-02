<script setup>
import { useUserStore } from "../store/user-store";
import { RouterLink, useRouter } from "vue-router";
const router = useRouter();

const authStore = useUserStore();

const logout = () => {
  authStore.clearUser();
  router.push({ name: "home" });
};
</script>
<template>
  <footer
    class="py-10 mt-0 border-t border-gray-400 text-center text-xs sm:text-xs text-black"
  >
    <div class="w-11/12 sm:w-10/12 lg:w-9/12 mx-auto flex justify-between">
      <div>
        <a
          href="https://wa.me/23408187084716"
          target="_blank"
          class="border-b border-red-600 hover:opacity-60 cursor-pointer"
          >0818 708 4716</a
        >
      </div>
      <div class="space-x-6">
        <span
          v-if="authStore.cid"
          @click="logout"
          class="border-b border-red-600 hover:opacity-60 cursor-pointer"
          >Logout</span
        >
        <RouterLink
          to="/disclaimer"
          class="border-b border-red-600 hover:opacity-60 cursor-pointer"
          >Disclaimer</RouterLink
        >
        <span>&copy; {{ new Date().getFullYear() }}.</span>
      </div>
    </div>
  </footer>
</template>
