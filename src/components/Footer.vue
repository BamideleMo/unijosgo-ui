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
    class="py-10 mt-0 border-t border-gray-700 text-center text-xs sm:text-xs text-black"
  >
    <div
      class="w-11/12 sm:w-10/12 lg:w-9/12 mx-auto flex space-x-6 justify-center"
    >
      <div class="">
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
